import React from 'react';
import './tags.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        var tags = [];
        var arr = this.props.tags.split(",").map(function(item) {
            return item.trim();
        });
        for (var i = 0; i < arr.length; i++) {
            tags.push(<span className='tags' key={i}>{arr[i]}</span>);
        }
        return tags;
    }
}