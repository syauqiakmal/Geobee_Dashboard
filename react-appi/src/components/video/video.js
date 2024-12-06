import React from 'react';
import './video.css';
import videoSrc from '../assets/Animation.mp4';

const VideoComponent = () => {
  return (
    <div className="video-container">
      <div className="video-player-wrapper">
        <video className="video-player" src={videoSrc} autoPlay loop muted playsInline />
      </div>
      <div className="video-title">
        <h2>Lihat Bagaimana<br/> Sistem Kami Bekerja.</h2>
        <p>
        Melalui sistem kami, Anda dapat mengakses dan menganalisis data dengan <br />
         lebih cepat dan akurat, memungkinkan pengambilan keputusan yang lebih <br />
          cerdas dan strategis. Temukan bagaimana teknologi kami mengubah cara <br />
           Anda memahami dan memanfaatkan data geospasial.
        </p>
      </div>
    </div>
  );
};

export default VideoComponent;