import React from 'react'
import Select from 'react-select'
import '../LandingPage/landing.css';
import PageNavbar from '../PageNavbar';
// import GenreButton from './GenreButton';
import DashboardRestaurantRow from './DashboardRestaurantRow';
import './restDash.css';

export default class Restaurants extends React.Component {
    constructor(props) {
        super(props);

        // The state maintained by this React Component. This component maintains the list of genres,
        // and a list of movies for a specified genre.
        this.state = {
            restaurants: [],
            cityOptions: [],
            tagOptions: [],
            searchCity: 'All',
            searchTag: 'All',
            dishToggle: 'On'
        }

        this.updateCityOptions = this.updateCityOptions.bind(this);
        this.updateTagOptions = this.updateTagOptions.bind(this);

        this.selectCity = this.selectCity.bind(this);
        this.selectTag = this.selectTag.bind(this);

        this.searchRestaurants = this.searchRestaurants.bind(this)

        this.filterRestaurants = this.filterRestaurants.bind(this)

        this.updateDishToggle = this.updateDishToggle.bind(this)

    }

    // React function that is called when the page load.
    componentDidMount() {

        this.filterRestaurants('All', 'All','On');

        this.updateCityOptions('All');
        this.updateTagOptions('All');

    }

    filterRestaurants(city, tag, toggle) {

        fetch("http://localhost:8081/filterRestaurants/" + city + "/" + tag + "/" + toggle, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(restaurantsList => {
                if (!restaurantsList) {
                    return;
                }
                // Map each genreObj in genreList to an HTML element:
                // A button which triggers the showMovies function for each genre.
                let restaurantDivs = restaurantsList.map((restObj, i) =>
                    <DashboardRestaurantRow
                        id={restObj.id}
                        key={restObj.id}
                        name={restObj.name}
                        city={restObj.city}
                        stars={restObj.stars} />
                );


                // Set the state of the genres list to the value returned by the HTTP response from the server.
                this.setState({
                    restaurants: restaurantDivs,
                })
            })
    }


    selectCity = (e) => {
        let city = e.value
        this.setState({
            searchCity: city
        });
        this.filterRestaurants(city, this.state.searchTag, this.state.dishToggle);
        this.updateTagOptions(city)

    }

    selectTag = (e) => {
        let tag = e.value
        this.setState({
            searchTag: tag
        });
        this.filterRestaurants(this.state.searchCity, tag, this.state.dishToggle);
        this.updateCityOptions(tag)
    }


    updateCityOptions(tag) {
        fetch("http://localhost:8081/getCityOptions/" + tag, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(citiesList => {
                if (!citiesList) {
                    return;
                }

                let cityOptions = [{
                    label: 'All',
                    value: 'All'
                }]

                for (var i = 0; i < citiesList.length; i++) {
                    cityOptions.push({
                        label: citiesList[i].city,
                        value: citiesList[i].city
                    });
                }
                // Set the state of the genres list to the value returned by the HTTP response from the server.
                this.setState({
                    cityOptions
                })

            })
    }

    searchRestaurants(e) {

        fetch("http://localhost:8081/searchRestaurants/" + e.target.value, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(restaurantsList => {
                if (!restaurantsList) {
                    return;
                }
                // Map each genreObj in genreList to an HTML element:
                // A button which triggers the showMovies function for each genre.
                let restaurantDivs = restaurantsList.map((restObj, i) =>
                    <DashboardRestaurantRow
                        id={restObj.id}
                        key={restObj.id}
                        name={restObj.name}
                        city={restObj.city}
                        stars={restObj.stars} />
                );


                // Set the state of the genres list to the value returned by the HTTP response from the server.
                this.setState({
                    restaurants: restaurantDivs,
                })
            })
    }


    updateTagOptions(city) {
        fetch("http://localhost:8081/getRestTagOptions/" + city, {
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(tagsList => {
                if (!tagsList) {
                    return;
                }

                let tagOptions = [{
                    label: 'All',
                    value: 'All'
                }]

                for (var i = 0; i < tagsList.length; i++) {
                    tagOptions.push({
                        label: tagsList[i].tag,
                        value: tagsList[i].tag
                    });
                }
                // Set the state of the genres list to the value returned by the HTTP response from the server.
                this.setState({
                    tagOptions
                })

            })
    }

    updateDishToggle (){
        if (this.state.dishToggle=='On'){
            this.setState({
                dishToggle: 'Off'
        })
        this.filterRestaurants(this.state.searchCity, this.state.searchTag, 'Off');
    }
        else {
            this.setState({
                dishToggle: 'On'
        })
        this.filterRestaurants(this.state.searchCity, this.state.searchTag, 'On')
        }
        
    }

    render() {
        return (

<div className="Dashboard">
<       PageNavbar active="restaurants" />

        <br></br>
        <div className="flex-container h1 text-white"> Restaurants </div>
        <br></br>

        <div className="flex-container">
            <div className="flex-container row restaurant-container">
                <div className="col-6 border-right">
                <div className="h4">Explore</div>
                    <div className="explore-section">
                        <div className="search_bar col-6">
                        <span><div>Restaurants with dish info</div> <button  onClick={this.updateDishToggle}>{this.state.dishToggle}</button></span> 
                            <div className=""> City </div>
                            <Select
                                options={this.state.cityOptions}
                                onChange={this.selectCity}
                                placeholder= "Search cities..."
                                openMenuOnClick={true}
                            />        
                        </div>
                        <div className="search_bar col-6 mt-4">
                            <div className=""> Tags </div>
                            <Select
                                options={this.state.tagOptions}
                                onChange={this.selectTag}
                                placeholder= "Search tags..."
                                openMenuOnClick={true}
                            />        
                        </div>  
                    </div>
                </div>
                <div className="col-6 m-auto">
                    <div className="search-section align-middle">
                        <div className="d-flex p-4">
                        <span className="h5 mr-3 mt-1">Search :</span>
                            <input
                            type="text"
                            placeholder="Enter Restaurant Name"
                            value={this.state.restSearch}
                            onChange={this.searchRestaurants}
                            id="movieName"
                            className="form-control w-50"
                        />
                        </div>
                    </div>
                </div>
            </div>
            <div className="restaurant-container mt-4">
                <div className="flex-container">
                    <div className="h4 row">Results</div>
                    <div className="movies-container">
                        <div className="movies-header">
                            <div className="header-lg">
                                <strong>Name</strong>
                            </div>
                            <div className="header">
                                <strong>City</strong>
                            </div>
                            <div className="header">
                                <strong>Stars</strong>
                            </div>
                        </div>
                        <div className="results-container" id="results">
                            {this.state.restaurants}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        );
    }
}