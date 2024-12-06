import React, { useState } from "react";
import "./MapShowCase.css";

// Menggunakan gambar yang sama untuk setiap layer dan ikon
import mapImage1 from "../HeroSection/image/osm.png";
import mapImage2 from "../assets/imagery-map-2.jpeg";
import mapImage3 from "../HeroSection/image/topo.png";

const images = [mapImage1, mapImage2, mapImage3];
const icons = [
  {
    src: mapImage1,
    title: "OSM (Open Street Map)",
    description: "Tampilan peta jalan yang interaktif, akurat, dan mudah digunakan. Menyediakan informasi lengkap tentang jaringan jalan sehingga sangat cocok untuk navigasi.",
  },
  {
    src: mapImage2,
    title: "Citra Satelit (Imagery Map)",
    description: "Peta ini menunjukkan visualisasi nyata dari area geografis, termasuk lanskap alami, bangunan, dan permukaan air, untuk memahami konteks geografis secara mendalam.",
  },
  {
    src: mapImage3,
    title: "Topografi (Topography Map)",
    description: "Pandangan menyeluruh terhadap elevasi untuk keperluan analisis lanskap, studi lingkungan, dengan pemahaman lebih tentang struktur dan kompleksitas medan.",
  },
];

const MapShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(1); 

  const handleNextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleIconClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="map-showcase">
      <h2>Layer Pada Map</h2>
      <p className="map-description">
        Pilih tampilan peta yang sesuai untuk kebutuhan spesifik Anda, mulai dari peta jalan untuk navigasi, peta satelit untuk visual detail, hingga peta topografi untuk memahami elevasi dan kontur medan.
      </p>

      <div className="icon-section">
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`icon-container ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleIconClick(index)}
          >
            <img src={icon.src} alt={icon.title} className="icon-image" />
            <div className="icon-info">
              <h4>{icon.title}</h4>
              <p>{icon.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="map-image-container">
        <img src={images[activeIndex]} alt="Selected Map" className="map-image" />
      </div>
    </div>
  );
};

export default MapShowcase;