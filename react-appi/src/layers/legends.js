// Legend.js
import React from 'react';


const Legend = () => {
  return (
    <div className="legend"  style={{
        position: "absolute",
        
        zIndex: 1000,
       
      }}>
      <h4>Value Color</h4>
      <div><span style={{ backgroundColor: '#6f4f28' }}></span>70,000+</div>
<div><span style={{ backgroundColor: '#8b5c2e' }}></span>60,000 - 69,999</div>
<div><span style={{ backgroundColor: '#a65d2f' }}></span>55,000 - 59,999</div>
<div><span style={{ backgroundColor: '#d4733f' }}></span>50,000 - 54,999</div>
<div><span style={{ backgroundColor: '#cc3333' }}></span>40,000 - 49,999</div>
<div><span style={{ backgroundColor: '#e60000' }}></span>30,000 - 39,999</div>
<div><span style={{ backgroundColor: '#ff3333' }}></span>25,000 - 29,999</div>
<div><span style={{ backgroundColor: '#ff6666' }}></span>20,000 - 24,999</div>
<div><span style={{ backgroundColor: '#ff9999' }}></span>15,000 - 19,999</div>
<div><span style={{ backgroundColor: '#ffb3b3' }}></span>10,000 - 14,999</div>
<div><span style={{ backgroundColor: '#ffd9d9' }}></span>5,000 - 9,999</div>
<div><span style={{ backgroundColor: '#ffe6e6' }}></span>1,000 - 4,999</div>
<div><span style={{ backgroundColor: '#f2f2f2' }}></span>100 - 999</div>
<div><span style={{ backgroundColor: '#f2f2f2' }}></span>20 - 99</div>
<div><span style={{ backgroundColor: '#f2f2f2' }}></span>15 - 19</div>
<div><span style={{ backgroundColor: '#f2f2f2' }}></span>5 - 14</div>
<div><span style={{ backgroundColor: '#ffffff' }}></span>0 - 4</div>



    </div>
  );
};

export default Legend;
