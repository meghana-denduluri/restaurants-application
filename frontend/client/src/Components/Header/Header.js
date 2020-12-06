import React from 'react';
import './header.css';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div class="flex-container d-flex header">
                <div class="logo-container justify-start">
                    <img src="@/assets/logo.svg" alt="WholeFoods Logo" />
                </div>
                <div class="d-flex profile-container">
                    <img class="user-icon" src="@/assets/user.svg" alt="user-icon" />
                    <span class="text">Sign Up</span>
                </div>
            </div>
        );
    }
}