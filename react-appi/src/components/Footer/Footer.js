import React from 'react';
import './Footer.css';
import logo from '../assets/Logo-New.svg';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo">
          <img src={logo} alt="Geo-Bee Insight Logo" className="logo-image" />
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-column">
            <h3><Link
              to="about-section"
              smooth={true}
              duration={500}
            >
              About
            </Link></h3>
            <h3><Link
              to="works-section"
              smooth={true}
              duration={500}
            >
              Works
            </Link></h3>
            <h3><Link
              to="feature-section"
              smooth={true}
              duration={500}
            >
              Features
            </Link></h3>
        </div>
        <div className="footer-contact">
          <h3>Butuh Bantuan?</h3>
          <p>📧 aagung@binus.edu</p>
          <p>Jl. Raya Kb. Jeruk No.27, RT.1/RW.9,<br/>
        Kemanggisan, Kec. Palmerah, Kota Jakarta Barat,<br/>
        Daerah Khusus Ibukota Jakarta 11530</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;