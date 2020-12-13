import React from 'react'
import Select from 'react-select'
import '../LandingPage/landing.css';
import PageNavbar from '../PageNavbar';
// import GenreButton from './GenreButton';
import DashboardRecipeRow from './DashboardRecipeRow';
import '../RestaurantPage/restDash.css';

export default class Recipes extends React.Component {
    constructor(props) {
        super(props);

        // The state maintained by this React Component. This component maintains the list of genres,
        // and a list of movies for a specified genre.
        this.state = {
            recipes : [],
            tagOptions : [],
            searchTag: 'All',
        }

    this.updateTagOptions = this.updateTagOptions.bind(this);

    this.selectTag = this.selectTag.bind(this);

    this.searchRecipes = this.searchRecipes.bind(this)

    this.filterRecipes = this.filterRecipes.bind(this)

    }

    // React function that is called when the page load.
    componentDidMount()  {
        
                this.filterRecipes('All');
            
                this.updateTagOptions('All');
            
    }
    
    filterRecipes(tag)  {
        
        fetch("http://localhost:8081/filterRecipes/"+  tag ,{
            method: 'GET' // The type of HTTP request.
        })
            .then(res => res.json()) // Convert the response data to a JSON.
            .then(recipesList => {
                if (!recipesList) {
                    return;
                }
                // Map each genreObj in genreList to an HTML element:
                // A button which triggers the showMovies function for each genre.
                let recipes = recipesList.map((restObj, i) =>
                <DashboardRecipeRow
                id={restObj.id}
                  key={restObj.id}
                  name={restObj.name}
                  descr={restObj.description}/>
                );


                // Set the state of the genres list to the value returned by the HTTP response from the server.
                this.setState({
                  recipes
                })
            })
    }

    

    selectTag=(e)=> {
        let tag = e.value
        this.setState({
            searchTag: tag
        });
        this.filterRecipes(tag);
        }



searchRecipes(e) {
        
    fetch("http://localhost:8081/searchRecipes/"+e.target.value ,{
        method: 'GET' // The type of HTTP request.
    })
        .then(res => res.json()) // Convert the response data to a JSON.
        .then(recipesList => {
            if (!recipesList) {
                return;
            }
            // Map each genreObj in genreList to an HTML element:
            // A button which triggers the showMovies function for each genre.
            let recipes = recipesList.map((restObj, i) =>
            <DashboardRecipeRow
            id={restObj.id}
              key={restObj.id}
              name={restObj.name}
              descr={restObj.description}/>
            );


            // Set the state of the genres list to the value returned by the HTTP response from the server.
            this.setState({
              recipes
            })
        })
}


updateTagOptions(){
    fetch("http://localhost:8081/getRecTagOptions", {
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
<       PageNavbar active="recipes" />

        <br></br>
        <div className="h1" style={{color: 'white'}}> Recipes </div>
        <br></br>
        
        <div className="container movies-container">
        <div className="columns">
          <div className="jumbotron">
            <div className="h3">Explore</div>
            <div className="search-container">
            
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
                placeholder="Enter Recipe Name"
                value={this.state.recSearch}
                onChange={this.searchRecipes}
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
              </div>
              <div className="results-container" id="results">
                {this.state.recipes}
              </div>
            </div>
          </div>
        </div>
      </div>
        );
    }
}