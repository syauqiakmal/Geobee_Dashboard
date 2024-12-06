// partner.js
import React from 'react';
import './partner.css';
import logo from '../assets/Tangerang.png'
import logo2 from '../assets/Bappeda.png'
import logo3 from '../assets/Geoai.png'
import logo4 from '../assets/binus.png'


const sponsors = [
  { id: 1, src: logo4, alt: '' },
  { id: 2, src: logo3, alt: '' },
  { id: 3, src: logo2, alt: '' },
  { id: 4, src: logo, alt: '' },

];

const Partner = () => {
    return (
      <div className="partner-container">
        <h2>Partner</h2>
        
        <div className="partner-slider">

          {/* Menampilkan dua kali untuk looping efek seamless */}
          
          {sponsors.map((sponsor, index) => (
            <img
              key={`sponsor-duplicate-${index}`}
              src={sponsor.src}
              alt={sponsor.alt}
              className="partner-logo"
            />
          ))}
        </div>
      </div>
    );
  };
export default Partner;
