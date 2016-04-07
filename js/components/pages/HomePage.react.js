/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncChangeProjectName, asyncChangeOwnerName } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-widgets/dist/css/react-widgets.css';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import { setFromStation, setToStation } from '../../actions/AppActions';

class HomePage extends Component {

  render() {
    const dispatch = this.props.dispatch;
    const { status, stations, fromStation, toStation, trains } = this.props.data;
    return (
      <form>
        <p>API Status: <span className={ status==='Available' ? 'label label-success' : 'label label-warning' }>{ status }</span></p>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="departure">Departure</label>
              <VirtualizedSelect
                  name="departure"
                  id="departure"
                  required
                  options={ stations }
                  disabled={ status!=='Available' }
                  placeholder="Select departure station"
                  onChange={(selectValue) => dispatch(setFromStation(selectValue))}
                  value={ fromStation }
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="arrival">Arrival</label>
              <VirtualizedSelect
                  name="arrival"
                  id="arrival"
                  required
                  options={ stations }
                  disabled={ status!=='Available' }
                  placeholder="Select arrival station"
                  onChange={(selectValue) => dispatch(setToStation(selectValue))}
                  value={ toStation }
              />
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <button
              className="btn btn-primary btn-block" type="submit"
              disabled={ (!fromStation || !toStation) }
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
