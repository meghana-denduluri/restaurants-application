import React from "react";
import {
  Link
} from "react-router-dom";
export default class DashboardRestaurantRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      name: this.props.name,
      city: this.props.city,
      stars: this.props.stars,
    };
  }
  render() {
    return (
      <Link className="restaurant" to={"/restaurantProfile/" + this.state.id}>
        <div className="name">{this.state.name}</div>
        <div className="city">{this.state.city}</div>
        <div className="stars">{this.state.stars}</div>
        </Link>
    );
  }
}