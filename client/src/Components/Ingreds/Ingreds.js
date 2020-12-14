import React from 'react';
import './ingreds.css';

export default class Ingreds extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        var ingreds = [];
        var arr = this.props.ingreds.split(",").map(function(item) {
            return item.trim();
        });
        for (var i = 0; i < arr.length; i++) {
            ingreds.push(<div className='ingreds' key={i}>{arr[i]}</div>);
        }
        return ingreds;
    }
}