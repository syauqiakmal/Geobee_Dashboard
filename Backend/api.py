from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from io import BytesIO
from PIL import Image
import base64
import psycopg2
import subprocess
import json
import geojson
import os
import shutil
import tempfile
import shapefile
from rasterio.io import MemoryFile
import zipfile

import numpy as np

import re
# import traceback

import geojson
from geojson import Feature, Point, FeatureCollection
# from pydantic import BaseModel
# from typing import Dict
# from pydrive.auth import GoogleAuth
# from pydrive.drive import GoogleDrive
# from oauth2client.service_account import ServiceAccountCredentials

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

MAX_UPLOAD_SIZE = 100 * 1024 * 1024  # 100MB

def normalize_table_name(table_name: str) -> str:
    return table_name.lower().replace('-', '_').replace(' ', '_')

def get_geojson_from_table(table_name):
    try:
        # Establish connection to PostgreSQL database
        conn = psycopg2.connect(
        host="localhost",
        port="5432",
        dbname="nyoba",
        user="postgres",
        password="15032003"
    )
        cursor = conn.cursor()

        # Query to fetch GeoJSON data
        query = f'SELECT id, ST_AsGeoJSON(geom) as geom, * FROM "{table_name}"'
        cursor.execute(query)
        rows = cursor.fetchall()

        # Parse rows into GeoJSON features
        features = []
        for row in rows:
            geometry = geojson.loads(row[1])
            properties = {desc[0]: row[idx + 2] for idx, desc in enumerate(cursor.description[2:])}
            feature = Feature(geometry=geometry, properties=properties)
            features.append(feature)

        # Close cursor and connection
        cursor.close()
        conn.close()

        # Create a GeoJSON FeatureCollection
        feature_collection = FeatureCollection(features)
        return feature_collection

    except psycopg2.Error as e:
        print("Error fetching GeoJSON from database:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
def process_geojson(file_path: str, table_name: str):
    try:
        # Connect to PostgreSQL
        conn = psycopg2.connect(
            host="localhost",
            port="5432",
            dbname="nyoba",
            user="postgres",
            password="15032003"
        )
        cursor = conn.cursor()
        
        cursor.execute(f'DROP TABLE IF EXISTS "{table_name}"')
        conn.commit()

        # Load GeoJSON file
        with open(file_path, 'r') as geojson_file:
            geojson_data = geojson.load(geojson_file)

        # Create table with necessary columns
        create_table_query = f'''
        CREATE TABLE IF NOT EXISTS "{table_name}" (
            id SERIAL PRIMARY KEY,
            geom GEOMETRY,
            properties JSONB
        );
        '''
        cursor.execute(create_table_query)

        # Get the existing columns
        cursor.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name='{table_name}';")
        existing_columns = {row[0] for row in cursor.fetchall()}

        # Insert GeoJSON features into the table
        for feature in geojson_data['features']:
            geom = feature['geometry']
            properties = feature['properties']

            # Check and add missing columns
            for key in properties.keys():
                if key not in existing_columns:
                    alter_table_query = f'ALTER TABLE "{table_name}" ADD COLUMN "{key}" TEXT;'
                    cursor.execute(alter_table_query)
                    existing_columns.add(key)

            if properties:
                # Prepare columns and placeholders for dynamic insertion
                columns = ", ".join([f'"{key}"' for key in properties.keys()])
                values_placeholders = ", ".join(["%s"] * len(properties))

                # Build the SQL query
                insert_query = f'''
                INSERT INTO "{table_name}" (geom, {columns}, properties)
                VALUES (ST_SetSRID(ST_GeomFromGeoJSON(%s), 4326), {values_placeholders}, %s::jsonb);
                '''
                values = [json.dumps(geom)] + list(properties.values()) + [json.dumps(properties)]
            else:
                # Handle case with no properties
                insert_query = f'''
                INSERT INTO "{table_name}" (geom, properties)
                VALUES (ST_SetSRID(ST_GeomFromGeoJSON(%s), 4326), %s::jsonb);
                '''
                values = [json.dumps(geom), json.dumps(properties)]

            # Log to check the query before execution
            print("Insert Query:", insert_query)

            # Execute the query
            cursor.execute(insert_query, values)

        # Commit transaction
        conn.commit()

        # Close cursor and connection
        cursor.close()
        conn.close()

        return {"status": "success", "message": f"GeoJSON data has been inserted into {table_name}."}

    except (Exception, psycopg2.Error) as error:
        # Rollback in case of error
        if conn:
            conn.rollback()
            cursor.close()
            conn.close()
        print("Error while processing GeoJSON", error)
        raise HTTPException(status_code=500, detail="Internal Server Error")

def process_shapefile(file_path, table_name):
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        dbname="nyoba",
        user="postgres",
        password="15032003"
    )
    cursor = conn.cursor()

    cursor.execute(f'DROP TABLE IF EXISTS "{table_name}"')
    conn.commit()

    with shapefile.Reader(file_path) as shp:
        fields = shp.fields[1:]
        field_names = [field[0].lower() for field in fields]

        if 'id' in field_names:
            field_names.remove('id')

        field_definitions = ", ".join([f'"{field_name}" VARCHAR' for field_name in field_names])
        create_table_sql = f'CREATE TABLE IF NOT EXISTS "{table_name}" (id SERIAL PRIMARY KEY, {field_definitions}, geom GEOMETRY)'
        cursor.execute(create_table_sql)
        conn.commit()

        for shape_record in shp.shapeRecords():
            geometry = shape_record.shape.__geo_interface__
            attributes = dict(zip(field_names, shape_record.record))

            columns = ", ".join(attributes.keys())
            values_placeholders = ", ".join(["%s"] * len(attributes))
            insert_sql = f'INSERT INTO "{table_name}" (geom, {columns}) VALUES (ST_GeomFromGeoJSON(%s), {values_placeholders})'

            cursor.execute(insert_sql, [json.dumps(geometry)] + list(attributes.values()))

    conn.commit()
    cursor.close()
    conn.close()

