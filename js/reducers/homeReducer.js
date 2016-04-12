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
    QUERY_STATIONS,
    RECEIVE_STATIONS,
    SET_FROM_STATION,
    SET_TO_STATION
} from '../constants/AppConstants';
import assignToEmpty from '../utils/assign';
import {modeled} from 'react-redux-form';

const initialState = {
    stations: [],
    stationsIsLoading: false,
    fromStation: {},
    toStation: {},
    trains: {}
};

function homeReducer(state = initialState, action) {
    Object.freeze(state); // Don't mutate state directly, always use assign()!
    switch (action.type) {
        case QUERY_STATIONS:
            return assignToEmpty(state, {
                stationsIsLoading: true
            });
        case RECEIVE_STATIONS:
            return assignToEmpty(state, {
                stations: action.stations,
                stationsIsLoading: false
            });
        case SET_FROM_STATION:
            return assignToEmpty(state, {
                fromStation: action.station
            });
        case SET_TO_STATION:
            return assignToEmpty(state, {
                toStation: action.station
            });
        default:
            return state;
    }
}

// Decorated modeled reducer
const modeledHomeReducer = modeled(homeReducer, 'formFields');

export default modeledHomeReducer;
