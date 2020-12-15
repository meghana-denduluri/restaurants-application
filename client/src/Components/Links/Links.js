import React from 'react';
import './links.css';
import {
    Link,
  } from "react-router-dom";


export default class Links extends React.Component {
    constructor(props) {
        super(props);
    }
    goToRestaurant (val) {
        var restaurantDetailPageUrl = "/restaurant/" + val.id;

    }
    render() {
        var links = [], arr = [];
        this.props.links.map(function(item) {
            arr.push(item);
        });
        for (var i = 0; i < arr.length; i++) {
            links.push(
                <div className="links">
                    <Link to={"/restaurant/" + arr[i].restaurantID}>{arr[i].name}</Link>
                </div>
            );
        }
        return links;
    }
}