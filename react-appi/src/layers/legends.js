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
        <h5>Jumlah Penduduk</h5>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffffe0' }}></span>200,000+</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffff99' }}></span>150,000 - 199,999</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ffcc00' }}></span>100,000 - 149,999</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ff9900' }}></span>85,000 - 99,999</div>
        <div className="legend-item"><span className="legend-color" style={{ backgroundColor: '#ff0000' }}></span>0 - 84,999</div>
      </div>
    </div>
  );
};

export default Legend;
