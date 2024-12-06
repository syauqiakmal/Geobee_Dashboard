import React, { useEffect, useState } from 'react';
import Logo from '../assets/Logo-New.svg';
import LogoDark from '../assets/logo-dark.png';
import './header.css';
import { Link } from 'react-scroll';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      id="header"
      className={`header ${isScrolled ? 'scrolled' : 'transparent'}`}
    >
      <div className="header-row">
        <div id="logo">
          <a href="/">
            <img
              className="logo-default"
              src={isScrolled ? LogoDark : Logo}
              alt="Logo"
            />
          </a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div
          className={`primary-menu-trigger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <div className="cnvs-hamburger-box">
            <div className="cnvs-hamburger-inner"></div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className={`primary-menu ${menuOpen ? 'show' : ''}`}>
          <ul className="menu-container">
            <li className="menu-item">
              <Link
                className="menu-link"
                to="about-section"
                smooth={true}
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="menu-item">
              <Link
                className="menu-link"
                to="works-section"
                smooth={true}
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                Works
              </Link>
            </li>
            <li className="menu-item">
              <Link
                className="menu-link"
                to="feature-section"
                smooth={true}
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                Features
              </Link>
            </li>
            <li className="menu-item">
              <Link
                className="menu-link"
                to="contact-section"
                smooth={true}
                duration={500}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;