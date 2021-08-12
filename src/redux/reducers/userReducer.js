import { 
    GET_USERS, 
    GET_LIKES,
    FAILURE_REQUEST,
    LIKE,
    UNLIKE,
} from '../types'

const initialState = {
    users: [],
    likes: [],
    failure: false,
    loggedUser: false
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case GET_USERS:
            return {
                ...state,
                users: payload
            }
        case GET_LIKES:
            const user = payload.data.find(item => item.id === payload.id)
            
            return {
                ...state,
                likes: user.likes
            }
        case FAILURE_REQUEST:
            return {
                ...state,
                failure: payload
            }
        case LIKE:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    payload
                ]
            }
        case UNLIKE:
            return {
                ...state,
                likes: state.likes.filter(item => item.id !== payload)
            }
        default:
            return state
    }
}