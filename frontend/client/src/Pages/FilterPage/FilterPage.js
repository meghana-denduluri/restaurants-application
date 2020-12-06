import React from 'react';
import './filter.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        // The state maintained by this React Component. This component maintains the list of genres,
        // and a list of movies for a specified genre.
        this.state = {
            category: [],
        }

        // this.showMovies = this.showMovies.bind(this);
    }

    componentDidMount() {
        // Send an HTTP request to the server.
        fetch("http://localhost:8081/genres", {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(genreList => {
                if (!genreList) return;
            })
            .catch(err => console.log(err))	// Print the error if there is one.
    }
    render() {
        return (
            <div className="">
                
            </div>
        );
    }
}