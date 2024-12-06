import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ icon, title, description, image, backgroundColor, textColor }) => {
  return (
  <div className="feature-card" style={{ backgroundColor: backgroundColor }}>
    <div className="feature-card-header">
      <div className="feature-icon"><img src={icon} alt={`${title} icon`} className="icon" /></div>
      <img className="feature-image" src={image} alt={title} />
    </div>
    <div className="feature-card-content" style={{color: textColor}}>
      <div className="feature-text">
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
        </div>
    </div>
  </div>
  );
};

export default FeatureCard;
