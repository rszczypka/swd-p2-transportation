/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-widgets/dist/css/react-widgets.css';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import { asyncGetStations, setFromStation, setToStation } from '../../actions/AppActions';

class HomePage extends Component {

  render() {
    const dispatch = this.props.dispatch;
    const { stations, stationsIsLoading, fromStation, toStation, trains } = this.props.data;
    return (
      <form>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="departure">From</label>
              <Select.Async
                  name="departure"
                  id="departure"
                  required
                  isLoading={ stationsIsLoading }
                  loadOptions={ (input) => { return dispatch(asyncGetStations(input)).then(() => { console.log('loadOptions', stations); return { options: stations }; }) } }
                  minimumInput={2}
                  searchPromptText="Find your from station"
                  onChange={(selectValue) => dispatch(setFromStation(selectValue))}
                  value={ fromStation }
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="arrival">To</label>
              <Select.Async
                  name="arrival"
                  id="arrival"
                  required
                  isLoading={ stationsIsLoading }
                  loadOptions={ (input) => { return dispatch(asyncGetStations(input)).then(() => { console.log('loadOptions', stations); return { options: stations }; }) } }
                  minimumInput={2}
                  searchPromptText="Select your To station"
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
