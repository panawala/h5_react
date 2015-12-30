import { CALL_API } from '../middleware/api'

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

export function resetErrorMessage() {
    return {
        type: RESET_ERROR_MESSAGE
    }
}


export const PLAYS_REQUEST = 'PLAYS_REQUEST'
export const PLAYS_SUCCESS = 'PLAYS_SUCCESS'
export const PLAYS_FAILURE = 'PLAYS_FAILURE'

export function loadPlay(feedId) {
    return (dispatch, getState) => {
        const plays = getState().plays
        if (plays.plays.length > 0) {
            return null
        }

        return dispatch(fetchPlays(feedId)).then((playsx) => {
            console.log('done..........')
            console.log(playsx)
            console.log(playsx.response[0].id)
            return dispatch(fetchPrices(playsx.response[0].id))
        })
    }
}

function fetchPlays(feedId) {
    return {
        [CALL_API]: {
            types: [PLAYS_REQUEST, PLAYS_SUCCESS, PLAYS_FAILURE],
            endpoint: 'plays?feed_id=' + feedId,
            method: 'GET',
            data: {feed_id: feedId}
        }
    }
}

export const PRICES_REQUEST = 'PRICES_REQUEST'
export const PRICES_SUCCESS = 'PRICES_SUCCESS'
export const PRICES_FAILURE = 'PRICES_FAILURE'

export function loadPrice(playId) {
    console.log('loading price')
    console.log(playId)
    return (dispatch, getState) => {
        const prices = getState().prices
        if (prices.prices.length > 0) {
            return null
        }

        return dispatch(fetchPrices(playId))
    }
}

function fetchPrices(playId) {
    return {
        [CALL_API]: {
            types: [PRICES_REQUEST, PRICES_SUCCESS, PRICES_FAILURE],
            endpoint: 'prices?play_id=' + playId,
            method: 'GET',
            data: {play_id: playId}
        }
    }
}

export const SET_QUANTITY = 'SET_QUANTITY'
export const INCR_QUANTITY = 'INCR_QUANTITY'
export const DECR_QUANTITY = 'DECR_QUANTITY'
export function setQuantity(quantity){
    return (dispatch, getState) => {
        return dispatch({type: SET_QUANTITY, quantity: quantity})
    }
}

export function incrQuantity(){
    return (dispatch, getState) => {
        return dispatch({type: INCR_QUANTITY})
    }
}

export function decrQuantity(){
    return (dispatch, getState) => {
        return dispatch({type: DECR_QUANTITY})
    }
}
