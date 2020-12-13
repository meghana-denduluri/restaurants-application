import React from "react";
import {
  Link
} from "react-router-dom";
export default class DashboardRecipeRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      name: this.props.name,
      descr: this.props.descr
    };
  }
  getParagraph(text){
    if (text){
      return text.trim()
    }
    else{
      return ''
    }
  }
  render() {
    return (
      <div>
      <Link className="restaurant" to={"/recipeProfile/" + this.state.id}>
        <div className="name">{this.state.name}</div>
        </Link>
        <div><p className="rating">{this.getParagraph(this.state.descr)}</p></div>
        <br></br>
        </div>
        
    );
  }
}