def insert_geotiff_to_postgis(geotiff_path, table_name):
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        dbname="nyoba",
        user="postgres",
        password="15032003"
    )
    cursor = conn.cursor()

    try:
        # Drop the existing table if it exists
        cursor.execute(f'DROP TABLE IF EXISTS "{table_name}"')
        conn.commit()

        # Use the full path to raster2pgsql executable
        raster2pgsql_command = [
            "C:\\Program Files\\PostgreSQL\\16\\bin\\raster2pgsql.exe",  # Full path to raster2pgsql
            "-s", "4326",  # Specify the SRID, change this if your data uses a different spatial reference system
            "-I",  # Create a spatial index on the raster column
            "-C",  # Apply raster constraints
        
            geotiff_path,
            table_name
        ]

        # Capture the SQL output of raster2pgsql
        raster2pgsql_output = subprocess.check_output(raster2pgsql_command).decode('utf-8')

        # Execute the generated SQL command
        cursor.execute(raster2pgsql_output)
        conn.commit()

    except Exception as e:
        print("Error during GeoTIFF insertion:", e)
        conn.rollback()
        raise e
    finally:
        cursor.close()
        conn.close()

    print("GeoTIFF data has been inserted into the database using raster2pgsql.")

def normalize_table_name(name):
    return re.sub(r'\W+', '_', name.lower())

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_size = 0
    chunk_size = 1024 * 1024  # 1MB
    tmp_dir = tempfile.mkdtemp()

    try:
        file_path = os.path.join(tmp_dir, file.filename)
        
        with open(file_path, "wb") as tmp:
            # Read the file in chunks to determine the size
            while content := await file.read(chunk_size):
                file_size += len(content)
                if file_size > MAX_UPLOAD_SIZE:
                    raise HTTPException(status_code=413, detail="File size exceeds the maximum limit")
                tmp.write(content)

        file_ext = os.path.splitext(file.filename)[1].lower()
        # table_name = normalize_table_name(os.path.splitext(file.filename)[0])
        table_name = os.path.splitext(file.filename)[0]

        if file_ext == '.zip':
            with zipfile.ZipFile(file_path, 'r') as zip_ref:
                zip_ref.extractall(tmp_dir)

            shapefile_path = None
            for file_name in os.listdir(tmp_dir):
                if file_name.endswith(".shp"):
                    shapefile_path = os.path.join(tmp_dir, file_name)
                    break

            if shapefile_path is None:
                raise HTTPException(status_code=400, detail="No shapefile found in the uploaded zip file")

            process_shapefile(shapefile_path, table_name)
            return {"message": "Shapefile uploaded and processed successfully"}
        elif file_ext in ['.tif', '.tiff']:
            table_name = normalize_table_name(table_name)
            insert_geotiff_to_postgis(file_path, table_name)
            return {"message": "GeoTIFF uploaded and processed successfully"}
        elif file_ext == '.json' or file_ext == '.geojson':
            # Handle GeoJSON upload
            process_geojson(file_path, table_name)
            return {"message": "GeoJSON uploaded and processed successfully"}      
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

    except HTTPException as e:
        raise e
    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        shutil.rmtree(tmp_dir)

