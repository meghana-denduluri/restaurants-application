import React from 'react';
import './steps.css';

export default class Steps extends React.Component {
    constructor(props) {
        super(props);
      }
    render() {
        var steps = [], arr = [];
        this.props.steps.map(function(item) {
            arr.push(item);
        });
        for (var i = 0; i < arr.length; i++) {
            steps.push(<div className='steps' key={i}>Step {arr[i].stepNum}: {arr[i].instruction}</div>);
        }
        return steps;
    }
}