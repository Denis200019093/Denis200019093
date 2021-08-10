import { combineReducers } from "redux";

import { cardsReducer } from './cardsReducer'
import { cartReducer } from './cartReducer'
import { formReducer } from './formReducer'

export const rootReducer = combineReducers({
    cards: cardsReducer,
    cart: cartReducer,
    auth: formReducer
})