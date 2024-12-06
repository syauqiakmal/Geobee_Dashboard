// HeroSection.js
import React from 'react';
import './HeroSection.css';
import videoSrc from '../assets/globe.mp4';
import overlayImage from '../assets/Hero Video-Overlay.png';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <video className="hero-video" src={videoSrc} autoPlay loop muted playsInline>
                Your browser does not support the video tag.
            </video>

      <img src={overlayImage} alt="Overlay" className="hero-overlay" />
      <div className="hero-content">
        <h5>GeoBeeInsight</h5>
        <h1>Explore, Analyze, Decide<br></br>— All in One Dashboard</h1>
        <p>
        Platform interaktif untuk  visualisasi dan integrasi data geospasial—peta, grafik, tabel, dan lainnya dalam satu antarmuka. Dirancang untuk memudahkan pemahaman informasi spasial, mendukung keputusan yang lebih efektif di bidang perencanaan kota, manajemen bencana, lingkungan, transportasi, dan lainnya.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
