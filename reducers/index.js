import * as ActionTypes from '../actions'
import merge from 'lodash/object/merge'
import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'


function goods(state = {isFetching: false, plays: [], prices: []}, action) {
    const { type } = action

    switch (type) {
        case ActionTypes.PLAYS_REQUEST:
            return merge({}, state, {
                isFetching: true
            })
        case ActionTypes.PLAYS_SUCCESS:
            return merge({}, state, {
                isFetching: false,
                plays: action.response,
                selectedPlay: action.response[0]
            })
        case ActionTypes.PLAYS_FAILURE:
            return merge({}, state, {
                isFetching: false
            })
        case ActionTypes.PRICES_REQUEST:
            return merge({}, state, {
                isFetching: true
            })
        case ActionTypes.PRICES_SUCCESS:
            return merge({}, state, {
                isFetching: false,
                prices: action.response,
                selectedPrice: action.response[0]
            })
        case ActionTypes.PRICES_FAILURE:
            return merge({}, state, {
                isFetching: false
            })
        default:
            return state
    }
}


function errorMessage(state = null, action) {
    const { type, error } = action

    if (type === ActionTypes.RESET_ERROR_MESSAGE) {
        return null
    } else if (error) {
        return action.error
    }

    return state
}

const rootReducer = combineReducers({
    goods,
    errorMessage,
    router
})

export default rootReducer
