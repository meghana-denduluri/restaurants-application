import React from 'react'
import '../LandingPage/landing.css';
import PageNavbar from '../PageNavbar';
import '../RestaurantPage/restDash.css';
import './recipe.css'
import Tags from '../../Components/Tags/Tags';
import Ingreds from '../../Components/Ingreds/Ingreds'
import Steps from '../../Components/Steps/Steps'

export default class RecipeDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    componentDidMount() {

        var restId = this.props.match.params.id;
        console.log(restId);
        fetch("http://localhost:8081/restaurant/" + restId, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(restaurantsDetails => {


                var rest = restaurantsDetails[0];
                // this.setState({
                //     name: rest.name,
                //     address: rest.address,
                //     postalCode: rest.postal_code,
                //     city: rest.city,
                //     stars: rest.stars,
                //     state: rest.state,
                //     lat: rest.lat,
                //     long: rest.long




                // });
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

                        // let dishDivs = dishList.map((dishObj, i) =>
                        //     <DishWithRecipesRow
                        //         dishName={dishObj.dishName} />
                        // );
                        // Set the state of the genres list to the value returned by the HTTP response from the server.
                        // this.setState({
                        //     dishes: dishDivs

                        // })
                    })
            })


    }




    render() {
        return (
            <div className="recipe">
                <PageNavbar active="" />
                <div className="flex-container">
                    <div className="row">
                        <div className="left-section col-10 border-right">
                            <div className="h3 mt-3">
                                Beef Stack
                            </div>
                            <div className="tags-container">
                                <Tags tags={'comma, separated, values, separated, values, separated, values'}/>
                            </div>
                            <div className="description-container mt-4">
                                <div className="h4">Description</div>
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.The point of using Lorem Ipsum is that it has a more - or - less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                                default model text, and a search
                                for 'lorem ipsum'
                                will uncover many web sites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose(injected humour and the like).
                            </div>
                            <div className="steps-container mt-4">
                                <div className="h4">Steps</div>
                                <Steps steps={'1: laeufneaoiafeaefafwevwev efwef wegwefw wegfwefw wegwefq3wec wewfqewfq wefqewcwqegetgr efrqefwqecf, 2: awfawfaefae'} />
                            </div>
                        </div>
                        <div className="right-section col-2">
                            <div className="h3 mt-3">
                                Ingrediants
                            </div>
                            <div className="tags-container">
                                <Ingreds ingreds={'comma, separated, values, separated, values, separated, values'}/>
                            </div>
                            <div className="h3 mt-5">
                                Restaurants that serve this dish...
                            </div>
                        </div>
                    </div>                  
                    <div className="reviews-section">
                        <div className="h3 mt-3">
                            Reviews
                        </div>
                    </div>
                </div>
                {/* <div className="name">{this.state.name}</div>
                <div className="city">{this.state.city} ({this.state.state})</div>

                <div className="address">{this.state.address} ({this.state.postalCode})</div>
                <br />
                <div className="stars">Rating: {this.state.stars} stars</div>

                <br />

                <h2>Dishes:</h2>
                {this.state.dishes} */}
            </div>
        );
    }
}