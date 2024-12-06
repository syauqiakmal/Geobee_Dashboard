import React from 'react';
import './TeamMember.css';

const TeamMember = ({ image, name, title }) => {
  return (
    <div className="team-member">
      {/* Jika `image` tersedia, tampilkan gambar; jika tidak, gunakan placeholder */}
      <div
        className="team-member-image"
        style={{
          backgroundImage: image ? `url(${image})` : 'none',
          backgroundColor: image ? 'transparent' : '#ffffff', 
        }}
      >

      </div>
      {/* Informasi Anggota */}
      <div className="team-member-info">
        {name && <h3 className="team-member-name">{name}</h3>}
        {title && <p className="team-member-title">{title}</p>}
      </div>
    </div>
  );
};

export default TeamMember;
