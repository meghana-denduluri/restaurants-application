import React from 'react'
import Select from 'react-select'
import '../LandingPage/landing.css';
import PageNavbar from '../PageNavbar';
// import GenreButton from './GenreButton';
import './restDash.css';
import DishWithRecipesRow from './DishWithRecipesRow';

export default class RestaurantDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {


        }
        // var restId = props.match.params.restaurantId;

        // The state maintained by this React Component. This component maintains the list of genres,
        // and a list of movies for a specified genre.


    }

    // React function that is called when the page load.
    componentDidMount() {

        var restId = this.props.match.params.id;
        console.log(restId);
        fetch("http://localhost:8081/restaurant/" + restId, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(restaurantsDetails => {


                var rest = restaurantsDetails[0];
                this.setState({
                    name: rest.name,
                    address: rest.address,
                    postalCode: rest.postal_code,
                    city: rest.city,
                    stars: rest.stars,
                    state: rest.state,
                    lat: rest.lat,
                    long: rest.long




                });
            })
            .then(x => {
                fetch("http://localhost:8081/disheswithrecipes/" + restId, {
                    method: 'GET' // The type of HTTP request.
                })
                    .then(res => res.json()) // Convert the response data to a JSON.
                    .then(dishList => {
                        if (!dishList) {
                            return;
                        }

                        let dishDivs = dishList.map((dishObj, i) =>
                            <DishWithRecipesRow
                                dishName={dishObj.dishName} />
                        );
                        // Set the state of the genres list to the value returned by the HTTP response from the server.
                        this.setState({
                            dishes: dishDivs

                        })
                    })
            })


    }




    render() {
        return (

            <div className="restaurant">
                <PageNavbar active="" />
                <div className="name">{this.state.name}</div>
                <div className="city">{this.state.city} ({this.state.state})</div>

                <div className="address">{this.state.address} ({this.state.postalCode})</div>
                <br />
                <div className="stars">Rating: {this.state.stars} stars</div>

                <br />

                <h2>Dishes:</h2>
                {this.state.dishes}
            </div>




        );
    }
}