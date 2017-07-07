import React, { Component } from 'react';
import Navigation from './Navigation';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {browserHistory} from 'react-router';
import './app.css';

Accounts.onLogin(function(user){
  browserHistory.push('/');
});

class App extends Component {
    render() {
        let className="";
        if (this.props.currentUser) className = "is-logged";
        return (
            <div className={className}>
                <Navigation 
                    currentUser={this.props.currentUser}
                />
                {this.props.children}
            </div>
        );
    }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, App);