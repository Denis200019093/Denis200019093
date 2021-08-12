import axios from 'axios'

import { 
    RENDER_CART, 
    ADD_TO_CART,
    REMOVE_FROM_CART, 
    PLUS_ITEM_CART, 
    MINUS_ITEM_CART, 
    OPEN_CART,
    CLOSE_CART,
    CLEAR_CART 
} from '../types'

export const renderCart = cartData => dispatch => {
    try {
        dispatch({ type: RENDER_CART, payload: cartData })
    } catch(e) {
        console.log(e);
    }
}

export const addToCart = (item, cart) => dispatch => {
    try {
        dispatch({ type: ADD_TO_CART, payload: item })
    } catch(e) {
        console.log(e);
    }
}

export const removeFromCart = id => dispatch => {
    try {
        dispatch({ type: REMOVE_FROM_CART, payload: id })
    } catch(e) {
        console.log(e);
    }
}

export const plusCartItem = id => dispatch => {
    try {

        dispatch({ type: PLUS_ITEM_CART, payload: id })
    } catch(e) {
        console.log(e);
    }
}

export const minusCartItem = id => dispatch => {
    try {

        dispatch({ type: MINUS_ITEM_CART, payload: id })
    } catch(e) {
        console.log(e);
    }
}

export const openCart = () => dispatch => {
    try {

        dispatch({ type: OPEN_CART })
    } catch(e) {
        console.log(e);
    }
}

export const closeCart = () => dispatch => {
    try {

        dispatch({ type: CLOSE_CART })
    } catch(e) {
        console.log(e);
    }
}

export const clearCart = () => dispatch => {
    try {
        localStorage.removeItem('CART_SHOP')

        dispatch({ type: CLEAR_CART })
    } catch(e) {
        console.log(e);
    }
}