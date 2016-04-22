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
    QUERY_TO_STATIONS,
    RECEIVE_STATIONS,
    SET_FROM_STATION,
    SET_TO_STATION,
    QUERY_JOURNEYS,
    RECEIVE_JOURNEYS,
    SET_STATION_ERROR
} from '../constants/AppConstants';
import {getJson} from '../utils/getJson';
import moment from 'moment';
import 'moment-timezone';
const api_url = 'https://api.sncf.com/v1/coverage/sncf';

export function asyncGetStations(query, what) {
    return (dispatch) => {
            what === 'from' ? dispatch(queryFromStations()) : dispatch(queryToStations());
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
                    dispatch(receiveStations(stations));
                })
                .catch(function (err) {
                    console.log(err);
                });

    };
}

export function asyncGetJourneys(fromStation,toStation) {
    return (dispatch) => {
        dispatch(queryJourneys());
        // You can do async stuff here!
        // API fetching, Animations,...
        // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
        const dateTime = moment.tz('Europe/Paris').format('YYYYMMDDThhmmss');
        return getJson(api_url + '/journeys?from=' + fromStation + '&to=' + toStation + '&datetime=' + dateTime)
            .then(function (data) {
                dispatch(receiveJourneys(data));
            })
            .catch(function (err) {
                console.log(err);
            });

    };
}

export function queryJourneys() {
    return {type: QUERY_JOURNEYS};
}

export function receiveJourneys(journeys) {
    return {type: RECEIVE_JOURNEYS, journeys};
}

export function queryFromStations() {
    return {type: QUERY_FROM_STATIONS};
}

export function queryToStations() {
    return {type: QUERY_TO_STATIONS};
}

export function receiveStations(stations) {
    return {type: RECEIVE_STATIONS, stations};
}

export function setFromStation(station) {
    return {type: SET_FROM_STATION, station};
}

export function setToStation(station) {
    return {type: SET_TO_STATION, station};
}

export function setStationError(error) {
    return {type: SET_STATION_ERROR, error};
}