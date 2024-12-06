// Map.js
import React, { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ScaleControl,
  ImageOverlay,
  Popup, useMapEvents
} from "react-leaflet";
import { GeomanToolbar } from "../layers/Geoman.js";
import { ShowCoordinates } from "../layers/ShowCoordinates.js";
// import { ContinentsPolygonLayer } from "../layers/ContinentLayer";
import Search from "../layers/Search.js";
// import { continents } from "../data/indo_provinces";
import Menu from "../layers/Menu.js";
import Legend from "../layers/legends.js";
import L from "leaflet";
import {
  PopupComponent,
  getFeatureStyle,
  onEachFeature,
} from "../layers/popupcontent.js"; // Import the PopupComponent
import logo from "../Logo/trash-bin.png";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapLibreSearchControl } from "@stadiamaps/maplibre-search-box";
import "@stadiamaps/maplibre-search-box/dist/style.css";
import './map.css';

import 'leaflet/dist/leaflet.css'

// import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder';
// import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';

const MAPTILER_KEY = "get_your_own_OpIi9ZULNHzrESv6T2vL";

// import MapPrint from "../layers/MapPrint";



const getElevation = async (lat, lng) => {
  const response = await fetch('https://api.open-elevation.com/api/v1/lookup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          locations: [
              { latitude: lat, longitude: lng }
          ]
      }),
  });
  const data = await response.json();
  return data.results[0].elevation; // Return the elevation value
};

function ElevationMarker() {
  const [elevation, setElevation] = useState(null);
  const [position, setPosition] = useState(null);

  useMapEvents({
      click: async (e) => {
          const { lat, lng } = e.latlng;
          const elevationValue = await getElevation(lat, lng);
          setElevation(elevationValue);
          setPosition(e.latlng);
      },
  });

  return position === null ? null : (
    <Popup position={position}>
        <div>
            <p>Latitude: {position.lat.toFixed(5)}</p>
            <p>Longitude: {position.lng.toFixed(5)}</p>
            <p>Elevation: {elevation} meters</p>
        </div>
    </Popup>
);
}

