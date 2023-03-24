import React from 'react';
import '../../App.css';
import { Button } from './Button';
import '../style/HeroSection.css';
import videoBg from "../../assets/videos/background_video.mkv"
import { Link } from "react-router-dom";


function HeroSection() {
  return (
    <>
    <div className='hero-container'>
       <video src={videoBg} autoPlay loop muted /> 
      <h1>SZUKASZ PRZYJACIELA?</h1>
      <p>Nie czekaj, zaadoptuj!</p>
      <div className='hero-btns'>
        <Link to="/wszystkie">
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            ZAADOPTUJ
          </Button>
        </Link>
        <Link to="/ostatnioznalezione">
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
          >
            ZNAJDŹ ZGUBĘ
          </Button>
        </Link>
      </div>
    </div></>
  );
}

export default HeroSection;