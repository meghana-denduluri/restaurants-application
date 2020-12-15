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

//Shreyas: routes to add.
// app.get('/getIngredientOptions', routes.getIngredientOptions);
//Get schema (name) where name is the name of ingredients. Get the 2000 most popular in decreasing order.

// app.get('/filterRecipesIngredientsAny/:ingredientList', routes.filterRecipesIngredientsAny);
//Get (id,name,description) of recipes that contain ANY of the listed ingredients (use query 5 from report).

// app.get('/filterRecipesIngredientsAll/:ingredientList', routes.filterRecipesIngredientsAll);
//Get (id,name,description) of recipes that contain ALL of the listed ingredients (use query 6 from report).


app.get('/filterRecipesTag/:tag', routes.filterRecipes);
app.get('/searchRecipes/:term', routes.searchRecipes);
app.get('/getRecTagOptions', routes.getRecTagOptions);


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