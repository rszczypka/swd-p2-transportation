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
  RECEIVE_FROM_STATIONS,
  RECEIVE_TO_STATIONS,
  SET_FROM_STATION,
  SET_TO_STATION,
  QUERY_JOURNEYS,
  RECEIVE_JOURNEYS,
  SET_STATION_ERROR
} from '../constants/AppConstants';
import Dexie from 'dexie';
import {getJson} from '../utils/getJson';
import moment from 'moment';
import 'moment-timezone';
const api_url = 'https://api.sncf.com/v1/coverage/sncf';
const db = new Dexie('SNCFApp');

db.version(1).stores({
  results: 'from_to'
});

db.open();

export function asyncGetFromStations(query) {
  return (dispatch) => {
    dispatch(queryFromStations());

    if(navigator.onLine && db) {
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
    } else {
      db.results.toArray().then((results) => {
        const unique = _.map(_.indexBy(results, 'from.value'), (obj) => {
          return obj;
        });

        return dispatch(receiveFromStations(unique));
      })
    }


  };
}

export function asyncGetToStations(query) {
  return (dispatch) => {
    dispatch(queryToStations());

    if(navigator.onLine && db) {
      return getJson(api_url + '/places?q=' + query + '&type[]=stop_area')
        .then(function (data) {
          const stations = new Array();
          data.places.map(function (place) {
            stations.push({
              value: place.id,
              label: place.name
            });
          });
          dispatch(receiveToStations(stations));
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      db.results
        .where('from_to').startsWith(query + '_')
        .toArray().then((results) => {
        const unique = _.map(_.indexBy(results, 'from.value'), (obj) => {
          return obj;
        });

        return dispatch(receiveToStations(unique));
      })
    }


  };
}

export function saveResultsToLocal(from, to, results) {
  return () => {
    console.log('put into offline db', from, to);
    db.results.put({
      from_to: from.value + '_' + to.value,
      from: from,
      to: to,
      journeys: results,
      lastUpdated: moment.tz('Europe/Paris').format('YYYYMMDDThhmmss')
    });
  };
}

export function asyncGetJourneys(fromStation, toStation) {
  return (dispatch) => {
    dispatch(queryJourneys());
    if (navigator.onLine && db) {
      const dateTime = moment.tz('Europe/Paris').format('YYYYMMDDThhmmss');
      return getJson(api_url + '/journeys?from=' + fromStation.value + '&to=' + toStation.value + '&datetime=' + dateTime)
        .then(function (data) {
          dispatch(saveResultsToLocal(fromStation, toStation, data));
          const output = {
            journeys: data,
            lastUpdate: dateTime
          };
          dispatch(receiveJourneys(output));
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      db.results
        .where('from_to').equals(fromStation.value + '_'+ toStation.value)
        .first()
        .then((results) => {
          if(!results.journeys.length) {
            throw Error('No results available in the IndexedDB');
          }


        })
    }


  };
}

export function queryJourneys() {
  return {type: QUERY_JOURNEYS};
}

export function receiveJourneys(data) {
  return {type: RECEIVE_JOURNEYS, data};
}

export function queryFromStations() {
  return {type: QUERY_FROM_STATIONS};
}

export function queryToStations() {
  return {type: QUERY_TO_STATIONS};
}

export function receiveFromStations(stations) {
  return {type: RECEIVE_FROM_STATIONS, stations};
}

export function receiveToStations(stations) {
  return {type: RECEIVE_TO_STATIONS, stations};
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