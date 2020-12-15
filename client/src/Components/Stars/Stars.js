import React from 'react';
import './stars.css';
import star from '../../assets/star.svg';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          stars: this.props.stars,
        };
      }
    render() {
        var array = [];
        for (var i = 0; i < this.state.stars; i++) {
            array.push(<img src={star} className="star-icon" />);
        }
        return array;
    }
}