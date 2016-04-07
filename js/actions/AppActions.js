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

import { RECEIVE_STATUS, RECEIVE_STATIONS, AWAIT_STATIONS, SET_FROM_STATION, SET_TO_STATION } from '../constants/AppConstants';
const api_url = 'http://darwin.hacktrain.com/api';
const apiKey = 'd158a105-c668-4ad0-9ddb-ce08f4f8eb44';

export function asyncGetStatus() {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    fetch(api_url+'/status')
        .then(function(response) {
          return response.json();
        }).then(function(data) {
          if(data.OpenLDBWS === 'Available') {
            dispatch(asyncGetStations());
          }
          return dispatch(getStatus(data.OpenLDBWS));
        })
        .catch(function(err) {
          console.error(err);
        });

  };
}

export function asyncGetStations() {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    fetch(api_url+'/station/code')
        .then(function(response) {
          return response.json();
        }).then(function(data) {
          console.log(data);
          const stations = new Array();
          Object.keys(data).map(function(stationId){
            stations.push({
              value: stationId,
              label: data[stationId]
            });
          });
          console.log(stations);
          return dispatch(getStations(stations));
        })
        .catch(function(err) {
          console.error(err);
        });
  };
}

export function getStatus(status) {
  return { type: RECEIVE_STATUS, status };
}

export function getStations(stations) {
  return { type: RECEIVE_STATIONS, stations };
}

export function setFromStation(station) {
    console.log(station);
    return { type: SET_FROM_STATION, station };
}

export function setToStation(station) {
    return { type: SET_TO_STATION, station };
}
