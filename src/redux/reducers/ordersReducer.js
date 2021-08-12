import { 
    GET_ORDERS, 
    LOAD_ORDERS_AFTER_SCROLL,
    CONFIRM_ORDER,
} from '../types'

const initialState = {
    orders: [],
    countOrderLoad: 10,
    fetching: true
}

export const ordersReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_ORDERS:
        return {
            ...state,
            orders: payload,
            fetching: false
        }
    case LOAD_ORDERS_AFTER_SCROLL:
        return {
            ...state,
            fetching: true,
            countOrderLoad: state.countOrderLoad + 5
        }
    case CONFIRM_ORDER:
        return {
            ...state,
            orders: state.orders.concat(payload)
        }
    default:
        return state
    }
}
