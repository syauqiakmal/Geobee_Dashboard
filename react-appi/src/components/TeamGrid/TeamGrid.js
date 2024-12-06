import React from 'react';
import './TeamGrid.css';
import TeamMember from '../TeamMember/TeamMember.js';
import image from '../assets/Foto-Alexander-Agung.jpeg'
import image2 from '../assets/Edy-irwansyah.jpg'
import image3 from '../assets/fabian-pramudya.jpeg'
import image4 from '../assets/kenan-ario.jpg'
import image5 from '../assets/edo-febriansyah.jpg'
import image6 from '../assets/said-achmad.jpeg'
import image7 from '../assets/syauqi_akmal.jpg'
import image8 from '../assets/hari-andrew.jpeg'
import image9 from '../assets/richie-muljana.jpeg'
import image10 from '../assets/andien_dwi_novika.jpeg'


const teamMembers = [
  {
    image: image,
    name: 'Dr. Ir. Alexander Agung Santoso Gunawan, S.Si., M.T., M.Sc. IPM.',
    title: 'Faculty Supervaisor/Site Sopervaisor',
  },
  {
    image: image2,
    name: 'Dr. Ir. Edy Irwansyah, S.T., M.Si., IPM, ASEAN Eng.',
    title: 'Dosen Pembimbing',
  },
  {
    image: image3,
    name: 'Fabian Surya Pramudya, S.T., M.T., Ph.D.',
    title: 'Dosen Pembimbing',
  },
  {
    image: image4,
    name: 'Muhamad Keenan Ario',
    title: 'Dosen Pembimbing',
  },
  {
    image: image5,
    name: 'Muhammad Edo Syahputra',
    title: 'Dosen Pembimbing',
  },
  {
    image: image6,
    name: 'Said Achmad',
    title: 'Dosen Pembimbing',
  },
  {
    image: image7,
    name: 'Syauqi Akmal Deffansyah',
    title: 'Mahasiswa',
  },
  {
    image: image8,
    name: 'Hari Andrew',
    title: 'Mahasiswa',
  },
  {
    image: null,
    name: '',
    title: '',
  },
  {
    image: image9,
    name: 'Richie Muljana',
    title: 'Mahasiswa',
  },
  {
    image: image10,
    name: 'Andien Dwi Novika',
    title: 'Create Landing Page',
  },
];


const TeamGrid = () => {
  return (
    <div className="team-grid-section">
      <h2 className="team-grid-title">Contributor</h2>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            image={member.image}
            name={member.name}
            title={member.title}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;
