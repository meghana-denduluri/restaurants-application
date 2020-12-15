import React from 'react';
import './tags.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        var tags = [], arr =[];
        this.props.tags.map(function(item) {
            arr.push(item.tag);
        });
        for (var i = 0; i < arr.length; i++) {
            tags.push(<span className='tags' key={i}>{arr[i]}</span>);
        }
        return tags;
    }
}