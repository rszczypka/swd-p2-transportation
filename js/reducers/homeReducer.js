/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */

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
import assignToEmpty from '../utils/assign';
import {modeled} from 'react-redux-form';

const initialState = {
    fromStations: [],
    toStations: [],
    fromStationsIsLoading: false,
    toStationsIsLoading: false,
    fromStation: {},
    fromStationError: '',
    toStationError: '',
    toStation: {},
    journeys: {
        disruptions: [],
        exceptions: [],
        journeys: [],
        links: [],
        notes: [],
        tickets: []
    },
    offlineLastUpdate: '',
    journeysIsLoading: false
};

function homeReducer(state = initialState, action) {
    Object.freeze(state); // Don't mutate state directly, always use assign()!
    switch (action.type) {
        case QUERY_FROM_STATIONS:
            return assignToEmpty(state, {
                fromStationsIsLoading: true
            });
        case QUERY_TO_STATIONS:
            return assignToEmpty(state, {
                toStationsIsLoading: true
            });
        case RECEIVE_FROM_STATIONS:
            return assignToEmpty(state, {
                fromStations: action.stations,
                fromStationsIsLoading: false,
                toStationsIsLoading: false
            });
        case RECEIVE_TO_STATIONS:
            return assignToEmpty(state, {
                toStations: action.stations,
                fromStationsIsLoading: false,
                toStationsIsLoading: false
            });
        case QUERY_JOURNEYS:
            return assignToEmpty(state, {
                journeysIsLoading: true,
                stationError: ''
            });
        case RECEIVE_JOURNEYS:
            return assignToEmpty(state, {
                journeys: action.data.journeys,
                offlineLastUpdate: action.data.lastUpdate || '',
                journeysIsLoading: false
            });
        case SET_FROM_STATION:
            return assignToEmpty(state, {
                fromStation: action.station,
                stationError: ''
            });
        case SET_TO_STATION:
            return assignToEmpty(state, {
                toStation: action.station,
                stationError: ''
            });
        case SET_STATION_ERROR:
            return assignToEmpty(state, {
                stationError: action.error,
                fromStationsIsLoading: false,
                toStationsIsLoading: false
            });
        default:
            return state;
    }
}

// Decorated modeled reducer
const modeledHomeReducer = modeled(homeReducer, 'formFields');

export default modeledHomeReducer;
