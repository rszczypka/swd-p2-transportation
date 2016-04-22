/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Journeys from '../Journeys.react';
import {asyncGetStations, asyncGetJourneys, setFromStation, setToStation} from '../../actions/AppActions';

class HomePage extends Component {

    handleSubmit(e) {
        const dispatch = this.props.dispatch;
        const {fromStation, toStation} = this.props.data;

        e.preventDefault();
        return dispatch(asyncGetJourneys(fromStation.value, toStation.value));
    }

    render() {
        const dispatch = this.props.dispatch;
        const {stations, toStationsIsLoading, fromStationsIsLoading, fromStation, toStation} = this.props.data;

        return (
            <div>
                <form className="trainForm" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="departure">From</label>
                                    <Select.Async
                                        name="departure"
                                        id="departure"
                                        required
                                        matchProp="label"
                                        isLoading={ fromStationsIsLoading }
                                        loadOptions={ (input) => { return dispatch(asyncGetStations(input,'from')).then(() => { return { options: stations }; }) } }
                                        minimumInput={2}
                                        searchPromptText="Start typing the name of your FROM station"
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
                                        matchProp="label"
                                        isLoading={ toStationsIsLoading }
                                        loadOptions={ (input) => { return dispatch(asyncGetStations(input,'to')).then(() => { return { options: stations }; }) } }
                                        minimumInput={2}
                                        searchPromptText="Start typing the name of your TO station"
                                        onChange={(selectValue) => dispatch(setToStation(selectValue))}
                                        value={ toStation }
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-sm-4 col-sm-offset-4 text-center">
                                <button
                                    className="btn btn-primary btn-block" type="submit"
                                    disabled={ (!fromStation || !toStation) }
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
