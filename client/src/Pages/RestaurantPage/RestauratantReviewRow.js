import React from "react";
import Stars from "../../Components/Stars/Stars"

export default class RestaurantReviewRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: props.rating,
            text: props.text
        }
    }
    componentDidMount() {
        this.setState(this.state);
    }
    render() {

        return (
            <div className="mb-4">
                <div className="stars mb-2"><Stars stars={this.state.rating} /></div>
                <div>{this.state.text}</div>
            </div>
        );
    }
}