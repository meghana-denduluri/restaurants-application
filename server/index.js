const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */


/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.

//Shreyas: route to add.

// app.get('/filterRecipesIngredients/:ingredientList', routes.filterRecipesIngredients);
//Get (id,name,description) of recipes that contain ALL of the listed ingredients (use query 6 from report).
//ingredientList is given as a string in the form: ingr1,ingr2,ingr3 of length 0-3


//Recipe dashboard routes
app.get('/getIngredientOptions', routes.getIngredientOptions);
app.get('/filterRecipesTag/:tag', routes.filterRecipes);
app.get('/searchRecipes/:term', routes.searchRecipes);
app.get('/getRecTagOptions', routes.getRecTagOptions);

//Restaurant dashboard routes
app.get('/filterRestaurants/:city/:tag', routes.filterRestaurants);
app.get('/searchRestaurants/:term', routes.searchRestaurants);
app.get('/getCityOptions/:tag', routes.getCityOptions);
app.get('/getRestTagOptions/:city', routes.getRestTagOptions);

// restaurant profile page routes
app.get('/restaurant/:id', routes.getRestaurantDetails);
app.get('/dishesOfRestaurant/:restId', routes.getDishesOfRestaurant);
app.get('/disheswithrecipes/:restid', routes.getDishesWithRecipes)
app.get('/recipesOfDish/:dishId', routes.getRecipesOfDish);

// recipe profile page routes
app.get('/recipeNameAndDescription/:recipeId', routes.getRecipeNameAndDescription);
app.get('/recipeTags/:recipeId', routes.getRecipeTags);
app.get('/recipeIngredients/:recipeId', routes.getRecipeIngredients);
app.get('/recipeSteps/:recipeId', routes.getRecipeSteps);
app.get('/recipeReviews/:recipeId', routes.getRecipeReviews);
app.get('/restaurantLinks/:recipeId', routes.getRestaurantLinks);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});