import React from 'react';
import './ProjectInfo.css';

const ProjectInfo = () => {
  return (
    <section className="project-info">
        <h5 className="project-subtitle">About GeoBee Insight</h5>
      <div className="project-header">
        <h2 className="project-title">Solusi untuk Analisis Geospasial dan Pengambilan Keputusan Berbasis Data</h2>
        <p className="project-description">
        Platform pintar untuk visualisasi dan analisis data spasial secara interaktif, 
        mendukung pengambilan keputusan berbasis data di berbagai bidang. 
        Dengan integrasi teknologi kecerdasan buatan (AI), GeoBee Insight 
        memungkinkan pemantauan real-time dan prediksi yang lebih akurat untuk isu-isu 
        lingkungan, perencanaan kota, dan manajemen risiko.
        </p>
      </div>
      <div className="project-content">
      </div>
    </section>
  );
};

export default ProjectInfo;