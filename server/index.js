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

app.get('/recipes',routes.getRandRecipes);
app.get('/filterRestaurants/:city/:tag',routes.filterRestaurants);
app.get('/searchRestaurants/:term',routes.searchRestaurants);
app.get('/getCityOptions/:tag',routes.getCityOptions);
app.get('/getTagOptions/:city',routes.getTagOptions);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});