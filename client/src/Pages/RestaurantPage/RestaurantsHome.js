import React from 'react';
import '../LandingPage/landing.css';
import PageNavbar from '../PageNavbar';
// import GenreButton from './GenreButton';
import DashboardRestaurantRow from './DashboardRestaurantRow';

export default class Restaurants extends React.Component {
    constructor(props) {
        super(props);

        // The state maintained by this React Component. This component maintains the list of genres,
        // and a list of movies for a specified genre.
        this.state = {
            restaurants : []
        }
    

    }

    // React function that is called when the page load.
    componentDidMount()  {
        
        fetch("http://localhost:8081/restaurants" , {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(restaurantsList => {
                if (!restaurantsList) {
                    return;
                }
                // Map each genreObj in genreList to an HTML element:
                // A button which triggers the showMovies function for each genre.
                let restaurantDivs = restaurantsList.map((restObj, i) =>
                  <DashboardRestaurantRow
                    name={restObj.name}
                    city={restObj.city}
                    stars={restObj.stars}/>
                );
                // Set the state of the genres list to the value returned by the HTTP response from the server.
                this.setState({
                  restaurants: restaurantDivs

                })
            })
    }
        

    /* ---- Q1b (Dashboard) ---- */
    /* Set this.state.movies to a list of <DashboardMovieRow />'s. */




    render() {
        return (
            <div>
                <PageNavbar active="restaurants" />
                    {this.state.restaurants}

                </div>
        );
    }
}