import React from 'react';
import './review.css';
import Stars from "../Stars/Stars"


export default class Steps extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        var review = [], arr = [];
        this.props.review.map(function(item) {
            arr.push(item);
        });
        for (var i = 0; i < arr.length; i++) {
            review.push(
                <div className="review">
                    <div>{arr[i].text}</div>                    
                    <Stars stars={arr[i].rating}/>
                </div>
            );
        }
        return review;
    }
}