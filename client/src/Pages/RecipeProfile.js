import React from 'react'
import './LandingPage/landing.css';
import PageNavbar from './PageNavbar';

export default class RecipeProfile extends React.Component {
    constructor(props) {
        super(props);
    
        //Inherit the recipe id from which it will populate the page
        this.state = {
            recipeId: this.props.match.params.recipeId
        }


    }

    // React function that is called when the page load.
    componentDidMount()  {
        
            
    }
    
    

    render() {
        return (

<div className="Dashboard">
<       PageNavbar />
<div className="h1" style={{color: 'white'}}>{this.state.recipeId}</div>

          
      </div>
        );
    }
}