@app.get("/data/{table_name}")
async def get_data(table_name: str):
    try:
        conn = psycopg2.connect(
        host="localhost",
        port="5432",
        dbname="nyoba",
        user="postgres",
        password="15032003"
    )
        cursor = conn.cursor()

        query = f'SELECT id, ST_AsGeoJSON(geom) as geom, * FROM "{table_name}"'
        cursor.execute(query)
        rows = cursor.fetchall()

        features = []
        for row in rows:
            geom = geojson.loads(row[1])
            properties = {desc[0]: row[idx + 2] for idx, desc in enumerate(cursor.description[2:])}
            feature = geojson.Feature(id=row[0], geometry=geom, properties=properties)
            features.append(feature)

        feature_collection = geojson.FeatureCollection(features)
        cursor.close()
        conn.close()
        return feature_collection
    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/raster/{table_name}")
async def get_raster(table_name: str):
    try:
        normalized_table_name = normalize_table_name(table_name)
        conn = psycopg2.connect(
            host="localhost",
            port="5432",
            dbname="nyoba",
            user="postgres",
            password="15032003"
        )
        cursor = conn.cursor()

        query = f'SELECT ST_AsGDALRaster(rast, \'GTiff\') FROM "{normalized_table_name}"'
        cursor.execute(query)
        raster_rows = cursor.fetchall()

        raster_images = []
        bounds = []
        for row in raster_rows:
            raster_data = row[0]

            with MemoryFile(raster_data) as memfile:
                with memfile.open() as dataset:
                    # Handle multi-band raster
                    data = dataset.read()

                    if data is None or data.shape[0] == 0:
                        raise HTTPException(status_code=404, detail="No valid raster data available.")

                    if data.shape[0] == 1:
                        # Single-band (grayscale)
                        data_normalized = ((data[0] - data[0].min()) / (data[0].max() - data[0].min()) * 255).astype('uint8')
                        image = Image.fromarray(data_normalized, mode='L')
                    else:
                        # Multi-band (color)
                        bands = []
                        for band in data:
                            band_normalized = ((band - band.min()) / (band.max() - band.min()) * 255).astype('uint8')
                            bands.append(band_normalized)
                        
                        # Combine bands into a color image
                        image = Image.merge('RGB', [Image.fromarray(band) for band in bands[:3]])  # Use the first 3 bands for RGB

                    img_byte_array = BytesIO()
                    image.save(img_byte_array, format='PNG')
                    raster_images.append(img_byte_array.getvalue())

                    bbox = dataset.bounds
                    bounds = [[bbox.bottom, bbox.left], [bbox.top, bbox.right]]

        cursor.close()
        conn.close()

        if not raster_images:
            raise HTTPException(status_code=404, detail="No raster images available.")

        encoded_raster_images = [base64.b64encode(img).decode() for img in raster_images]

        return JSONResponse(content={"raster_images": encoded_raster_images, "bounds": bounds})
    except HTTPException:
        raise
    except Exception as e:
        print("Error:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
@app.get("/geojson/{table_name}")
async def get_geojson(table_name: str):
    try:
        geojson_data = get_geojson_from_table(table_name)
        return geojson_data
    except psycopg2.Error as e:
        error_message = f"Database error: {e}"
        print(error_message)
        raise HTTPException(status_code=500, detail=error_message)
    except Exception as e:
        error_message = f"Unexpected error: {e}"
        print(error_message)
        raise HTTPException(status_code=500, detail=error_message)
    
# COPY public."tangerang kecamatan"( tahun, pengurangan_sampah, penanganan_sampah, jumlah_armada_truk, jumlah_penduduk, jumlah_kk, jumlah_laki, jumlah_perempuan)
# FROM 'C:\Users\syauqi akmal deffans\Downloads\data_2024.csv'
# DELIMITER ','
# CSV HEADER;

# COPY public."tangerang kecamatan"( tahun, pengurangan_sampah, penanganan_sampah, jumlah_armada_truk, jumlah_penduduk, jumlah_kk, jumlah_laki, jumlah_perempuan)
# FROM 'C:\Users\syauqi akmal deffans\Downloads\data_2023.csv'
# DELIMITER ','
# CSV HEADER;

# COPY public."tangerang kecamatan"( tahun, pengurangan_sampah, penanganan_sampah, jumlah_armada_truk, jumlah_penduduk, jumlah_kk, jumlah_laki, jumlah_perempuan)
# FROM 'C:\Users\syauqi akmal deffans\Downloads\data_2020.csv'
# DELIMITER ','
# CSV HEADER;

    
    
    
# import os
# from pyunpack import Archive
# import torch
# from torch.utils.data import DataLoader
# from torchgeo.datasets import VHR10

# # Path to the .rar file and extraction directory
# rar_file_path = "C:\\Users\\syauqi akmal deffans\\OneDrive\\Dokumen\\new\\NWPU VHR-10 dataset.rar"
# extract_to = "C:\\Users\\syauqi akmal deffans\\OneDrive\\Dokumen\\new\\NWPU VHR-10 dataset"

# # Extract the .rar file
# try:
#     Archive(rar_file_path).extractall(extract_to)
#     print(f"Successfully extracted {rar_file_path} to {extract_to}")
# except Exception as e:
#     print(f"Error extracting .rar file: {e}")
#     raise

# # Verify extracted files
# if not os.path.exists(extract_to):
#     raise FileNotFoundError(f"Extraction directory does not exist: {extract_to}")

# # Path to the extracted dataset directory
# dataset_path = extract_to

# # Initialize the dataset
# try:
#     dataset = VHR10(root=dataset_path, download=False, checksum=False)
#     print("Dataset loaded successfully.")
# except Exception as e:
#     print(f"Error loading dataset: {e}")
#     raise

# # Custom collate function for detection tasks
# def collate_fn_detection(batch):
#     images = [item['image'] for item in batch]
#     boxes = [item['boxes'] for item in batch]
#     labels = [item['labels'] for item in batch]
#     masks = [item['masks'] for item in batch]
#     return {'image': images, 'boxes': boxes, 'labels': labels, 'masks': masks}

# # Initialize DataLoader with the custom collate function
# try:
#     dataloader = DataLoader(
#         dataset,
#         batch_size=8,  # Adjust batch size based on your system's memory capacity
#         shuffle=True,
#         num_workers=4,
#         collate_fn=collate_fn_detection,
#     )
#     print("DataLoader initialized successfully.")
# except Exception as e:
#     print(f"Error initializing DataLoader: {e}")
#     raise

# # Example of iterating through the DataLoader
# for batch in dataloader:
#     images = [image.numpy().tolist() for image in batch["image"]]  # Convert to list
#     boxes = [box.numpy().tolist() for box in batch["boxes"]]  # Convert to list
#     labels = [label.numpy().tolist() for label in batch["labels"]]  # Convert to list
#     masks = [mask.numpy().tolist() for mask in batch["masks"]]  # Convert to list

#     # Print the first batch as a sample
#     print("Sample batch data:")
#     print(f"Images: {images}")
#     print(f"Boxes: {boxes}")
#     print(f"Labels: {labels}")
#     print(f"Masks: {masks}")

#     # Break after the first batch for demonstration purposes
#     break




  