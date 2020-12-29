import React from 'react'
import Select from 'react-select'
import '../LandingPage/landing.css';
import PageNavbar from '../PageNavbar';
// import GenreButton from './GenreButton';
import DashboardRecipeRow from './DashboardRecipeRow';
import '../RestaurantPage/restDash.css';
import clear from '../../assets/clear.svg';

export default class Recipes extends React.Component {
    constructor(props) {
        super(props);

        // The state maintained by this React Component. This component maintains the list of genres,
        // and a list of movies for a specified genre.
        this.state = {
            recipes : [],
            tagOptions : [],
            searchTag: 'All',
            ingredientList: [],
            ingredientOptions: [],
            restaurantToggle: 'On',
            restState: true
        }

    this.updateRestaurantToggle = this.updateRestaurantToggle.bind(this)

    this.updateTagOptions = this.updateTagOptions.bind(this);

    this.updateIngredientOptions = this.updateIngredientOptions.bind(this);

    this.selectTag = this.selectTag.bind(this);

    this.selectIngredient = this.selectIngredient.bind(this);

    this.searchRecipes = this.searchRecipes.bind(this)

    this.filterRecipesTags = this.filterRecipesTags.bind(this)

    this.filterRecipesIngredients = this.filterRecipesIngredients.bind(this)

    }

    // React function that is called when the page load.
    componentDidMount()  {
        
                this.filterRecipesTags('All', 'On');
            
                this.updateTagOptions();

                this.updateIngredientOptions()
    }
    
    updateRestaurantToggle (){
      if (this.state.restaurantToggle==='On'){
          this.setState({
              restaurantToggle: 'Off',
              restState: false,
      })
      this.filterRecipesTags(this.state.searchTag, 'Off');
  }
      else {
          this.setState({
            restaurantToggle: 'On',
            restState: true,
      })
      this.filterRecipesTags(this.state.searchTag, 'On');
      }
      
  }

    filterRecipesIngredients(ingredientList, restaurantToggle)  {

        
      fetch("http://localhost:8081/filterRecipesIngredients/"+ ingredientList.toString() + '/' + restaurantToggle  ,{
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

    filterRecipesTags(tag, restaurantToggle)  {
        
        fetch("http://localhost:8081/filterRecipesTag/"+  tag + '/' + restaurantToggle ,{
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
        this.filterRecipesTags(tag, this.state.restaurantToggle );
        }
    
      selectIngredient=(e)=> {
        if (this.state.ingredientList.length < 3){
        let ingredient = e.value
        let ingredientList = [...this.state.ingredientList, ingredient]
        console.log(ingredientList.toString());
        this.setState({
          ingredientList
        });
        this.filterRecipesIngredients(ingredientList, this.state.restaurantToggle);
        }
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

updateIngredientOptions(){

  fetch("http://localhost:8081/getIngredientOptions", {
      method: 'GET' // The type of HTTP request.
  })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(ingredientList => {
          if (!ingredientList) {
              return;
          }

          let ingredientOptions = []

          for (var i = 0; i < ingredientList.length; i++) {
            ingredientOptions.push({
              label: ingredientList[i].name,
              value: ingredientList[i].name
              });
          }
          // Set the state of the genres list to the value returned by the HTTP response from the server.
          this.setState({
            ingredientOptions
          })
          

      })
}


    render() {
      var ingredArray = [];
          this.state.ingredientList.map(x=> {
            ingredArray.push(x)
          })
        return (

<div className="Dashboard">
  <PageNavbar active="recipes"/>
  <br></br>
  <div className="flex-container h1 text-white"> Recipes </div>
        <div className="flex-container pb-4"> 
          <div className="flex-container row restaurant-container">
              <div className="col-6 border-right">
                <div className="h4">Explore</div>
                <div className="tag-container">
                  <div className="h5"> Tag </div>
                  <Select
                      options={this.state.tagOptions}
                      onChange={this.selectTag}
                      placeholder= "Search tags..."
                      openMenuOnClick={true}
                  /> 
                </div>
                <div className="ingred-container mt-3">
                  <div className="h5 d-flex">Ingredients List: (Select up to 3)
                    <span className="selected-ingreds badge badge-info">
                      {ingredArray.toString()}
                    </span>
                    {ingredArray.length > 0 && <img onClick={()=>this.setState({
                            ingredientList:[]
                    })} className="clear-icon" src={clear}/>}
                  </div>
                  <Select
                      options={this.state.ingredientOptions}
                      onChange={this.selectIngredient}
                      placeholder= "Search ingredients..."
                      openMenuOnClick={true}
                  />
                </div>
                <div>
                  {/* <div class="custom-control custom-switch mt-2">
                    <input onChange={this.updateRestaurantToggle} value={this.state.restState} type="checkbox" class="custom-control-input" id="customSwitch1" />
                    <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
                  </div> */}
                  <button className='Toggle tog-btn btn btn-dark mt-3'  onClick={this.updateRestaurantToggle}>{this.state.restaurantToggle}</button>
                  <span className="ml-2">Recipes with restaurant info</span>
                </div>
              </div>
              <div className="col-6 m-auto">
                  <div className="search-section align-middle">
                      <div className="d-flex p-4">
                      <span className="h5 mr-3 mt-1">Search :</span>
                        <input
                          type="text"
                          placeholder="Enter Recipe Name"
                          value={this.state.recSearch}
                          onChange={this.searchRecipes}
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
                  </div>
                  <div className="results-container" id="results">
                    {this.state.recipes}
                  </div>
              </div>
            </div>
        </div>
        </div>
      </div>
        );
    }
}