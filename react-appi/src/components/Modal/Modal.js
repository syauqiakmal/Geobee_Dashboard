import React, { useState, useEffect } from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';

const Modal = ({
  show,
  onClose,
  title,
  description,
  images, // An array of image URLs
  section1Title,
  section1Description,
  section2Title,
  section2Description,
  section3Title,
  section3Description
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setFadeIn(false);
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          setFadeIn(true);
        }, 500);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [show, images.length]);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className={`carousel-container ${fadeIn ? 'fade-in' : 'fade-out'}`}>
          <img
            src={images[currentImageIndex]}
            alt={`${title} - ${currentImageIndex + 1}`}
            className="modal-image"
          />
        </div>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-description">{description}</p>
        <h3 className="modal-sub-title">{section1Title}</h3>
        <p className="modal-description">{section1Description}</p>
        <h3 className="modal-sub-title">{section2Title}</h3>
        <p className="modal-description">{section2Description}</p>
        <h3 className="modal-sub-title">{section3Title}</h3>
        <p className="modal-description">{section3Description}</p>
        <div className="modal-footer">
        <Link to="insights/Waste-Management"className="modal-action-button">Visit Map </Link>
        </div>
        <button
          className="modal-action-button youtube-button"
          onClick={() => window.open('https://www.youtube.com/watch?v=5OKcpadp8Lk', '_blank')}
        >
          Demo on YouTube
        </button>
      </div>
    </div>
  );
};

export default Modal;



