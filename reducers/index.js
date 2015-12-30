import * as ActionTypes from '../actions'
import merge from 'lodash/object/merge'
import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'


function plays(state = {isFetching: false, plays: []}, action) {
    const { type } = action

    const [ requestType, successType, failureType ] = [
        ActionTypes.PLAYS_REQUEST,
        ActionTypes.PLAYS_SUCCESS,
        ActionTypes.PLAYS_FAILURE
    ]

    switch (type) {
        case requestType:
            return merge({}, state, {
                isFetching: true
            })
        case successType:
            return merge({}, state, {
                isFetching: false,
                plays: action.response
            })
        case failureType:
            return merge({}, state, {
                isFetching: false
            })
        default:
            return state
    }
}


function prices(state = {isFetching: false, prices: []}, action) {
    const { type } = action

    const [ requestType, successType, failureType ] = [
        ActionTypes.PRICES_REQUEST,
        ActionTypes.PRICES_SUCCESS,
        ActionTypes.PRICES_FAILURE
    ]

    switch (type) {
        case requestType:
            return merge({}, state, {
                isFetching: true
            })
        case successType:
            return merge({}, state, {
                isFetching: false,
                prices: action.response
            })
        case failureType:
            return merge({}, state, {
                isFetching: false
            })
        default:
            return state
    }
}

function quantity(state = 1, action) {
    console.log('quantity action....')
    console.log(action)
    const { type } = action
    switch (type) {
        case ActionTypes.SET_QUANTITY:
            return action.quantity
        case ActionTypes.INCR_QUANTITY:
            return state + 1
        case ActionTypes.DECR_QUANTITY:
            return state - 1
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
    prices,
    plays,
    quantity,
    errorMessage,
    router
})

export default rootReducer
