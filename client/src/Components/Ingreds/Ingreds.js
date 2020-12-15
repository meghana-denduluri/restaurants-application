import React from 'react';
import './ingreds.css';

export default class Ingreds extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        var ingreds = [], arr =[];
        this.props.ingreds.map(function(item) {
            arr.push(item.name);
        });
        for (var i = 0; i < arr.length; i++) {
            ingreds.push(<span className='ingreds' key={i}>{arr[i]}</span>);
        }
        return ingreds;
    }
}