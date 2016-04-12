/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncChangeProjectName, asyncChangeOwnerName } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-widgets/dist/css/react-widgets.css';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import { asyncGetFromStations, setFromStation } from '../../actions/AppActions';

class HomePage extends Component {

  render() {
    const dispatch = this.props.dispatch;
    const { fromStations, fromStationsIsLoading, toStations, toStationsIsLoading, fromStation, toStation, trains } = this.props.data;
    return (
      <form>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="departure">From</label>
              <Select.Async
                  cache={false}
                  name="departure"
                  id="departure"
                  required
                  isLoading={ fromStationsIsLoading }
                  loadOptions={ (input) => { return dispatch(asyncGetFromStations(input)).then(() => { console.log('loadOptionsf', fromStations); return { options: fromStations }; }) } }
                  minimumInput={3}
                  searchPromptText="Find your from station"
                  onChange={(selectValue) => dispatch(setFromStation(selectValue))}
                  value={ fromStation }
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="arrival">To</label>
              <VirtualizedSelect
                  name="arrival"
                  id="arrival"
                  required
                  options={ toStations }
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
