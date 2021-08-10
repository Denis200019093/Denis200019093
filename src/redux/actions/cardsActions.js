import axios from 'axios'

import { RENDER_CARDS, FILTER_CARDS, SEARCH_CARDS, SEARCH_TYPE, CLEAR_FILTER } from '../types'

let urlBoards = 'http://localhost:3005/boards'

export const renderCards = () => async dispatch => {
    try {
        const res = await axios.get(urlBoards)

        dispatch({ type: RENDER_CARDS, payload: res.data })
    } catch(e) {
        console.log(e);
    }
}

export const filterCards = firm => dispatch => {
    try {

        dispatch({ type: FILTER_CARDS, payload: firm })
    } catch(e) {
        console.log(e);
    }
}

export const searchCards = value => dispatch => {
    try {

        dispatch({ type: SEARCH_CARDS, payload: value })
    } catch(e) {
        console.log(e);
    }
}

export const searchType = value => dispatch => {
    try {

        dispatch({ type: SEARCH_TYPE, payload: value })
    } catch(e) {
        console.log(e);
    }
}

export const clearFilter = () => dispatch => {
    try {

        dispatch({ type: CLEAR_FILTER })
    } catch(e) {
        console.log(e);
    }
}

