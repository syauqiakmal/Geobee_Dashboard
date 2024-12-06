// FeatureSection.js
import React from 'react';
import './FeatureSection.css';
import FeatureCard from '../FeatureCard/FeatureCard.js';

import icon1 from '../assets/icons/visualization.svg'
import icon2 from '../assets/icons/dashboard.svg'
import icon3 from '../assets/icons/artificial-intelligence.svg'

import image1 from '../assets/feature-bg-1.png';
import image2 from '../assets/feature-bg-2.png';
import image3 from '../assets/feature-bg-3.png';

const features = [
  {
    icon: icon1,
    title: 'Multisource Geo Visualization',
    description: 'Mengintegrasikan data dari berbagai sumber ke dalam satu tampilan peta, memungkinkan analisis lokasi yang lebih lengkap dan mendalam untuk pengambilan keputusan yang optimal.',
    image: image1,
    backgroundColor:"#fff",
    textColor: "#333"
  },
  {
    icon: icon2,
    title: 'Interactive Dashboard',
    description: 'Memungkinkan pengguna berinteraksi langsung dengan data melalui fitur dinamis, mempermudah pemahaman, dan pengambilan keputusan cepat.',
    image: image2,
    backgroundColor:"#0079B5",
    textColor: "#fff"
  },
  {
    icon: icon3,
    title: 'Intelligence Analytics',
    description: 'Menggabungkan analisis data dengan kecerdasan buatan untuk memberikan wawasan yang lebih mendalam, membantu pengambilan keputusan yang lebih cepat dan lebih tepat.',
    image: image3,
    backgroundColor:"#fff",
    textColor: "#333"
  },
];

const FeatureSection = () => {
  return (
    <div className="feature-section">
      <div className="feature-section-content">
        <h1>Visualisasi, Interaktif Data, dan Analitik</h1>
        <p>Temukan solusi terbaik untuk visualisasi, analitik, dan pemetaan data dengan layanan kami yang meliputi visualisasi geo multi-<br></br>sumber, dashboard interaktif, dan analitik cerdas.</p>
      </div>
      <div className="feature-section-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            image={feature.image}
            backgroundColor={feature.backgroundColor}
            textColor={feature.textColor}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
