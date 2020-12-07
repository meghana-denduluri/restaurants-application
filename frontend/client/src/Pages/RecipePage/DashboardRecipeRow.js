import React from "react";

export default class DashboardRecipeRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      name: this.props.name,
      descr: this.props.descr

    };
  }
  
  render() {
    return (
      <div className="recipes">
        <div className="key">{this.state.id}</div>
        <div className="name">{this.state.name}</div>
        <div className="descr">{this.state.descr}</div>
      </div>
    );
  }
}