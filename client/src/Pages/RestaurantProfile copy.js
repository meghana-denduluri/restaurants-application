import React from 'react'
import Select from 'react-select'
import '../LandingPage/landing.css';
import PageNavbar from '../PageNavbar';
// import GenreButton from './GenreButton';
import DashboardRestaurantRow from './DashboardRestaurantRow';
import './restDash.css';

export default class RestaurantProfile extends React.Component {
    constructor(props) {
        super(props);

        //Inherit the restuarant id from which it will populate the page
        this.state = {
            restaurantId : this.props.id
        }


    }

    // React function that is called when the page load.
    componentDidMount()  {
        
            
    }
    
    

    render() {
        return (

<div className="Dashboard">
<       PageNavbar />

        
          
      </div>
        );
    }
}