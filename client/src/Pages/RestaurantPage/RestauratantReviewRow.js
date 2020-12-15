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
            <div>
                <div className="stars"><Stars stars={this.state.rating} /></div>
                <div>{this.state.text}</div>
            </div>
        );
    }
}