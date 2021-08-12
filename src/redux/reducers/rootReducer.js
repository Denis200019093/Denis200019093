import { combineReducers } from "redux";

import { cardsReducer } from './cardsReducer'
import { cartReducer } from './cartReducer'
import { formReducer } from './formReducer'
import { userReducer } from './userReducer'
import { ordersReducer } from './ordersReducer'

export const rootReducer = combineReducers({
    cards: cardsReducer,
    cart: cartReducer,
    auth: formReducer,
    users: userReducer,
    orders: ordersReducer
})