import React from "react";

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
      <div className="restaurant">
        <div className="key">{this.state.id}</div>
        <div className="name">{this.state.name}</div>
        <div className="city">{this.state.city}</div>
        <div className="stars">{this.state.stars}</div>
      </div>
    );
  }
}