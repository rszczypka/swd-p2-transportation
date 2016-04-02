/*
 * ReadmePage
 *
 * This is the page users see when they click the "Setup" button on the HomePage
 */

import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ReadmePage extends Component {
  render() {
    return (
      <div>
        <h2>About the application <small>Get The Train</small></h2>
        <p>Get The Train is an offline-first application that allows users to select a departure and arrival train station,
          and see a list of trains, times, and durations. A default train schedule will be provided that should be
          used when the application is offline. If a network connection exists, the application will query
          an endpoint that provides information about all arrival and departure times.</p>

        <Link className="btn btn-primary" to="/">&larr; Go back to the app</Link>
      </div>
    );
  }
}
