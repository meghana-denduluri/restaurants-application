var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : "recipes.cffddarmshqp.us-east-1.rds.amazonaws.com",
  user     : "admin",
  password : "mmsaeats",
  port     : 3306,
  database : "master"
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// connection.end();

// config.connectionLimit = 10;
// var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */

/* ---- Q1a (Dashboard) ---- */
// write a query to get distinct genres in the database

function getAllRestaurants(req, res) {
  var query = `
    SELECT id, name, city, stars
    FROM Restaurants
    LIMIT 10
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getAllRecipes(req, res) {
  var query = `
    SELECT id, name, description
    FROM Recipes
    LIMIT 10
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
  getAllRestaurants,
  getAllRecipes
}