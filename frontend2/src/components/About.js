import React, { Component } from 'react';
import './About.css'
import MyCarousel from './MyCarousel'
import who from '../img/who.jpg'
import why from '../img/why.jpg'
import logo from '../img/logo.jpg'

class About extends Component {
    render() {
        return (
            <div className="About">

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container w-100">
                        <a className="navbar-brand" href="">
                            <img src={logo} width="30" height="30" className="d-inline-block align-center" alt="" />
                            News Net</a>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/home">My App</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/signup">Sign Up</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <MyCarousel />

                <br />


                <main role="main" className="container">
                    <div className="container">
                        <div className="page-header row" id="intro">
                            <h1>Who We Are</h1>
                            <p>
                                <img src={who} alt="who" className="img-thumbnail" style={{ marginLeft: "20px", align: "right" }} /> We are a group of people who care about spreading legit news! We created this platform with the hope
                                that people can have an inclusive portal where news is not just personalized, but also automatically
                                linked to their interests, and covered from all angles. News is spread by the people and for the people,
                    unaffected by social media campaigns. </p>
                        </div>
                        <div className="page-header row" id="why">
                            <h1>Why News Angles</h1>
                            <p>
                                <img src={why} alt="why" className="img-thumbnail" style={{ marginRight: "20px", align: "left" }} /> With News Angles, you don't have to open multiple news portals to validate news. News Angles helps you
                                view news that matters to you the most, follow and share it! Easily find and follow topics on your specific
                                interests across all news channels! Save your time and avoid the social media political campaigns and
                    distractions! Get attention! Share in spreading news! See beyond what is advertised as the complete truth!</p>
                        </div>
                    </div>
                    <br />
                </main>

            </div>
        )
    }
}

export default About