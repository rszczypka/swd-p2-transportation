/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Logo from '../../img/logo.png';

class App extends Component {

  render() {
    return (
      <div className="appWrapper">
        <nav className="navbar navbar-inverse navbar-default">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" activeClassName="active" to="/">
                Get The Train
              </Link>
            </div>
          </div>
        </nav>

          <main>
            { this.props.children }
          </main>

        <footer>
          <div className="container">
            <hr />
            <ul className="list-inline">
              <li>&copy; 2016 Rafal Szczypka</li>
              <li>
                <Link
                  to="/readme"
                  activeClassName="active"
                  onlyActiveOnIndex
                >
                  <span className="fa fa-info"></span> About
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
