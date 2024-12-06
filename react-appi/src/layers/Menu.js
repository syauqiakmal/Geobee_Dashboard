import React, { useState, useEffect, useRef } from "react";
import logo from "../Logo/Logo GeoBee (Title).png";
import logo2 from "../Logo/Logo GeoBee (Map).png";
import { Link } from 'react-router-dom';


const Menu = ({
  selectedOption,
  handleOptionChange,
  isMenuOpen,
  handleMenuToggle,
  isContinentsVisible,
  handleToggleContinents,
  uploadedFiles,
  handleShowFile,
  handleFileUpload,
  isContinentsCheckboxEnabled,
  isUploadCheckboxEnabled,
  handleColumnSelection,
  handleRasterFile,
  hideComponents,
}) => {
  const [dropdownStates, setDropdownStates] = useState({});
  const menuRef = useRef(null);

  const toggleDropdown = (index) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  useEffect(() => {
    const handleDoubleClick = (event) => {
      event.stopPropagation();
    };

    const menuElement = menuRef.current;
    if (menuElement) {
      menuElement.addEventListener("dblclick", handleDoubleClick);
    }

    return () => {
      if (menuElement) {
        menuElement.removeEventListener("dblclick", handleDoubleClick);
      }
    };
  }, []);

  return (
    <div className="dashboard-menu" style={{ zIndex: 1000 }} ref={menuRef}>
      <input
        type="checkbox"
        id="dashboard-toggle"
        className="dashboard-toggle"
        checked={isMenuOpen}
        onChange={handleMenuToggle}
      />
      <label htmlFor="dashboard-toggle" className="dashboard-icon">
        <div className="strip"></div>
        <div className="strip"></div>
        <div className="strip"></div>
      </label>
      <hr className="divider-vertical" /> {/* Pembatas */}
      <div className="menu-logo-container">
      <Link to="/">
        <img src={logo2} alt="Logo" className="logo2" />
        <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className={`dashboard-links ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <div className="testing">
              <label
                className="nameMenu"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="radio"
                  name="mapOption"
                  value="OSM"
                  checked={selectedOption === "OSM"}
                  onChange={() => handleOptionChange("OSM")}
                />
                <p>OSM Street</p>
              </label>
            </div>
          </li>
          <li>
            <div className="testing">
              <label
                className="nameMenu"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="radio"
                  name="mapOption"
                  value="Imagery"
                  checked={selectedOption === "Imagery"}
                  onChange={() => handleOptionChange("Imagery")}
                />
                <p> ESRI World Imagery</p>
              </label>
            </div>
          </li>
          <li>
            <div className="testing">
              <label
                className="nameMenu"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="radio"
                  name="mapOption"
                  value="Topo"
                  checked={selectedOption === "Topo"}
                  onChange={() => handleOptionChange("Topo")}
                />
                <p>Topography Map</p>
              </label>
            </div>
          </li>
          <li>
            <div className="testing">
              <label
                className="nameMenu"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="radio"
                  name="mapOption"
                  value="Maplibre"
                  checked={selectedOption === "Maplibre"}
                  onChange={() => handleOptionChange("Maplibre")}
                />
                <p> 3D Maps</p>
              </label>
            </div>
          </li>
          
          <hr className="divider" /> {/* Pembatas */}
          {!hideComponents && selectedOption !== "Maplibre" && (
            <li className="inputshp">
            <label className="choose_file">
              <input
                type="file"
                id="shapefileInput"
                accept=".zip,.tif,.tiff,.geojson"
                onClick={(e) => {
                  if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    const maxSize = 300 * 1024 * 1024; // 50 MB in bytes
                    if (file.size > maxSize) {
                      alert(
                        "File size exceeds 100 MB. Please upload a smaller file."
                      );
                      e.target.value = null; // Clear the file input
                    }
                  }
                }}
                onChange={handleFileUpload}
                disabled={!isUploadCheckboxEnabled}
              />
            </label>
          </li>)}
          <br></br>
          {!hideComponents && selectedOption !== "Maplibre" && uploadedFiles.map((file, index) => (
            <li key={index}>
              <div className="testing">
                <details
                  className="checkbox-wrapper-21"
                  open={dropdownStates[index]}
                >
                  {/* Check if file is a TIFF or ZIP */}
                  {file.name.endsWith(".tif") || file.name.endsWith(".tiff") ? (
                    <summary
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleDropdown(index)}
                    >
                      <label className="control control--checkbox">
                        <input
                          id={`toggle-${index}`}
                          type="checkbox"
                          checked={file.checked}
                          onChange={(e) => {
                            handleRasterFile(index, e.target.checked);
                            e.stopPropagation(); // Stop propagation if needed
                          }}
                          onClick={(e) => e.stopPropagation()} // Ensure click event is stopped
                        />
                        <div className="upload_file_name">{file.name}</div>
                        <div className="control__indicator"></div>
                      </label>
                    </summary>
                  ) : (
                    /* Render ZIP file with summary and additional info */
                    <>
                      <summary
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleDropdown(index)}
                      >
                        <label className="control control--checkbox">
                          <input
                            id={`toggle-${index}`}
                            type="checkbox"
                            checked={file.checked}
                            onChange={(e) =>
                              handleShowFile(index, e.target.checked)
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="upload_file_name">{file.name}</div>
                          <div className="control__indicator"></div>
                        </label>
                      </summary>
                      {file.checked && (
                        <div className="additional-info">
                          <ul className="ulshp">
                            {/* Render additional info for ZIP file */}
                            {Object.keys(file.data.features[0].properties)
                              .filter((column) => {
                                // Ensure all features meet the criteria for each column
                                return file.data.features.every(
                                  (feature) =>
                                    column !== "geom" &&
                                    column !== "id" &&
                                    feature.properties[column] !== "" &&
                                    feature.properties[column] !== "0" &&
                                    feature.properties[column] !== null
                                );
                              })
                              .map((column) => (
                                <li className="lishp" key={column}>
                                  <label className="labelshp">
                                    <input
                                      type="checkbox"
                                      checked={file.selectedColumns.includes(
                                        column
                                      )}
                                      onChange={(e) =>
                                        handleColumnSelection(
                                          index,
                                          column,
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <span style={{ marginLeft: "10px" }}>
                                      {column}
                                    </span>
                                  </label>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </details>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
