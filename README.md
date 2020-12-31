# 2DIY4

_Application that allows users to find restaurants that serve their favorite recipes, or find recipes of their favorite restaurants’ dishes_

## Project Goals

Upon closing restaurants amid the Coronavirus lockdown in 2020, a lot of people have experienced an unexpected loss: millions of people lost the comfort of food, the joy of communal eating and gathering with friends and loved ones. To counteract that, and to alleviate some of the stress felt by many since March, people have turned to the joy of cooking; specifically to try and recreate some of the flavors and dishes that they remember and associate with easier and more joyful times.

The goal of our project was two-factored:

- Retrieve a variety of recipes of any dish from a chosen restaurant
- Find a list of restaurants serving the user’s chosen recipe/dish

To build our database, we mainly utilized two datasets, namely the Yelp Open Dataset (for the restaurant dataset) and the Food.com Recipes and Interactions (for corresponding recipes). Furthermore, an extensive amount of web scraping was also needed to link restaurants and recipes.

## Technologies Used

- Python - Standard libraries (NumPy and Pandas) for data pre-processing
- Py_stringmatching and py_strings_im_join Python packages for entity resolution
- Requests, lxml, re, time, random, and json Python packages for web scraping
- Google colab notebook
- PySpark
- MySQL
- React.js, Express.js and Node.js for web development
- Amazon Web Services- RDS cloud database service

## Build

You'll need:

- `npm` and `node`
- `git`

```
$ git clone https://github.com/meghana-denduluri/restaurants-application.git
```

Then, in the repository:

```
$ cd server
$ npm install
$ npm start
```

In the repository in another terminal:

```
$ cd client
$ npm install
$ npm start
```

## Supplementary Materials
- Data Wrangling Notebooks: Jupyter Notebooks for data wrangling and entity resolution in Python (Pandas, Pyspark)
- Web Scraper: Jupyter Notebook for scraping Yelp for menu information
- Report: PDF describing the project
- Website_Description: 4 minute video describing the website features
