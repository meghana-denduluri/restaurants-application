import React from 'react'
import '../LandingPage/landing.css';
import PageNavbar from '../PageNavbar';
import '../RestaurantPage/restDash.css';
import './recipe.css'
import Tags from '../../Components/Tags/Tags';
import Ingreds from '../../Components/Ingreds/Ingreds'
import Steps from '../../Components/Steps/Steps';
import Review from '../../Components/Review/Review'

export default class RecipeDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.getRecipeNameAndDescription = this.getRecipeNameAndDescription.bind(this);
        this.getRecipeTags = this.getRecipeTags.bind(this);
        this.getRecipeIngredients = this.getRecipeIngredients.bind(this);
        this.getRecipeSteps = this.getRecipeSteps.bind(this);
        this.getRecipeReviews = this.getRecipeReviews.bind(this);
        this.getRestaurantLinks = this.getRestaurantLinks.bind(this);
    }
    
    componentDidMount() {
        var recipeId = this.props.match.params.id;
        this.getRecipeNameAndDescription(recipeId);
        this.getRecipeTags(recipeId);
        this.getRecipeIngredients(recipeId);
        this.getRecipeSteps(recipeId);
        this.getRecipeReviews(recipeId);
        this.getRestaurantLinks(recipeId);
    }
    getRecipeNameAndDescription (val) {
        fetch("http://localhost:8081/recipeNameAndDescription/" + val, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(resp => {
                var rest = resp[0];
                this.setState({
                    name: rest.name,
                    description: rest.description
                });
            })
    }
    getRecipeTags (val) {
        fetch("http://localhost:8081/recipeTags/" + val, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(resp => {
            this.setState({
                tags: resp,
            });
        })
        
    }

    getRecipeIngredients (val) {
        fetch("http://localhost:8081/recipeIngredients/" + val, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(resp => {
            this.setState({
                ingreds: resp,
            });
        })
    }

    getRecipeSteps (val) {
        fetch("http://localhost:8081/recipeSteps/" + val, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(resp => {
            this.setState({
                steps: resp
            });
            console.log(this.state.steps)
        })
    }

    getRecipeReviews (val) {
        fetch("http://localhost:8081/recipeReviews/" + val, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(resp => {
            this.setState({
                reviews: resp
            });
        }) 
    }

    getRestaurantLinks (val) {
        fetch("http://localhost:8081/restaurantLinks/" + val, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(resp => {
            this.setState({
                links: resp
            });
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
                                {this.state.name}
                            </div>
                            <div className="tags-container">
                                {this.state.tags !== undefined && <Tags tags={this.state.tags}/>}
                                
                            </div>
                            <div className="description-container mt-4">
                                <div className="h4">Description</div>
                                {this.state.description}
                            </div>
                            <div className="steps-container mt-4">
                                <div className="h4">Steps</div>
                                {this.state.steps !== undefined && <Steps steps={this.state.steps}/>}
                            </div>
                        </div>
                        <div className="right-section col-2">
                            <div className="h3 mt-3">
                                Ingrediants
                            </div>
                            <div className="tags-container">
                                {this.state.ingreds !== undefined && <Ingreds ingreds={this.state.ingreds}/>}
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
                        <div className="mt-2">
                            {this.state.reviews !== undefined && <Review review={this.state.reviews}/>}
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