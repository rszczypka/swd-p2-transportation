/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
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
                Get The Trains
              </Link>
            </div>
            <div className="navbar-collapse" >
            <ul className="nav navbar-nav navbar-right">
              <li> <Link
                to="/readme"
                activeClassName="active"
                onlyActiveOnIndex
              >
                About
              </Link></li>
            </ul>
            </div>
          </div>
        </nav>

          <main>
            <div className="container">
            { this.props.children }
            </div>
          </main>

        <footer>
          <div className="container">
            <hr />
            <p>&copy; 2016 <i className="fa fa-flask"></i> Rafal Szczypka</p>
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
