import '../App.css';
import HeroSection from '../components/HeroSection/HeroSection.js';
import Carousel from '../components/Carousel/Carousel.js';
import TeamGrid from '../components/TeamGrid/TeamGrid.js';
import FeatureSection from '../components/FeatureSection/FeatureSection.js';
import Header from '../components/header/header.js';
import ShowCase from '../components/ShowCase/MapShowCase.js'
import Footer from '../components/Footer/Footer.js';
import VideoComponent from '../components/video/video.js'
import Partner from '../components/partner/partner.js'
import ProjectInfo from '../components/ProjectInfo/ProjectInfo.js';


function Landing() {
  return (
    <div className="App">
    <header>
      <Header />
    </header>
    <main>
      <section>
        <HeroSection />
      </section>

      <section id="about-section">
        <ProjectInfo />
        <ShowCase />
      </section>

      <section id="works-section">
        <Carousel />
      </section>

      <section id="feature-section">
        <FeatureSection />
      </section>

      <TeamGrid />
      <Partner />
      
      <VideoComponent />
      <section id="contact-section">
        <Footer />
      </section>
      
    </main>
  </div>
  );
}

export default Landing;
