import React from 'react'
import Select from 'react-select'
import '../LandingPage/landing.css';
import PageNavbar from '../PageNavbar';
// import GenreButton from './GenreButton';
import './restDash.css';
import DishWithRecipesRow from './DishWithRecipesRow';
import RestauratantReviewRow from './RestauratantReviewRow';
import Stars from "../../Components/Stars/Stars"

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
                    long: rest.long,
                    categories: rest.categories
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
                                dishName={dishObj.dishName}>{dishObj.recipes}</DishWithRecipesRow>
                        );
                        // Set the state of the genres list to the value returned by the HTTP response from the server.
                        this.setState({
                            dishes: dishDivs

                        })
                    })
            })
            .then(x => {
                fetch("http://localhost:8081/reviews/" + restId, {
                    method: 'GET' // The type of HTTP request.
                })
                    .then(res => res.json()) // Convert the response data to a JSON.
                    .then(reviewList => {
                        if (!reviewList) {
                            return;
                        }

                        let reviewDivs = reviewList.map((reviewObj, i) =>
                            <RestauratantReviewRow
                                rating={reviewObj.rating} text={reviewObj.text} />
                        );
                        // Set the state of the genres list to the value returned by the HTTP response from the server.
                        this.setState({
                            // dishes: dishDivs,
                            reviews: reviewDivs

                        })
                    })
            })


    }




    render() {
        const categoriesView = [];

        // for (const [index, value] of this.state.categories) {
        //     categoriesView.push(<li key={value}>{value}</li>)
        // }

        for (const i in this.state.categories) {
            const cat = this.state.categories[i]
            categoriesView.push(<span className="categories">{cat}</span>)
        }

        return (

            <div className="restaurant">
                <PageNavbar active="" />
                <div className="flex-container">
                    <div className="h3 mt-3 d-flex">
                        {this.state.name}
                        <div className="ml-3">
                            {this.state.stars !== undefined && <Stars stars={this.state.stars}/>}
                        </div>
                    </div>
                    <div className="cat-container">{categoriesView}</div>
                    <div className="address-container mt-2 font-italic">
                        <div>
                            {this.state.address} ({this.state.postalCode})
                        </div>
                        <div>
                            {this.state.city} ({this.state.state})
                        </div>
                    </div>
                    <div className="dishes-container">
                        {this.state.dishes && this.state.dishes.length > 0 ?
                            <div>
                                <h4 className="mt-4">Dishes served here:</h4>
                                {this.state.dishes}
                            </div> :
                            <div>This restaurant has no dishes :(</div>
                        }
                        <br />
                        {this.state.reviews && this.state.reviews.length > 0 ?
                            <div>
                                <h2>Reviews:</h2>
                                {this.state.reviews}
                            </div> :
                            <div>This restaurant has no reviews yet</div>
                        }
                    </div>
                </div>

            </div>




        );
    }
}