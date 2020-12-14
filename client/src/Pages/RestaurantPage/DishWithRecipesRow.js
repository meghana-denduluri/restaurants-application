import React from "react";
import DashboardRestaurantRow from './DashboardRestaurantRow';
import RecipeBriefRow from './RecipeBriefRow';

export default class DishWithRecipesRow extends React.Component {
    constructor(props) {
        super(props);
        var recipes = props.children;

        let recipeDivs = recipes.map((recipeBriefObj, i) =>
            <RecipeBriefRow
                recipeId={recipeBriefObj.recipeId} recipeName={recipeBriefObj.recipeName} recipeDescription={recipeBriefObj.recipeDescription} />
        );
        this.state = {
            dishName: this.props.dishName,
            recipes: recipeDivs
        };
    }

    render() {

        return (
            <div className="dish">
                <div className="name"><b>{this.state.dishName}</b></div>
                {this.state.recipes}
                <hr />
            </div>
        );
    }
}