/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncChangeProjectName, asyncChangeOwnerName } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-widgets/dist/css/react-widgets.css';
import Combobox from 'react-widgets/lib/Combobox';

var colors = ['orange', 'red', 'blue', 'purple'];

class HomePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { projectName, ownerName } = this.props.data;
    return (
      <form>

        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="departure">Departure</label>
              <Combobox
                id="departure"
                name="departure"
                required
                data={colors}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="arrival">Arrival</label>
              <Combobox
                id="arrival"
                name="arrival"
                required
                data={colors}
              />
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <button
              className="btn btn-primary btn-block" type="submit"
              disabled
            >Get The Trains</button>
          </div>
        </div>

      </form>
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
export default connect(select)(HomePage);
