import React from "react";

export default class DishWithRecipesRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dishName: this.props.dishName,
            // name: this.props.name,
            // city: this.props.city,
            // stars: this.props.stars,
        };
    }

    render() {

        return (
            <div className="dish">
                <div className="name">{this.state.dishName}</div>


                <hr />
            </div>
        );
    }
}