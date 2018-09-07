import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import news1 from '../img/news1.jpg'
import news2 from '../img/News2.jpg'
import news3 from '../img/news3.jpg'
import news4 from '../img/news4.jpg'
// eslint-disable-next-line
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import './About.css'

class MyCarousel extends Component {
    render() {
        return (
            <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} showArrows={true}>
                <div>
                    <img src={news3} className="slider-image" alt="slide1" />
                    <p className="legend text">News without distractions at the tip of your fingers</p>
                </div>
                <div>
                    <img src={news4} className="slider-image" alt="slide2" />
                    <p className="legend text">News covered from all angles</p>
                </div>
                <div>
                    <img src={news2} className="slider-image" alt="slide3" />
                    <p className="legend text">Personalized easy experience</p>
                </div>
                <div>
                    <img src={news1} className="slider-image" alt="slide4" />
                    <p className="legend text">Easy sharing and viewing news linked to a topic</p>
                </div>
            </Carousel>


        );
    }
};

export default MyCarousel;
