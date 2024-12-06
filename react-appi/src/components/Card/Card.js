import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ image, headline, description, onClick, className }) => {
  
  return (
    <div className={`card ${className}`}>
      <h1>{headline}</h1>
      <p>{description}</p>
      <a href="#" className="selengkapnya-link" onClick={onClick}>Selengkapnya</a>
      <div className="button-container">
      <Link to="insights/Waste-Management" className="visit-map-button">Visit Map</Link>
      </div>
      <div className="image-container">
        <img src={image} />
      </div>
    </div>
  );
};

export default Card;
