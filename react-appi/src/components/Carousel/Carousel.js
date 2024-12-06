import React, { useState } from 'react';
import './Carousel.css';
import Modal from '../Modal/Modal.js';
import WasteManagementImage from '../assets/waste-management-2.jpeg';
import Image2 from '../assets/project-info.png'
import Image3 from '../assets/aerial-view-track.jpg'
import { Link } from 'react-router-dom';


const cards = [
  {
    image1: WasteManagementImage,
    image2: Image2,
    image3: Image3,
    headline: 'Pengembangan Indeks Kesiapan dan Layer Data Spasial Terintegrasi untuk Pengelolaan Sampah Skala Kelurahan di Kota Tangerang',
    description:
      'Platform ini dirancang untuk memberikan solusi dalam pengelolaan sampah berbasis data geospasial dan kecerdasan buatan (Geo-AI), dengan fokus pada penilaian kesiapan daerah dalam pengelolaan sampah. Proses dimulai dengan pengumpulan data yang meliputi informasi mengenai sampah padat (solid waste), demografi penduduk, dan administrasi wilayah. Data ini menjadi dasar untuk analisis lebih lanjut, dengan pendekatan yang menggabungkan teknologi GIS dan metode Multi Criteria Decision Analysis (MCDA).',
    clickable: true,
    section1Title: 'Pemrosesan Data',
    section1Description: 'Pemrosesan data dimulai dengan mengonversi data tabular menjadi format yang siap digunakan dalam GIS, lalu dilakukan normalisasi nilai antara 0 dan 1 untuk memastikan keseragaman data. Selanjutnya, Analytical Hierarchy Process (AHP) diterapkan untuk menilai sistem pengumpulan dan pengangkutan sampah berdasarkan kriteria yang relevan, seperti infrastruktur, kepadatan penduduk, dan kemampuan administratif. Hasil AHP ini kemudian dirangkum melalui untuk memberikan skor akhir dari kesiapan setiap wilayah dalam menangani sampah.',
    section2Title: 'Analisis dan Visualisasi Data',
    section2Description: 'Analisis dan visualisasi data dilakukan untuk memberikan representasi spasial yang akurat, sehingga dapat menunjukkan informasi lapangan yang jelas dan terperinci. Peta yang dihasilkan dilengkapi dengan atribut tabel yang memberikan informasi lebih lanjut tentang setiap area yang dianalisis, disertai dengan fitur dasar Sistem Informasi Geografis seperti zoom, panning, dan overlay.',
    section3Title: 'Luaran',
    section3Description: 'Keluaran dari sistem ini adalah dua hal penting: Readiness-index untuk pengelolaan sampah di tingkat kelurahan dan Layer Data Geospasial ter-Analisis untuk mengakomodir kegiatan pelayanan persampahan seperti pemilahan, pewadahan, pengangkutan, pengolahan, dan pemrosesan akhir sampah, dengan tujuan untuk meningkatkan efisiensi dan efektivitas pengelolaan sampah di tingkat kelurahan.'
  },
  {
    image1: Image2,
    headline: 'Lorem ipsum',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    clickable: false,
  },
  {
    image1: Image3,
    headline: 'Lorem ipsum',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    clickable: false,
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    description: '',
    image: '',
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleCardClick = (card, event) => {
    event.preventDefault();
    setModalData({
      title: card.headline,
      description: card.description,
      image1: card.image1,
      image2: card.image2,
      image3: card.image3,
      section1Title: card.section1Title,
      section1Description: card.section1Description,
      section2Title: card.section2Title,
      section2Description: card.section2Description,
      section3Title: card.section3Title,
      section3Description: card.section3Description,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="carousel-section">
      <div className="carousel-text">
        <h2>Jelajahi hasil kerja yang telah kami implementasikan:</h2>
        <h1>{cards[currentIndex].headline}</h1>
        <p>{cards[currentIndex].description}</p>
        <a href="#" className="selengkapnya-link" onClick={(event) => handleCardClick(cards[currentIndex], event)}>
          Selengkapnya
        </a>
        <div className="button-container">
            <Link to="insights/Waste-Management" className="visit-map-button">Visit Map</Link>
          {/* <div className="carousel-nav-button">
            <button className="nav-button" onClick={handlePrev}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
              </svg>
            </button>
            <button className="nav-button" onClick={handleNext}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6z" />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
      <div className="carousel-image-container">
        <img src={cards[currentIndex].image1} alt={cards[currentIndex].headline} />
      </div>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        title={modalData.title}
        description={modalData.description}
        images={[modalData.image1, modalData.image2, modalData.image3]}
        section1Title={modalData.section1Title}
        section1Description={modalData.section1Description}
        section2Title={modalData.section2Title}
        section2Description={modalData.section2Description}
        section3Title={modalData.section3Title}
        section3Description={modalData.section3Description}
      />
    </div>
  );
};

export default Carousel;


