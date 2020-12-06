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
function getAllGenres(req, res) {
	var query = `
    SELECT DISTINCT name
    FROM Dishes
    LIMIT 10
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

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



/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  var gen = req.params.genre;
  var query = `
  SELECT *
  FROM movies m ,genres g
  where m.id = g.movie_id AND g.genre ='${gen}'
  order by rating DESC,vote_count DESC
  LIMIT 10
`;
connection.query(query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    // console.log(rows)
    res.json(rows);
  }
});
  
};


/*
You will implement a simple "content-based filter"
which will pick movies to recommend based on the genres
of movie whose name the user inputs. 
Return the title, id, rating, and vote count of the top 5
movies that have all the genres of the user-inputted movie
(ordered first by highest "rating" and then highest "vote_count"). 

${movieName}

  SELECT m.title,m.id,m.rating,m.vote_count
  FROM movies m ,genres g
  WHERE g.movie_id = m.id AND 
  g.genre = ALL (SELECT g1.genre
      FROM movies m1,genres g1
      WHERE g1.movie_id = m1.id 
      AND m1.title = 'Tales of Terror')
  ORDER BY m.rating DESC,m.vote_count DESC
  LIMIT 5;

  WITH genre_table AS (
    SELECT genres.genre
    FROM movies, genres
    WHERE movies.title = 'Tales of Terror' AND movies.id = genres.movie_id
  )
  SELECT movies.title,movies.id,movies.rating,movies.vote_count
  FROM movies
  JOIN genres ON movies.id = genres.movie_id
  WHERE movies.title <> '${movieName}' AND genres.genre = ALL (SELECT * FROM genre_table)
  ORDER BY movies.rating DESC,movies.vote_count DESC
  LIMIT 5

    WITH genre_table AS (
    SELECT genres.genre
    FROM movies, genres
    WHERE movies.title = '${movieName}' AND movies.id = genres.movie_id
  )
  SELECT movies.title,movies.id,movies.rating,movies.vote_count
  FROM movies
  JOIN genres ON movies.id = genres.movie_id
  WHERE movies.title <> '${movieName}' AND genres.genre = ANY (SELECT * FROM genre_table)
  ORDER BY movies.rating DESC,movies.vote_count DESC
  LIMIT 5

  SELECT m.title,m.id,m.rating,m.vote_count
  FROM movies m ,genres g
  WHERE g.movie_id = m.id AND 
  g.genre FOR ALL (SELECT g1.genre
    FROM movies m1,genres g1
    WHERE g1.movie_id = m1.id 
    AND m1.title = '${movieName}')
  ORDER BY m.rating DESC,m.vote_count DESC
  LIMIT 5;

  
*/
/* ---- Q2 (Recommendations) ---- */
function getRecs(req, res) {
  var movieName = req.params.movieName;
  var query = `
  SELECT movi.id, movi.title, movi.rating, movi.vote_count
  FROM movies movi, genres g
  WHERE movi.id = g.movie_id
  AND g.genre in (SELECT genre 
                  FROM genres 
                  WHERE movie_id = (SELECT id 
                                    FROM movies 
                                    WHERE lower(title) = trim(lower('${movieName}'))))
  AND movi.title <> trim(lower('${movieName}'))
  GROUP BY movi.id, movi.title
  HAVING count(distinct g.genre) = (SELECT count(*) 
                                    FROM genres 
                                    WHERE movie_id = (SELECT id 
                                                      FROM movies 
                                                      WHERE lower(title) = trim(lower('${movieName}'))))
  ORDER BY movi.rating desc, movi.vote_count desc
  LIMIT 5;
`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/*
When the user selects a decade from the dropdown and clicks "Submit"
show the average rating of every movie that was released in that decade
for every genre that ever existed.
***If there are no movies released for a particular genre in a decade, display its average rating as 0.
***For genres with tied average ratings, sort the results alphabetically by genre.
*/
/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var decade = req.params.decade;
  var decade_ = parseInt(decade)+10
  var query = `
  WITH genre_table AS (SELECT genre, avg(rating) as avg_rating
                        FROM movies movi
                        JOIN genres g ON movi.id = g.movie_id
                        WHERE release_year >= ${decade} AND release_year < ${decade_}
                        GROUP BY genre)
  SELECT *
  FROM (SELECT genre, avg_rating
        FROM genre_table
        UNION
        (SELECT genre,0
        FROM genres gen
        WHERE genre NOT IN (SELECT genre FROM genre_table))) a
  ORDER BY avg_rating DESC,genre
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
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getRecs: getRecs,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade,
  getAllRestaurants: getAllRestaurants
}