import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Pages/LandingPage/Dashboard';
import Restaurants from './Pages/RestaurantPage/RestaurantsHome'
import Recipes from './Pages/RecipePage/RecipesHome'
// import Recommendations from './Recommendations';
// import BestGenres from './BestGenres';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/websitename"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							path="/recipes"
							render={() => (
								<Recipes />
							)}
						/>
						<Route
							path="/restaurants"
							render={() => (
								<Restaurants />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}