import React from "react";
import Stars from "../../Components/Stars/Stars"
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
    var restaurantDetailPageUrl = "/restaurant/" + this.state.id;
    return (
      <div className="restaurant">
        <div className="name"><a href={restaurantDetailPageUrl}>{this.state.name}</a></div>
        <div className="city">{this.state.city}</div>
        <div className="stars"><Stars stars={this.state.stars} /></div>
      </div>
    );
  }
}