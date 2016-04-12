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
    QUERY_STATIONS,
    RECEIVE_STATIONS,
    SET_FROM_STATION,
    SET_TO_STATION
} from '../constants/AppConstants';
import {getJson} from '../utils/getJson';
const api_url = 'https://api.sncf.com/v1/coverage/sncf';

export function asyncGetStations(query) {
    return (dispatch) => {
            dispatch(queryStations());
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

export function queryStations() {
    return {type: QUERY_STATIONS};
}

export function receiveStations(stations) {
    return {type: RECEIVE_STATIONS, stations};
}

export function setFromStation(station) {
    console.log(station);
    return {type: SET_FROM_STATION, station};
}

export function setToStation(station) {
    return {type: SET_TO_STATION, station};
}
