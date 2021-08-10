import { RENDER_CARDS, FILTER_CARDS, SEARCH_CARDS, SEARCH_TYPE, CLEAR_FILTER } from '../types'

const initialState = {
    cards: [],
    filter: [],
    searchType: '',
    search: ''
}

export const cardsReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case RENDER_CARDS:
            return {
                ...state,
                cards: payload
            }
        case FILTER_CARDS:
            return {
                ...state,
                filter: state.cards.filter(item => item.firm.toLowerCase() === payload.toLowerCase())
            }
        case SEARCH_CARDS:
            return {
                ...state,
                search: payload,
                // filter: []
            }
        case SEARCH_TYPE:
            return {
                ...state,
                searchType: payload,
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filter: []
            }
        default:
            return state
    }
}