import React from 'react';
import '../LandingPage/landing.css';
// import PageNavbar from './PageNavbar';
// import GenreButton from './GenreButton';
import DashboardRecipeRow from './DashboardRecipeRow';

export default class Recipes extends React.Component {
    constructor(props) {
        super(props);

        // The state maintained by this React Component. This component maintains the list of genres,
        // and a list of movies for a specified genre.
        this.state = {
            recipes : []
        }

    }

    // React function that is called when the page load.
    componentDidMount()  {
        
        fetch("http://localhost:8081/recipes" , {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(recipeList => {
                if (!recipeList) {
                    return;
                }
                // Map each genreObj in genreList to an HTML element:
                // A button which triggers the showMovies function for each genre.
                let recipeDivs = recipeList.map((restObj, i) =>
                  <DashboardRecipeRow
                    name={restObj.name}
                    descr={restObj.description}/>
                );
                // Set the state of the genres list to the value returned by the HTTP response from the server.
                this.setState({
                  recipes: recipeDivs

                })
            })
    }
        

    /* ---- Q1b (Dashboard) ---- */
    /* Set this.state.movies to a list of <DashboardMovieRow />'s. */




    render() {
        return (

                    <div>
                    {this.state.recipes}

                    </div>

            
        );
    }
}