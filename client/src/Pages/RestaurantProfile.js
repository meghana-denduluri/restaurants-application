import React from 'react'
import './LandingPage/landing.css';
import PageNavbar from './PageNavbar';

export default class RestaurantProfile extends React.Component {
    constructor(props) {
        super(props);
        

        //Inherit the restuarant id from which it will populate the page
        this.state = {
            restaurantId: this.props.match.params.restaurantId
        }


    }

    // React function that is called when the page load.
    componentDidMount () {
      }
    
    

    render() {
        return (

<div className="Dashboard">
<  PageNavbar />
<div className="h1" style={{color: 'white'}}>{this.state.restaurantId}</div>
        
          
      </div>
        );
    }
}