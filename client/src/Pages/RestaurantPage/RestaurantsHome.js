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
            restaurants : [],
            cityOptions : [],
            tagOptions : [],
            searchCity: 'All',
            searchTag: 'All',
        }

    this.updateCityOptions = this.updateCityOptions.bind(this);
    this.updateTagOptions = this.updateTagOptions.bind(this);

    this.selectCity = this.selectCity.bind(this);
    this.selectTag = this.selectTag.bind(this);

    this.searchRestaurants = this.searchRestaurants.bind(this)

    this.filterRestaurants = this.filterRestaurants.bind(this)

    }

    // React function that is called when the page load.
    componentDidMount()  {
        
                this.filterRestaurants('All','All');
                
                this.updateCityOptions('All');
                this.updateTagOptions('All');
            
    }
    
    filterRestaurants(city,tag)  {
        
        fetch("http://localhost:8081/filterRestaurants/"+city+"/"+  tag ,{
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
                  stars={restObj.stars}/>
                );


                // Set the state of the genres list to the value returned by the HTTP response from the server.
                this.setState({
                  restaurants: restaurantDivs,
                })
            })
    }

    
    selectCity=(e)=> {
    let city = e.value
    this.setState({
        searchCity: city
    });
    this.filterRestaurants(city,this.state.searchTag);
    this.updateTagOptions(city)
    
    }

    selectTag=(e)=> {
        let tag = e.value
        this.setState({
            searchTag: tag
        });
        this.filterRestaurants(this.state.searchCity,tag);
        this.updateCityOptions(tag)
        }


updateCityOptions(tag){
    fetch("http://localhost:8081/getCityOptions/"+tag, {
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
        
    fetch("http://localhost:8081/searchRestaurants/"+e.target.value ,{
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
                stars={restObj.stars}/>
            );


            // Set the state of the genres list to the value returned by the HTTP response from the server.
            this.setState({
              restaurants: restaurantDivs,
            })
        })
}


updateTagOptions(city){
    fetch("http://localhost:8081/getTagOptions/"+city, {
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


    render() {
        return (

<div className="Dashboard">
<       PageNavbar active="restaurants" />

        <br></br>
        <div className="h1" style={{color: 'white'}}> Restaurants </div>
        <br></br>
        
        <div className="container movies-container">
        <div className="columns">
          <div className="jumbotron">
            <div className="h3">Explore</div>
            <div className="search-container">
            
<br></br>
            <div className="search_bar">
            <div className="h5"> City </div>
                <Select
                    options={this.state.cityOptions}
                    onChange={this.selectCity}
                    placeholder= "Search cities..."
                    openMenuOnClick={true}
                />        </div>
<br></br>

                <div className="search_bar">
                <div className="h5"> Tag </div>
                <Select
                    options={this.state.tagOptions}
                    onChange={this.selectTag}
                    placeholder= "Search tags..."
                    openMenuOnClick={true}
                />        </div>
               <br></br> 

            </div>
          </div>






            


            <div className="jumbotron">
            <div className="h3">Search</div>
            <div className="search-container">
            
<br></br>


<input
                type="text"
                placeholder="Enter Restaurant Name"
                value={this.state.restSearch}
                onChange={this.searchRestaurants}
                id="movieName"
                className="movie-input"
              />


            </div>
          </div>
          </div>






        









          <br></br>
          <div className="jumbotron">
          <div className="h3">Results</div>
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
        );
    }
}