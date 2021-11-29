import React from 'react';
import Carousel from 'react-material-ui-carousel';
//imgs
import hero1 from '../../assets/img/hero1.png';
import hero2 from '../../assets/img/hero2.png';
import hero3 from '../../assets/img/hero3.png';
import hero4 from '../../assets/img/hero4.png';
import hero5 from '../../assets/img/hero5.png';
import hero6 from '../../assets/img/hero6.png';
import hero7 from '../../assets/img/hero7.png';

export class Hero extends React.Component {
  render() {
    return (
      <div className="carousel-container">
        <div className="main-hero-content">
        <h1>Discover & Purchase art by top artists</h1>
        </div>
          <Carousel className="heros-container">
            <img src={hero1} alt=""/>
            <img src={hero2} alt=""/>
            <img src={hero3} alt=""/>
            <img src={hero4} alt=""/>
            <img src={hero5} alt=""/>
            <img src={hero6} alt=""/>
            <img src={hero7} alt=""/>
          </Carousel>
        </div>

    );
  }
}
