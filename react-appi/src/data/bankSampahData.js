export const bankSampahData = {
    "layers": [
     {
      "currentVersion": 10.71,
      "id": 0,
      "name": "Bank Sampah",
      "type": "Feature",
      "description": "",
      "geometryType": "esriGeometryPoint",
      "sourceSpatialReference": {
       "wkid": 32748,
       "latestWkid": 32748
      },
      "copyrightText": "",
      "parentLayer": null,
      "subLayers": [],
      "minScale": 0,
      "maxScale": 0,
      "drawingInfo": {
       "renderer": {
        "type": "simple",
        "symbol": {
         "type": "esriSMS",
         "style": "esriSMSCircle",
         "color": [
          124,
          0,
          145,
          255
         ],
         "size": 4,
         "angle": 0,
         "xoffset": 0,
         "yoffset": 0,
         "outline": {
          "color": [
           0,
           0,
           0,
           255
          ],
          "width": 1
         }
        },
        "label": "",
        "description": ""
       },
       "transparency": 0,
       "labelingInfo": null
      },
      "defaultVisibility": true,
      "extent": {
       "xmin": "NaN",
       "ymin": "NaN",
       "xmax": "NaN",
       "ymax": "NaN",
       "spatialReference": {
        "wkid": 102100,
        "latestWkid": 3857
       }
      },
      "hasAttachments": true,
      "htmlPopupType": "esriServerHTMLPopupTypeAsHTMLText",
      "displayField": "NAMA",
      "typeIdField": null,
      "subtypeFieldName": null,
      "subtypeField": null,
      "defaultSubtypeCode": null,
      "fields": [
       {
        "name": "objectid",
        "type": "esriFieldTypeOID",
        "alias": "OBJECTID",
        "domain": null
       },
       {
        "name": "nama",
        "type": "esriFieldTypeString",
        "alias": "NAMA",
        "length": 50,
        "domain": null
       },
       {
        "name": "jenis",
        "type": "esriFieldTypeString",
        "alias": "JENIS",
        "length": 50,
        "domain": {
         "type": "codedValue",
         "name": "jenis_bank",
         "description": "Jenis Bank Sampah",
         "codedValues": [
          {
           "name": "Bank Sampah Masyarakat",
           "code": "BANK_SAMPAH_MASYARAKAT"
          },
          {
           "name": "Bank Sampah Sekolah",
           "code": "BANK_SAMPAH_SEKOLAH"
          }
         ],
         "mergePolicy": "esriMPTDefaultValue",
         "splitPolicy": "esriSPTDefaultValue"
        }
       },
       {
        "name": "alamat",
        "type": "esriFieldTypeString",
        "alias": "ALAMAT",
        "length": 50,
        "domain": null
       },
       {
        "name": "kecamatan",
        "type": "esriFieldTypeString",
        "alias": "KECAMATAN",
        "length": 50,
        "domain": {
         "type": "codedValue",
         "name": "kecamatan",
         "description": "Kecamatan",
         "codedValues": [
          {
           "name": "Batuceper",
           "code": "batuceper"
          },
          {
           "name": "Benda",
           "code": "benda"
          },
          {
           "name": "Cibodas",
           "code": "cibodas"
          },
          {
           "name": "Ciledug",
           "code": "ciledug"
          },
          {
           "name": "Cipondoh",
           "code": "cipondoh"
          },
          {
           "name": "Jatiuwung",
           "code": "jatiuwung"
          },
          {
           "name": "Karangtengah",
           "code": "karangtengah"
          },
          {
           "name": "Karawaci",
           "code": "karawaci"
          },
          {
           "name": "Larangan",
           "code": "larangan"
          },
          {
           "name": "Neglasari",
           "code": "neglasari"
          },
          {
           "name": "Priuk",
           "code": "priuk"
          },
          {
           "name": "Pinang",
           "code": "pinang"
          },
          {
           "name": "Tangerang",
           "code": "tangerang"
          }
         ],
         "mergePolicy": "esriMPTDefaultValue",
         "splitPolicy": "esriSPTDefaultValue"
        }
       },
       {
        "name": "kelurahan",
        "type": "esriFieldTypeString",
        "alias": "KELURAHAN",
        "length": 50,
        "domain": null
       },
       {
        "name": "user_add",
        "type": "esriFieldTypeString",
        "alias": "USER_ADD",
        "length": 50,
        "domain": null
       },
       {
        "name": "date_add",
        "type": "esriFieldTypeDate",
        "alias": "DATE_ADD",
        "length": 8,
        "domain": null
       },
       {
        "name": "user_edit",
        "type": "esriFieldTypeString",
        "alias": "USER_EDIT",
        "length": 50,
        "domain": null
       },
       {
        "name": "date_edit",
        "type": "esriFieldTypeDate",
        "alias": "DATE_EDIT",
        "length": 8,
        "domain": null
       },
       {
        "name": "shape",
        "type": "esriFieldTypeGeometry",
        "alias": "shape",
        "domain": null
       }
      ],
      "geometryField": {
       "name": "shape",
       "type": "esriFieldTypeGeometry",
       "alias": "shape"
      },
      "indexes": [
       {
        "name": "r62_sde_rowid_uk",
        "fields": "objectid",
        "isAscending": true,
        "isUnique": true,
        "description": ""
       },
       {
        "name": "a35_ix1",
        "fields": "shape",
        "isAscending": true,
        "isUnique": true,
        "description": ""
       }
      ],
      "subtypes": [],
      "relationships": [],
      "canModifyLayer": false,
      "canScaleSymbols": false,
      "hasLabels": false,
      "capabilities": "Map,Query,Data",
      "maxRecordCount": 1000,
      "supportsStatistics": true,
      "supportsAdvancedQueries": true,
      "supportedQueryFormats": "JSON, geoJSON",
      "isDataVersioned": false,
      "ownershipBasedAccessControlForFeatures": {"allowOthersToQuery": true},
      "useStandardizedQueries": true,
      "advancedQueryCapabilities": {
       "useStandardizedQueries": true,
       "supportsStatistics": true,
       "supportsHavingClause": true,
       "supportsCountDistinct": true,
       "supportsOrderBy": true,
       "supportsDistinct": true,
       "supportsPagination": true,
       "supportsTrueCurve": true,
       "supportsReturningQueryExtent": true,
       "supportsQueryWithDistance": true,
       "supportsSqlExpression": true
      },
      "supportsDatumTransformation": true,
      "dateFieldsTimeReference": null,
      "supportsCoordinatesQuantization": true
     }
    ],
    "tables": []
}