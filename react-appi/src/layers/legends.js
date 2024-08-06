// Legend.js
import React from 'react';

const Legend = () => {
  return (
    <div className="legend" style={{
        position: "absolute",
        zIndex: 1000,
      }}>
      <h4>Analisis by color</h4>
      
      <div className="legend-section">
        <h5>Pengurangan Sampah</h5>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffffe0' }}></span>50,000+</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffff99' }}></span>30,000 - 49,999</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffcc00' }}></span>10,000 - 29,999</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ff9900' }}></span>5,000 - 9,999</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ff0000' }}></span>0 - 4,999</div>
      </div>
      
      <div className="legend-section">
        <h5>Penanganan Sampah</h5>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffffe0' }}></span>50,000+</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffff99' }}></span>40,000 - 49,999</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffcc00' }}></span>20,000 - 39,999</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ff9900' }}></span>10,000 - 19,999</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ff0000' }}></span>0 - 9,999</div>
      </div>
      
      <div className="legend-section">
        <h5>Jumlah Armada Truk</h5>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffffe0' }}></span>20+</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffff99' }}></span>15 - 19</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffcc00' }}></span>10 - 14</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ff0000' }}></span>0 - 9</div>
      </div>
      
      

      <div className="legend-section">
  <h5>Clustering</h5>
  <div className="legend-item">
    <span className="legend-color" style={{ backgroundColor: '#ffcc00' }}></span>
    <span className="legend-description">Cluster 2: Kecamatan dengan nilai sedang di ketiga variabel</span>
  </div>
  <div className="legend-item">
    <span className="legend-color" style={{ backgroundColor: '#ff9900' }}></span>
    <span className="legend-description">Cluster 1: Kecamatan dengan penanganan sampah dan jumlah armada truk tinggi, tetapi pengurangan sampah rendah</span>
  </div>
  <div className="legend-item">
    <span className="legend-color" style={{ backgroundColor: '#ff0000' }}></span>
    <span className="legend-description">Cluster 0: Kecamatan dengan pengurangan sampah tinggi tetapi penanganan sampah dan jumlah armada truk rendah</span>
  </div>
</div>


    </div>
  );
};

export default Legend;
