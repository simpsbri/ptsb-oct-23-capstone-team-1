import React from 'react';
import '../../index.css'; //not sure if this is the right path
import { Button } from '../Button/Button';
import './HeroSection.css';
import '../../output.css';

function HeroSection() {
  return (
    <div className="hero-container">
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
          link="https://frontrange.uprighted.com/"
        >
          STUDENT INFORMATION
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          link="https://www.uprighted.com/about"
        >
          LEARN MORE ABOUT BOOTCAMPS <i className="far fa-play-circle"></i>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
