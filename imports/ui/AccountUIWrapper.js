import { Blaze } from 'meteor/blaze'
import { Template } from 'meteor/templating'
import AccountsUI from 'meteor/ian:accounts-ui-bootstrap-3'
import React from 'react'
import ReactDOM from 'react-dom'
import './account-ui.css';
import $ from 'jquery';

export default class AccountsUIWrapper extends React.Component {
  componentDidMount() {
    Template._loginButtonsLoggedOutDropdown.rendered = function() {
        $('.dropdown-toggle').dropdown()
    }
    Template._loginButtonsLoggedInDropdown.rendered = function() {
        $('.dropdown-toggle').dropdown()
    }
    this.view = Blaze.render(Template._loginButtons,
    ReactDOM.findDOMNode(this.refs.container))
  }
  componentWillUnmount() {
    Blaze.remove(this.view)
  }
  render() {
    return <div ref="container"></div>
  }
}