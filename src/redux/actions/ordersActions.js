import axios from 'axios'

import { 
    GET_ORDERS,
    LOAD_ORDERS_AFTER_SCROLL,
    CONFIRM_ORDER
} from '../types'

const ordersURL = 'http://localhost:3005/orders'

export const getOrders = countLoadOrders => async dispatch => {
    try {
        const res = await axios.get(`${ordersURL}?_limit=${countLoadOrders}`)
        const data = await res.data
        
        dispatch({ type: GET_ORDERS, payload: data })
    } catch(e) {
        console.log(e);
    } 
}

export const loadOrderAfterScroll = () => async dispatch => {
    try {
        
        dispatch({ type: LOAD_ORDERS_AFTER_SCROLL })
    } catch(e) {
        console.log(e);
    }
}

export const confirmOrder = orders => dispatch => {
    try {
        axios.post(`${ordersURL}`, { 
            items: orders 
        })

        dispatch({ type: CONFIRM_ORDER, payload: { items: orders } })
    } catch(e) {
        console.log(e);
    }
}