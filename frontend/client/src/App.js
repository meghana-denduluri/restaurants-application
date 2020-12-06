import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Pages/LandingPage/Dashboard';
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
					</Switch>
				</Router>
			</div>
		);
	}
}