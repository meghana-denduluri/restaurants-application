import React from "react";

export default class RecipeBriefRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.recipeName,
            description: props.recipeDescription,
            id: props.recipeId,


        }
    }
    componentDidMount() {
        this.setState(this.state);
    }
    render() {
        var recipeDetailPageUrl = "/recipeProfile/" + this.state.id;
        return (
            <div style={{ paddingLeft: "20px", marginBottom: "5px" }} ><a href={recipeDetailPageUrl}>{this.state.name}</a>
                <div>{this.state.description}</div>
            </div >
        );
    }
}