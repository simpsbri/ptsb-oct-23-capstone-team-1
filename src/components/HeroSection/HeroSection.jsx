import React from 'react';
import '../../index.css'; //not sure if this is the right path
import { Button } from '../Button/Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/videos/video-2.mp4" autoPlay loop muted />
      <h1>
        Technical Bootcamps + Work Gap Solution = Free Work Solutions for
        Businesses!
      </h1>

      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          STUDENT INFORMATION
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          LEARN MORE ABOUT BOOTCAMPS <i className="far fa-play-circle"></i>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
