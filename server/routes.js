var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "recipes.cffddarmshqp.us-east-1.rds.amazonaws.com",
  user: "guest",
  password: "guesteats",
  port: 3306,
  database: "master"
});

connection.connect(function (err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// connection.end();

// config.connectionLimit = 10;


function filterRestaurants(req, res) {
  let city = req.params.city;
  let tag = req.params.tag;
  let toggle = req.params.toggle;
  if (city != 'All' && tag != 'All') {

    var query = `
  SELECT Restaurants.id, name, city, stars
  FROM Restaurants
  JOIN RestaurantCategories ON Restaurants.id=RestaurantCategories.id
  WHERE Restaurants.city = '${city}'
  and RestaurantCategories.categories= '${tag}' 
  `;
  } else if (city != 'All' && tag == 'All') {
    var query = `
    SELECT Restaurants.id, name, city, stars
    FROM Restaurants
    WHERE Restaurants.city = '${city}'
    `;
  } else if (tag != 'All' && city == 'All') {
    var query = `
  SELECT Restaurants.id, name, city, stars
  FROM Restaurants
  JOIN RestaurantCategories ON Restaurants.id=RestaurantCategories.id
  WHERE RestaurantCategories.categories= '${tag}' 
  `;
  }
  else {
    var query = `
    SELECT Restaurants.id, name, city, stars
    FROM Restaurants
    WHERE True
    `;
  }
  if (toggle == 'On'){
    query += ' and Restaurants.id in (select restaurantID from ServedAt)'
  }
  query += ' order by stars desc, RAND () limit 20;'
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};
function getCityOptions(req, res) {

  let tag = req.params.tag;
  if (tag == 'All') {
    var query = `
    SELECT distinct Restaurants.city
    FROM Restaurants
    order by Restaurants.city;
    `;
  }
  else {
    var query = `
      SELECT distinct Restaurants.city
      FROM Restaurants
      JOIN RestaurantCategories ON Restaurants.id=RestaurantCategories.id
      WHERE RestaurantCategories.categories= '${tag}' 
      order by Restaurants.city;
      `;
  }

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};
function getRestTagOptions(req, res) {
  let city = req.params.city;

  if (city == 'All') {
    var query = `
  SELECT distinct RestaurantCategories.categories as tag
  FROM RestaurantCategories
  order by RestaurantCategories.categories;
  `;
  }
  else {
    var query = `
    SELECT distinct RestaurantCategories.categories as tag
    FROM Restaurants
    JOIN RestaurantCategories ON Restaurants.id=RestaurantCategories.id
    WHERE Restaurants.city= '${city}' 
    order by RestaurantCategories.categories;
    `;
  }
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function searchRestaurants(req, res) {
  let term = req.params.term;

  var query = `
  SELECT id, name, city, stars
  FROM Restaurants
  WHERE Restaurants.name LIKE '${term}%'
  order by Restaurants.name
  limit 20;
  `;


  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function searchRecipes(req, res) {
  let term = req.params.term;

  var query = `
  SELECT id, name, description
  FROM Recipes
  WHERE name LIKE '${term}%'
  order by name
  limit 20;
  `;


  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


function filterRecipes(req, res) {
  let tag = req.params.tag;
  let toggle = req.params.toggle;
  if (tag == 'All') {

    var query = `
    SELECT id, name, description
    FROM Recipes
    where true
  `;
  }
  else {
    var query = `
    SELECT id, name, description
    FROM Recipes
    NATURAL JOIN RecipeTags
    where tag = '${tag}'
  `;
  }

  if (toggle=='On'){
    query += ' and id in (select recipeID from RecipeOf)' 
  }

  query += ' order by RAND () limit 20;' 
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRecTagOptions(req, res) {

  var query = `
    SELECT distinct tag
    FROM RecipeTags
    order by tag;
    `;
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// restaurant profile page routes

function getRestaurant(req, res) {

  let restId = req.params.restId;

  var query = `
    SELECT name, address, postal_code, city, stars, state, latitude, longitude
    FROM Restaurants
    WHERE id = '${restId}';
    `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

}

function getDishesOfRestaurant(req, res) {

  let restId = req.params.restId;

  var query = `
    WITH t AS (
      SELECT s.dishID
      FROM Restaurants r JOIN ServedAt s ON r.id = s.restaurantID
      WHERE r.id = '${restId}'
    )
    SELECT d.id, d.name
    FROM t JOIN Dishes d ON t.dishId = d.id;
    `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

}

function getRecipesOfDish(req, res) {

  let dishId = req.params.dishId;

  var query = `
    SELECT r.name
    FROM Recipes r JOIN RecipeOf o ON r.id = o.recipeID
    WHERE o.dishID = '${dishId}';
    `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

}

// recipe profile page routes

function getRecipeNameAndDescription(req, res) {

  let recipeId = req.params.recipeId;

  var query = `
    SELECT name, description
    FROM Recipes r
    WHERE r.id = '${recipeId}';
    `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

}

function getRecipeTags(req, res) {

  let recipeId = req.params.recipeId;

  var query = `
    SELECT t.tag
    FROM Recipes r JOIN RecipeTags t ON r.id = t.id
    WHERE r.id = '${recipeId}';
    `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

}

function getRecipeIngredients(req, res) {

  let recipeId = req.params.recipeId;

  var query = `
    SELECT i.name
    FROM InRecipe r JOIN Ingredients i ON r.ingredientsID = i.id
    WHERE r.recipeID = '${recipeId}';
    `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

}

function getRecipeSteps(req, res) {

  let recipeId = req.params.recipeId;

  var query = `
    SELECT stepNum, instruction
    FROM Steps
    WHERE recipeID = '${recipeId}';
    `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

}

function getRecipeReviews(req, res) {

  let recipeId = req.params.recipeId;

  var query = `
    SELECT rating, text
    FROM Reviews
    WHERE recipeID = '${recipeId}';
    `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

}

function getRestaurantLinks(req, res) {

  let recipeId = req.params.recipeId;

  var query = `
    SELECT DISTINCT s.restaurantID, res.name
    FROM RecipeOf r JOIN ServedAt s ON r.dishID = s.dishID
    INNER JOIN Restaurants res on res.id = s.restaurantID
    WHERE r.recipeID = '${recipeId}'
    ORDER BY res.stars DESC, RAND ()
    LIMIT 10;
    `;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

}

function getRestaurantDetails(req, res) {
  let restId = req.params.id;


  var query = `
  SELECT *
  FROM Restaurants
  WHERE id = '${restId}'
  `;


  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      var restaurants = [];
      for (var idx = 0; idx < rows.length; idx++) {
        row = rows[idx];
        restaurants.push({
          id: row['id'], name: row['name'], address: row['address'], city: row['city'],
          state: row['state'], postal_coe: row['postal_code'], latitude: row['latitude'],
          longitude: row['longitude'], stars: row['stars']
        });
      }
      var categoriesQuery = `SELECT categories FROM RestaurantCategories rc
        WHERE id = '${restId}'`;


      connection.query(categoriesQuery, function (err, rows, fields) {
        if (err) { console.log(err); }
        else {

          for (var idx = 0; idx < restaurants.length; idx++) {

            console.log(">>>> " + rows.length);
            var categories = [];
            for (var j = 0; j < rows.length; j++) {
              categories.push(rows[j].categories);
            }
            restaurants[idx].categories = categories;
          }

          res.json(restaurants);

        }
      });


    }
  });
}

function getDishesWithRecipes(req, res) {
  let restId = req.params.restid;

  var query = `select d.name dishName, d.id dishId from Restaurants r
  join ServedAt sa on r.id = sa.restaurantID 
  join Dishes d on d.id = sa.dishID 
  where r.id = '${restId}'	`;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      var dishes = [];
      var dishIds = [];

      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log(row);
        dishIds.push(row["dishId"]);
        dishes.push({ dishId: row['dishId'], dishName: row['dishName'] });
      }

      var dishidsstr = dishIds.join(',');
      var query2 = `select d.id dishId, r.id recipeId, r.name recipeName, r.description recipeDescription from Dishes d
      join RecipeOf ro on ro.dishID = d.id 
      join Recipes r on r.id  = ro.recipeID 
      where d.id in (${dishidsstr})`;

      connection.query(query2, function (err, rows, fields) {

        for (var idx = 0; idx < dishes.length; idx++) {
          var recipesForDish = rows.filter(r => r['dishId'] == dishes[idx].dishId);
          dishes[idx].recipes = recipesForDish;
        }

        res.json(dishes);
      });


    }
  });
}


