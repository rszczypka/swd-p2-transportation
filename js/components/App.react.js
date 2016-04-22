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
import Logo from '../../img/train.png';

class App extends Component {

  render() {
    return (
      <div className="appWrapper">
        <header className="header text-center">
          <div className="container">
            <div className="trademark">
              <h1>SNCF voyageurs</h1>
              <h2>Discover France</h2>
              <img className="logo" src={Logo} />
            </div>
          </div>
        </header>
          <main>
            { this.props.children }
          </main>

        <footer>
          <div className="container">
            <hr />
            <p className="text-capitalize text-center">Embarquement pour un merveilleux voyage! <small>Get on board for a spectacular journey!</small></p>
            <ul className="list-inline text-center">
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
