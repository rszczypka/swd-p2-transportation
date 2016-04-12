/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return (dispatch) => {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        };
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

// Disable the no-use-before-define eslint rule for this file
// It makes more sense to have the asnyc actions before the non-async ones
/* eslint-disable no-use-before-define */

import {
    QUERY_FROM_STATIONS,
    RECEIVE_FROM_STATIONS,
    QUERY_TO_STATIONS,
    RECEIVE_TO_STATIONS,
    SET_FROM_STATION,
    SET_TO_STATION
} from '../constants/AppConstants';
import {getJson} from '../utils/getJson';
const api_url = 'https://api.sncf.com/v1/coverage/sncf';

export function asyncGetFromStations(query) {
    return (dispatch) => {
            dispatch(queryFromStations());
            // You can do async stuff here!
            // API fetching, Animations,...
            // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
            return getJson(api_url + '/places?q=' + query + '&type[]=stop_area')
                .then(function (data) {
                    const stations = new Array();
                    data.places.map(function (place) {
                        stations.push({
                            value: place.id,
                            label: place.name
                        });
                    });
                    dispatch(receiveFromStations(stations));
                })
                .catch(function (err) {
                    console.log(err);
                });

    };
}

export function asyncSetToStations(fromStation) {
    return (dispatch) => {
        dispatch(setFromStation(fromStation));
        const stations = new Array();
        // You can do async stuff here!
        // API fetching, Animations,...
        // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
        getJson(api_url + '/train/' + fromStation.value + '/to?apiKey=' + apiKey + '&rows=' + rows)
            .then(function (data) {
                return data.map(function (train) {
                        return getJson(api_url + '/service?id=' + train.serviceId + '&apiKey=' + apiKey);
                    })
                    .reduce(function (sequence, trainPromise) {
                        // Use reduce to chain the promises together,
                        // adding content to the array for each train

                        return sequence.then(function () {
                            // Wait for everything in the sequence so far,
                            // then wait for this train info to arrive.
                            return trainPromise;
                        }).then(function (train) {
                            stations.push({
                                value: train.stationCode,
                                label: train.locationName
                            });
                        })
                    }, Promise.resolve())

            }).then(function () {
            return dispatch(getToStations(stations));
        }).catch(function (err) {
            console.log("getJSON failed with", err);
            throw err;
        });
    };
}

export function queryFromStations() {
    return {type: QUERY_FROM_STATIONS};
}

export function receiveFromStations(stations) {
    console.log('receiveFromStations', stations);
    return {type: RECEIVE_FROM_STATIONS, stations};
}

export function queryToStations() {
    return {type: QUERY_TO_STATIONS};
}

export function receiveToStations(stations) {
    return {type: RECEIVE_TO_STATIONS, stations};
}

export function setFromStation(station) {
    console.log(station);
    return {type: SET_FROM_STATION, station};
}

export function setToStation(station) {
    return {type: SET_TO_STATION, station};
}
