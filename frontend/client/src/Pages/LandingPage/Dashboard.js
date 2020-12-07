import React from 'react';
import './landing.css';
import myImg from '../../assets/food.jpg';
import PageNavbar from '../PageNavbar';
// import GenreButton from './GenreButton';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        // The state maintained by this React Component. This component maintains the list of genres,
        // and a list of movies for a specified genre.
        this.state = {
        }
    }

    // React function that is called when the page load.
    componentDidMount() {
        
    }

    onDiscoverClick() {
        var elmnt = document.getElementById("second-section");
        elmnt.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    }


    render() {
        return (
            <div className="landing-page">
                <PageNavbar active="dashboard" />
                <section className="flex-container first-section d-flex">
                    <div className="content">
                        <p className="large-text">
                            Discover the chef in you! One stop place for all your food cravings. 
                        </p>
                        <div className="d-flex justify-center buttons-container">
                            <div onClick={this.onDiscoverClick} className="button online-btn">
                                Discover More...
                            </div>
                        </div>
                    </div>
                    <div className="landing-image">
                        <div className="cirlce-container">
                            <img className="image" src={myImg} alt="container" />
                        </div>
                    </div>
                </section>
                <h3 className="text-center mt-5">Products</h3>
                <section className="flex-container second-section d-flex justify-center" id="second-section">
                    <div className="d-flex land-prods">
                        <a href={"/restaurants"} className="box vegan">
                            Restaurants
                        </a>
                        <a href={"/recipes"} className="box vegetarian">
                            Recipes
                        </a>
                    </div>
                </section>

            </div>
        );
    }
}