import React from 'react';
import './landing.css';
import myImg from '../../assets/food.jpg';
// import PageNavbar from './PageNavbar';
// import GenreButton from './GenreButton';
// import DashboardMovieRow from './DashboardMovieRow';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        // The state maintained by this React Component. This component maintains the list of genres,
        // and a list of movies for a specified genre.
        this.state = {
            genres: [],
            movies: []
        }

        this.showMovies = this.showMovies.bind(this);
    }

    // React function that is called when the page load.
    componentDidMount() {
        // Send an HTTP request to the server.
        fetch("http://localhost:8081/genres", {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(genreList => {
                if (!genreList) return;
                // Map each genreObj in genreList to an HTML element:
                // A button which triggers the showMovies function for each genre.
                // let genreDivs = genreList.map((genreObj, i) =>
                //   <GenreButton id={"button-" + genreObj.genre} onClick={() => this.showMovies(genreObj.genre)} genre={genreObj.genre} />
                // );
                // Set the state of the genres list to the value returned by the HTTP response from the server.
                // this.setState({
                //   genres: genreDivs

                // })
                // console.log(" \n  check : " + (this.state.genres))
            })
            .catch(err => console.log(err))	// Print the error if there is one.
    }




    /* ---- Q1b (Dashboard) ---- */
    /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
    showMovies(genre) {
        // Send an HTTP request to the server.
        fetch("http://localhost:8081/genres/" + genre, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(movieList => {
                // if (!movieList) return;
                // // Map each genreObj in genreList to an HTML element:
                // // A button which triggers the showMovies function for each genre.
                // let movieDivs = movieList.map((movObj, i) =>
                //   <DashboardMovieRow
                //     id={"title-" + movObj.title}
                //     title={movObj.title}
                //     vote_count={movObj.vote_count}
                //     rating={movObj.rating} />
                // );
                // // Set the state of the genres list to the value returned by the HTTP response from the server.
                // this.setState({
                //   movies: movieDivs

                // })
                // console.log(movieList);
            })


    }
    onDiscoverClick() {
        var elmnt = document.getElementById("second-section");
        elmnt.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    }

    render() {
        return (
            <div className="landing-page">
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
                        <div className="box vegan">Restaurants</div>
                        <div className="box vegetarian">Recipes</div>
                    </div>
                </section>
            </div>
        );
    }
}