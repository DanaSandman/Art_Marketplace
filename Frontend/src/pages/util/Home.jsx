import React from 'react'
import { ArtApp } from '../art/ArtApp.jsx'
import { Link } from 'react-router-dom';
import { Hero } from '../../cmps/art/Hero.jsx'


export class Home extends React.Component {

    render() {
        return (
            <section>
                <div className="home-section">
                    <Hero/>
                  { /* <div className="hero-content">
                        <h2>New works</h2>
                        <h1>TAIR BITAN</h1>
                    </div>*/}
                </div>
               <ArtApp />
                <div className="btn">
               {/* <button><Link to={`/art`}> Shop All Art</Link></button>            */}
                </div>
                </section>
        )
    }
}