export const Map = ({ hideComponents }) => {
  const [selectedOption, setSelectedOption] = useState("OSM");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContinentsVisible, setIsContinentsVisible] = useState(false);
  const [geojsonData, setGeojsonData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isContinentsCheckboxEnabled, setIsContinentsCheckboxEnabled] = useState(true);
  const [isUploadCheckboxEnabled, setIsUploadCheckboxEnabled] = useState(true);
  const mapRef = useRef(null);
  const [isNewUpload, setIsNewUpload] = useState(false);
  const [rasterData, setRasterData] = useState(null);
  const [bounds, setBounds] = useState(null);
  // const [adminDesaData, setAdminDesaData] = useState(null);
  const imageOverlayRef = useRef(null);
  const colorPickerControlRef = useRef(null);
  const [rasterOpacity, setRasterOpacity] = useState({});
  const [selectedProperty, setSelectedProperty] = useState("clustering");
  const [showPopup, setShowPopup] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const maplibreRef = useRef(null);

  const position = [-2.483383, 117.890285];
  


  useEffect(() => {
    if (selectedOption === "Maplibre") {
      maplibreRef.current = new maplibregl.Map({
        container: "maplibre-map",
        center: [106.837160, -6.17920], // Example center point (Jakarta)
        zoom: 17,
        pitch: 100,
        bearing: 40,
        antialias: true,
        style: {
          version: 8,
          sources: {
            osm: {
              type: 'raster',
              tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap Contributors',
              
            }
          },// Use a different source for terrain and hillshade layers, to improve render quality
          terrainSource: {
              type: 'raster-dem',
              url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
              tileSize: 256
          },
          hillshadeSource: {
              type: 'raster-dem',
              url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
              tileSize: 256
          },
      
          layers: [
            {
                id: 'osm',
                type: 'raster',
                source: 'osm'
            },
            
        ],
        terrain: {
            source: 'terrainSource',
            exaggeration: 2
        },
        sky: {}
    },
    maxZoom: 18,
    maxPitch: 75

        
      });

      maplibreRef.current.on("load", () => {
        // Add terrain source (raster-dem from MapTiler)
        maplibreRef.current.addSource("terrainSource", {
          type: "raster-dem",
          url: `https://demotiles.maplibre.org/terrain-tiles/tiles.json`,
          tileSize: 256,
        });

        // Add hillshade layer for terrain visualization
        maplibreRef.current.addLayer({
          id: "hillshade-layer",
          type: "hillshade",
          source: "terrainSource",
          paint: {
            "hillshade-shadow-color": "#473B24", // Customize shadow color
          },
        });

       

        // Search control and reverse geocoding
        const control = new MapLibreSearchControl({
          onResultSelected: async (feature) => {
            const [longitude, latitude] = feature.geometry.coordinates;
            maplibreRef.current.setCenter([longitude, latitude]);
            maplibreRef.current.setZoom(17);

            // Fetch reverse geocoding data
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const locationName = data.display_name || "Unknown Location";

            // Remove existing marker
            if (maplibreRef.current.marker) {
              maplibreRef.current.marker.remove();
            }

            // Add marker at the location
            const marker = new maplibregl.Marker()
              .setLngLat([longitude, latitude])
              .addTo(maplibreRef.current);

            // Add popup with location name
            const popup = new maplibregl.Popup({ offset: 25 })
              .setLngLat([longitude, latitude])
              .setHTML(
                `<b>${locationName}</b><br><br>
                Latitude: ${latitude.toFixed(
                  6
                )}, Longitude: ${longitude.toFixed(6)}`
              )
              .addTo(maplibreRef.current);

            // Bind popup to the marker
            marker.setPopup(popup);
            maplibreRef.current.marker = marker;
          },
        });
        maplibreRef.current.addControl(control, "top-right");

        // Adjust bearing and pitch dynamically based on zoom level
        maplibreRef.current.on("zoom", () => {
          const currentZoom = maplibreRef.current.getZoom();
          if (currentZoom >= 13) {
            maplibreRef.current.setBearing(20);
            maplibreRef.current.setPitch(80);
          } else {
            maplibreRef.current.setBearing(0);
            maplibreRef.current.setPitch(0);
          }
        });

        // Add 3D buildings
        const layers = maplibreRef.current.getStyle().layers;
        let labelLayerId;
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
            labelLayerId = layers[i].id;
            break;
          }
        }

        maplibreRef.current.addSource("openmaptiles", {
          url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${MAPTILER_KEY}`,
          type: "vector",
        });

        maplibreRef.current.addLayer(
          {
            id: "3d-buildings",
            source: "openmaptiles",
            "source-layer": "building",
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": [
                "interpolate",
                ["linear"],
                ["get", "render_height"],
                0,
                "#d1e7f8", // Biru muda
                20,
                "#337ab7", // Biru gelap
                40,
                "#a0a0a0", // Abu-abu
              ],
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                16,
                ["get", "render_height"],
              ],
              "fill-extrusion-base": [
                "case",
                [">=", ["get", "zoom"], 16],
                ["get", "render_min_height"],
                0,
              ],
            },
          },
          labelLayerId
        ); 
        maplibreRef.current.on("click", "3d-buildings", (e) => {
          console.log(e.features[0].properties);
          const renderHeight = e.features[0].properties.render_height;
 
          const coordinates = e.lngLat;
      
          new maplibregl.Popup()
              .setLngLat(coordinates)
              .setHTML(`
                  <div style="font-family: Arial, sans-serif; font-size: 14px; padding: 10px;">
                      <h3 style="margin: 0; font-size: 16px;">Building Information</h3>
                      <p><strong>Height:</strong> ${renderHeight} meters</p>
                  </div>
              `)
              .addTo(maplibreRef.current);
      });
      
      });
    }
  }, [selectedOption]);

  const togglePopup = () => setShowPopup((prev) => !prev);
  const toggleLegend = () => setShowLegend((prev) => !prev);

  const handleClick = (e, index) => {
    // Ensure colorPickerControlRef.current is defined before accessing it
    if (colorPickerControlRef.current) {
      const newOpacity = colorPickerControlRef.current.getSliderValue();
      setRasterOpacity((prevOpacities) => ({
        ...prevOpacities,
        [index]: newOpacity,
      }));
    }
  };

  const handleSelectPropertyChange = (newSelectedProperty) => {
    setSelectedProperty(newSelectedProperty);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleContinents = () => {
    // setIsContinentsVisible(!isContinentsVisible);
  };

  const handleShowFile = (index, checked) => {
    const updatedFiles = uploadedFiles.map((file, i) => {
      return i === index ? { ...file, checked } : file;
    });
    setUploadedFiles(updatedFiles);

    const selectedFiles = updatedFiles.filter((file) => file.checked);
    const combinedData = selectedFiles.flatMap((file) => file.data.features); // Gabungkan data geometri dari semua file yang dipilih

    console.log("Combined GeoJSON Data:", combinedData);

    const mergedGeojsonData = {
      type: "FeatureCollection",
      features: combinedData,
    };

    setGeojsonData(selectedFiles.length > 0 ? mergedGeojsonData : null);
  };

  const handleRasterFile = (index, checked) => {
    const updatedFiles = uploadedFiles.map((file, i) =>
      i === index ? { ...file, checked } : file
    );
    setUploadedFiles(updatedFiles);

    const selectedRasterFiles = updatedFiles.filter(
      (file) =>
        file.checked &&
        (file.name.endsWith(".tif") || file.name.endsWith(".tiff"))
    );

    // Combine all raster data for rendering on map
    const combinedRasterData = selectedRasterFiles.flatMap(
      (file) => file.data.raster_images
    );

    // Get bounds for the selected files
    let selectedBounds = null;
    if (selectedRasterFiles.length > 0) {
      selectedRasterFiles.forEach((file) => {
        if (file.data.bounds) {
          const fileBounds = L.latLngBounds(file.data.bounds);
          if (fileBounds.isValid()) {
            if (selectedBounds) {
              selectedBounds.extend(fileBounds);
            } else {
              selectedBounds = fileBounds;
            }
          }
        }
      });
    }

    console.log("Selected Raster Files:", selectedRasterFiles);
    console.log("Combined Raster Data:", combinedRasterData);
    console.log("Selected Bounds:", selectedBounds);

    setRasterData(combinedRasterData.length > 0 ? combinedRasterData : null);
    setBounds(
      selectedBounds && selectedBounds.isValid() ? selectedBounds : null
    );
    setIsNewUpload(true); // Trigger map update
  };

  const handleColumnSelection = (fileIndex, column, isChecked) => {
    const updatedFiles = uploadedFiles.map((file, index) => {
      if (index === fileIndex) {
        const updatedColumns = isChecked
          ? [...file.selectedColumns, column]
          : file.selectedColumns.filter((col) => col !== column);
        return { ...file, selectedColumns: updatedColumns };
      }
      return file;
    });
    setUploadedFiles(updatedFiles);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const tableName = file.name.split(".")[0];
    const maxSize = 300 * 1024 * 1024; // 50 MB in bytes

    if (file.size > maxSize) {
      alert("File size exceeds 100 MB. Please upload a smaller file.");
      event.target.value = null; // Clear the file input
      return;
    }

    try {
      // Upload file
      const uploadResponse = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      // Handle zipped shapefile
      if (file.name.endsWith(".zip")) {
        const dataResponse = await fetch(
          `http://localhost:8000/data/${tableName}`
        );
        if (!dataResponse.ok) {
          throw new Error("Failed to fetch shapefile data");
        }
        const geojsonData = await dataResponse.json();

        const newUploadedFile = {
          name: file.name,
          data: geojsonData,
          checked: true, // Automatically checked after upload
          selectedColumns: Object.keys(geojsonData.features[0].properties),
        };
        setUploadedFiles((prevUploadedFiles) => [
          ...prevUploadedFiles,
          newUploadedFile,
        ]);
        setGeojsonData(geojsonData);
      }
      // Handle raster file
      else if (file.name.endsWith(".tif") || file.name.endsWith(".tiff")) {
        const dataResponse = await fetch(
          `http://localhost:8000/raster/${tableName}`
        );
        if (!dataResponse.ok) {
          throw new Error("Failed to fetch raster data");
        }
        // Inside the GeoTIFF handling block
        const rasterData = await dataResponse.json();

        console.log("Raster Data:", rasterData); // Check what rasterData contains

        // Ensure rasterData is valid and has expected properties
        if (!rasterData || !rasterData.raster_images) {
          throw new Error(
            "Invalid raster data or missing raster_images property"
          );
        }

        const newUploadedFile = {
          name: file.name,
          data: rasterData,
          checked: true,
          bounds: rasterData.bounds,
        };
        setUploadedFiles((prevUploadedFiles) => [
          ...prevUploadedFiles,
          newUploadedFile,
        ]);
        setRasterData((prevRasterData) => [
          ...(prevRasterData || []),
          ...rasterData.raster_images,
        ]);
        setBounds((prevBounds) =>
          prevBounds
            ? prevBounds.extend(L.latLngBounds(rasterData.bounds))
            : L.latLngBounds(rasterData.bounds)
        );

        setIsMenuOpen(true); // Open menu after uploading file
        setIsNewUpload(true);
      }
      // Handle geojson file
      else if (file.name.endsWith(".geojson")) {
        const dataResponse = await fetch(
          `http://localhost:8000/geojson/${tableName}`
        );
        if (!dataResponse.ok) {
          throw new Error(
            `Failed to fetch GeoJSON data: ${dataResponse.status}`
          );
        }
        const geojsonData = await dataResponse.json();
        console.log("GeoJSON Data:", geojsonData);

        const newUploadedFile = {
          name: file.name,
          data: geojsonData,
          checked: true, // Automatically checked after upload
          selectedColumns: Object.keys(geojsonData.features[0].properties),
        };
        setUploadedFiles((prevUploadedFiles) => [
          ...prevUploadedFiles,
          newUploadedFile,
        ]);
        setGeojsonData(geojsonData);
      }
      setIsMenuOpen(true); // Open menu after uploading file
      setIsNewUpload(true);
    } catch (error) {
      console.error("Error handling file upload:", error);
      alert(
        "An error occurred while uploading the file and fetching data. Please try again."
      );
    }
  };

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     try {
  //       // Update years array to include 2021 to 2024
  //       const years = [2021, 2022, 2023, 2024];

  //       // Fetching cluster data
  //       const clusterPromises = years.map((year) =>
  //         fetch(
  //           `http://localhost:8000/data/clustering_Kelurahan_Tangerang_${year}`
  //         ).then((res) => res.json())
  //       );

  //       // Waiting for cluster fetches to complete
  //       const [
  //         clusterData2021,
  //         clusterData2022,
  //         clusterData2023,
  //         clusterData2024,
  //       ] = await Promise.all(clusterPromises);

  //       // Prepare the files data
  //       const newFiles = [
  //         {
  //           name: "Tangerang Analysis 2021",
  //           data: clusterData2021,
  //           checked: false,
  //           selectedColumns: Object.keys(
  //             clusterData2021.features[0].properties
  //           ),
  //         },
  //         {
  //           name: "Tangerang Analysis 2022",
  //           data: clusterData2022,
  //           checked: false,
  //           selectedColumns: Object.keys(
  //             clusterData2022.features[0].properties
  //           ),
  //         },
  //         {
  //           name: "Tangerang Analysis 2023",
  //           data: clusterData2023,
  //           checked: false,
  //           selectedColumns: Object.keys(
  //             clusterData2023.features[0].properties
  //           ),
  //         },
  //         {
  //           name: "Tangerang Analysis 2024",
  //           data: clusterData2024,
  //           checked: true,
  //           selectedColumns: Object.keys(
  //             clusterData2024.features[0].properties
  //           ),
  //         },
  //       ];

  //       // Update state
  //       setUploadedFiles([...uploadedFiles, ...newFiles]);
  //       setGeojsonData(clusterData2024); // Set data for 2024 as default

  //       // You can also compute bounds if you have geometries
  //       // const bounds = [clusterData2021, clusterData2022, clusterData2023, clusterData2024]
  //       //     .flatMap(data => data.features.map(f => f.bounds));
  //       // if (bounds.length) {
  //       //     setBounds(L.latLngBounds(bounds));
  //       // }

  //       setIsNewUpload(true);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchAllData();
  // }, []);


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const years = [2020, 2023];
  
        // Fetching GeoJSON data
        const geojsonPromises = years.map(year =>
          fetch(`http://localhost:8000/data/Tangerang_baru_${year}`).then(res => res.json())
        );
  
        // Fetching cluster data
        const clusterPromises = years.map(year =>
          fetch(`http://localhost:8000/data/cluster_in_tangerang_${year}`).then(res => res.json())
        );
  
        // Waiting for both fetches to complete
        const [geojsonData2020, geojsonData2023] = await Promise.all(geojsonPromises);
        const [clusterData2020, clusterData2023] = await Promise.all(clusterPromises);
  
        // Prepare the files data
        const newFiles = [
          {
            name: "Kecamatan Kota Tangerang 2020",
            data: geojsonData2020,
            checked: false,
            selectedColumns: Object.keys(geojsonData2020.features[0].properties),
          },
          {
            name: "Kecamatan Kota Tangerang 2023",
            data: geojsonData2023,
            checked: false,
            selectedColumns: Object.keys(geojsonData2023.features[0].properties),
          },
          
          {
            name: "Analisa 2020",
            data: clusterData2020,
            checked: false,
            selectedColumns: Object.keys(clusterData2020.features[0].properties),
          },
          {
            name: "Analisa 2023",
            data: clusterData2023,
            checked: true,
            selectedColumns: Object.keys(clusterData2023.features[0].properties),
          },
          
        ];
  
        // Update state
        setUploadedFiles([...uploadedFiles, ...newFiles]);
        setGeojsonData(clusterData2023); // Set data for 2024 as default
  
        // Compute bounds
        const bounds = [geojsonData2020, geojsonData2023]
          .flatMap(data => data.features.map(f => f.bounds));
        if (bounds.length) {
          setBounds(L.latLngBounds(bounds));
        }
  
        setIsNewUpload(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchAllData();
  }, []);
  
  // Get bounds everytime shapefile uploaded
  useEffect(() => {
    console.log("useEffect triggered with dependencies: ", {
      geojsonData,
      rasterData,
      bounds,
      isNewUpload,
      uploadedFiles,
    });

    if (mapRef.current && isNewUpload) {
      const map = mapRef.current;
      let combinedBounds = null;

      // Fit bounds for geojsonData
      if (
        geojsonData &&
        geojsonData.features &&
        geojsonData.features.length > 0
      ) {
        try {
          const geoJsonLayer = L.geoJSON(geojsonData);
          if (geoJsonLayer.getBounds().isValid()) {
            combinedBounds = L.latLngBounds(geoJsonLayer.getBounds());
          } else {
            console.error("Invalid bounds for geojsonData:", geojsonData);
          }
        } catch (error) {
          console.error("Error creating GeoJSON layer:", error);
        }
      }

      // Fit bounds for rasterData
      if (rasterData && rasterData.length > 0) {
        rasterData.forEach((raster) => {
          if (raster.bounds) {
            const rasterBounds = L.latLngBounds(raster.bounds);
            if (rasterBounds.isValid()) {
              combinedBounds = combinedBounds
                ? combinedBounds.extend(rasterBounds)
                : rasterBounds;
            }
          }
        });
      }

      // Check if combinedBounds is valid before fitting map bounds
      if (combinedBounds && combinedBounds.isValid()) {
        map.fitBounds(combinedBounds, {
          maxZoom: 12,
        });
      } else {
        console.error("Invalid combinedBounds:", combinedBounds);
      }

      setIsNewUpload(false); // Reset isNewUpload after fitting bounds

      console.log("Bounds fit completed, isNewUpload reset");
    }
  }, [geojsonData, rasterData, bounds, isNewUpload, uploadedFiles]);

 

  return (
    <div className="container">
      <MapContainer
        ref={mapRef}
        center={position}
        zoom={5}
        style={{ width: "100%", height: "97vh" }}
        minZoom={3}
        maxBounds={[
          [-90, -180], // Batas sudut barat daya
          [90, 180], // Batas sudut timur laut
        ]}
      >
        {!hideComponents && (
          <Menu
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            isMenuOpen={isMenuOpen}
            handleMenuToggle={handleMenuToggle}
            isContinentsVisible={isContinentsVisible}
            handleToggleContinents={handleToggleContinents}
            uploadedFiles={uploadedFiles}
            handleShowFile={handleShowFile}
            handleRasterFile={handleRasterFile}
            // handleGeoJSONUpload={handleGeoJSONUpload}
            handleFileUpload={handleFileUpload}
            isContinentsCheckboxEnabled={isContinentsCheckboxEnabled}
            isUploadCheckboxEnabled={isUploadCheckboxEnabled}
            handleColumnSelection={handleColumnSelection}
            hideComponents={hideComponents}
          />
        )}

        {!hideComponents && selectedOption !== "Maplibre" && <Search />}
        {selectedOption === "OSM" && (
          <>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> {selectedOption !== "Maplibre" &&<ElevationMarker />}
          </>
          
        )}
        {selectedOption === "Imagery" && (
          <>
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          /> {selectedOption !== "Maplibre" &&<ElevationMarker />}
          </>
          
        )}
        {selectedOption === "Topo" && (
          <> 
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          /> {selectedOption !== "Maplibre" &&<ElevationMarker />}
          </>
         
        )}

        {/* {renderGeoJSONLayers()} */}
        {/* {isContinentsVisible && <ContinentsPolygonLayer data={continents} />} */}
        {selectedOption !== "Maplibre" &&
          geojsonData &&
          uploadedFiles.map(
            (file, index) =>
              file.checked && // Only show checked files
              !file.name.endsWith(".tif") &&
              !file.name.endsWith(".tiff") &&
              file.data && (
                <GeoJSON
                  key={index}
                  data={file.data}
                  style={(feature) =>
                    getFeatureStyle(feature, selectedProperty)
                  }
                  onEachFeature={(feature, layer) =>
                    onEachFeature(feature, layer, uploadedFiles)
                  }
                />
              )
          )}

        {selectedOption !== "Maplibre" &&
          rasterData &&
          bounds &&
          rasterData.map((raster, index) => {
            console.log("Rendering raster image:", raster);
            console.log("index", index);
            return (
              <ImageOverlay
                key={index}
                url={`data:image/png;base64,${raster}`}
                bounds={bounds}
                opacity={rasterOpacity[index] || 0.8}
                interactive={true}
                ref={imageOverlayRef}
                eventHandlers={{
                  click: (e) => {
                    handleClick(e, index);
                  },
                }}
              />
            );
          })}
        <ScaleControl position="bottomleft" imperial={true} />
        {selectedOption !== "Maplibre" && (
          <GeomanToolbar
            setcolorPickerRef={(ref) =>
              (colorPickerControlRef.current = ref.current)
            }
          />
        )}
        <ShowCoordinates />

        {selectedOption !== "Maplibre" &&
          uploadedFiles.map((file, index) => {
            if (
              file.checked && // Only show checked files
              !file.name.endsWith(".tif") &&
              !file.name.endsWith(".tiff") &&
              file.data
            ) {
              return (
                <button
                  key={index} // Ensure each button has a unique key
                  onClick={() => {
                    togglePopup();
                    toggleLegend(); // Toggle both popup and legend visibility
                  }}
                  style={{
                    position: "absolute",
                    top: "150px",
                    right: "20px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    color: "black",
                    border: "none",
                    cursor: "pointer",
                    backgroundImage: `url(${logo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "40px",
                    backgroundPosition: "center",
                    zIndex: 1000,
                    transition: "transform 0.3s ease-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
              );
            }
            return null; // Return null for files that do not meet the conditions
          })}
        {selectedOption !== "Maplibre" && showPopup && (
          <PopupComponent
            data={geojsonData} // Ensure geojsonData is defined and passed correctly
            onSelectPropertyChange={handleSelectPropertyChange}
            onTogglePopup={togglePopup}
            onToggleLegend={toggleLegend}
          />
        )}
        {selectedOption !== "Maplibre" && showLegend && <Legend />}
      </MapContainer>
      {selectedOption === "Maplibre" && (
        <div
          id="maplibre-map"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></div>
      )}
    </div>
  );
};
