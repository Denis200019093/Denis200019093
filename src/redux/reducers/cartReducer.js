import { 
    RENDER_CART, 
    ADD_TO_CART,
    REMOVE_FROM_CART, 
    PLUS_ITEM_CART, 
    MINUS_ITEM_CART,
    OPEN_CART,
    CLOSE_CART,
    GET_ORDERS, 
    LOAD_ORDERS_AFTER_SCROLL,
    CONFIRM_ORDER,
    CLEAR_CART 
} from '../types'

const initialState = {
    cart: [],
    orders: [],
    countOrderLoad: 10,
    fetching: true,
    openCart: false
}


export const cartReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case RENDER_CART:
            return {
                ...state,
                cart: payload
            }
        case ADD_TO_CART:
            const newItemCart = {
                id: payload.id,
                title: payload.title,
                price: payload.price,
                img: payload.img,
                count: 1
            }

            return {
                ...state,
                cart: [
                    ...state.cart,
                    newItemCart,
                ],
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== payload),
            }
        case PLUS_ITEM_CART:
            const itemCartForPlus = state.cart.find(item => item.id === payload)

            const newArrForPlus = state.cart.map(item => {
                if (itemCartForPlus === item) {
                    return {
                        ...item,
                        count: item.count + 1
                    }
                }
                
                return item
            })

            return {
                ...state,
                cart: newArrForPlus,
            }
        case MINUS_ITEM_CART:
            const itemCartForMinus = state.cart.find(item => item.id === payload)
            
            const newArrForMinus = state.cart.map(item => {
                if (itemCartForMinus === item) {
                    return {
                        ...item,
                        count: item.count - 1
                    }
                }
                
                return item
            })
            
            return {
                ...state,
                cart: newArrForMinus,
            }
        case OPEN_CART:
            return {
                ...state,
                openCart: true
            }
        case CLOSE_CART:
            return {
                ...state,
                openCart: false
            }
        case CLEAR_CART:
            return {
                ...state,
                cart: []
            }
        default:
            return state
    }
}