function getIngredientOptions(req, res) {
  var query = `select i.name from 
  Ingredients i join InRecipe r on r.ingredientsID=i.id
  group by i.name
  order by count(recipeID) desc
  limit 1000`;

  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

function filterRecipesIngredients(req, res) {
  
  let ingredientsList = req.params.ingredients;
  let ingredientsArray = ingredientsList.split(',');
  console.log(ingredientsArray);
  let ingredients = '(';
  for (let i = 0; i < ingredientsArray.length; i++) {
    if (i == ingredientsArray.length - 1) {
      ingredients = ingredients.concat("'", ingredientsArray[i], "')");
    } else {
      ingredients = ingredients.concat("'", ingredientsArray[i], "', ");
    }

  }
  
  console.log(ingredients);

  var query = `
    WITH ids AS (
      SELECT r.id
      FROM Recipes r 
      JOIN InRecipe i ON i.recipeID = r.id
      JOIN Ingredients n ON i.ingredientsID = n.id
      WHERE n.name in ${ingredients}
      GROUP BY r.id
      HAVING COUNT(n.id) = ${ingredientsArray.length}
    )
    SELECT *
    FROM Recipes NATURAL JOIN ids
    WHERE True
    `;
    
    if (toggle=='On'){
      query += ' and id in (select recipeID from RecipeOf)' 
    }

    query += ' order by RAND () limit 20;' 

    connection.query(query, function (err, rows, fields) {
      if (err) console.log(err);
      else {
        res.json(rows);
      }
    });
    
  }

  function getReviewsOfRestaurant(req, res) {
    let restId = req.params.restid;
  
    var query = `
      SELECT rating, text FROM Reviews
      WHERE RestaurantID = '${restId}'
      `;
  
    connection.query(query, function (err, rows, fields) {
      if (err) console.log(err);
      else {
        res.json(rows);
      }
    });
  
  }


// The exported functions, which can be accessed in index.js.
module.exports = {
  filterRestaurants,
  getCityOptions,
  getRestTagOptions,
  searchRestaurants,
  filterRecipes,
  searchRecipes,
  getRecTagOptions,
  getRestaurant,
  getDishesOfRestaurant,
  getRecipesOfDish,
  getRecipeNameAndDescription,
  getRecipeTags,
  getRecipeIngredients,
  getRecipeSteps,
  getRecipeReviews,
  getRestaurantLinks,
  getRestaurantDetails,
  getDishesWithRecipes,
  getIngredientOptions,
  filterRecipesIngredients,
  getReviewsOfRestaurant
}
