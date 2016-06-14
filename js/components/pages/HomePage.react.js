/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Async} from 'react-select';
import 'react-select/dist/react-select.css';
import Journeys from '../Journeys.react';
import {
  asyncGetFromStations,
  asyncGetToStations,
  asyncGetJourneys,
  setFromStation,
  setToStation,
  setStationError
} from '../../actions/AppActions';
import _ from 'lodash';

class HomePage extends Component {

    handleSubmit(e) {
        const dispatch = this.props.dispatch;
        const {fromStation, toStation} = this.props.data;

        e.preventDefault();
        return dispatch(asyncGetJourneys(fromStation, toStation));
    }

    handleFromChange(selectedValue) {
        const dispatch = this.props.dispatch;
        const {toStation} = this.props.data;

        if(!selectedValue) return dispatch(setFromStation({}));

        if (selectedValue.value !== toStation.value) {
            return dispatch(setFromStation(selectedValue));
        }

        return dispatch(setStationError('FROM station should be different than TO station'));
    }

    handleToChange(selectedValue) {
        const dispatch = this.props.dispatch;
        const {fromStation} = this.props.data;

        if(!selectedValue) return dispatch(setToStation({}));

        if (selectedValue.value !== fromStation.value) {
            return dispatch(setToStation(selectedValue));
        }

        return dispatch(setStationError('FROM station should be different than TO station'));
    }

    render() {
        const dispatch = this.props.dispatch;
        const {fromStations, toStations, toStationsIsLoading, fromStationsIsLoading, fromStation, toStation, stationError} = this.props.data;

        return (
          <div>
              <form className="trainForm" onSubmit={(e) => this.handleSubmit(e)}>
                  <div className="container">
                      { stationError &&
                      <div
                        role="alert"
                        className={ (stationError) ? 'alert alert-danger' : '' }
                      >
                          <ul className="list-unstyled">
                              <li>
                                  <span className="label label-danger">error</span> { stationError }
                              </li>
                          </ul>
                      </div>
                      }
                      <div className="row">
                          <div className="col-sm-6">
                              <div className="form-group">
                                  <label htmlFor="departure">From</label>
                                  <Async
                                    name="departure"
                                    id="departure"
                                    required
                                    matchProp="label"
                                    isLoading={ fromStationsIsLoading }
                                    loadOptions={ (input) => { return dispatch(asyncGetFromStations(input)).then(() => { return { options: fromStations }; }) } }
                                    minimumInput={2}
                                    searchPromptText="Start typing the name of your FROM station"
                                    onChange={(selectValue) => this.handleFromChange(selectValue)}
                                    value={ fromStation }
                                  />
                              </div>
                          </div>
                          <div className="col-sm-6">
                              <div className="form-group">
                                  <label htmlFor="arrival">To</label>
                                  <Async
                                    name="arrival"
                                    id="arrival"
                                    required
                                    matchProp="label"
                                    isLoading={ toStationsIsLoading }
                                    loadOptions={ (input) => { return dispatch(asyncGetToStations(input)).then(() => { return { options: toStations }; }) } }
                                    minimumInput={2}
                                    searchPromptText="Start typing the name of your TO station"
                                    onChange={(selectValue) => this.handleToChange(selectValue)}
                                    value={ toStation }
                                  />
                              </div>
                          </div>

                      </div>
                      <div className="row">
                          <div className="col-sm-4 col-sm-offset-4 text-center">
                              <button
                                className="btn btn-primary btn-block" type="submit"
                                disabled={ (_.isEmpty(fromStation) || _.isEmpty(toStation)) }
                              >Get The Train
                              </button>
                          </div>
                      </div>
                  </div>
              </form>
              <div className="container">
                  <Journeys />
              </div>
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
export default connect(select)(HomePage);