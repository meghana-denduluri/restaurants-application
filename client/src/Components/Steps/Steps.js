import React from 'react';
import './steps.css';

export default class Steps extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        var steps = [];
        var arr = this.props.steps.split(",").map(function(item) {
            return item.trim();
        });
        for (var i = 0; i < arr.length; i++) {
            steps.push(<div className='steps' key={i}>Step {arr[i]}</div>);
        }
        return steps;
    }
}