import { 
    SIGN_UP,
    SIGN_IN,
    LOG_OUT,
    TOGGLE_FORM
} from '../types'

const initialState = {
    users: [],
    loggedUser: false,
    likes: [],
    toggleForm: false,
}

export const formReducer = (state = initialState, { type, payload }) => {
    switch(type) {
        // Sign up 
        case SIGN_UP:
            return {
                ...state,
                users: state.users.concat(payload)
            }
        // Sign in
        case SIGN_IN:
            return {
                ...state,
                loggedUser: true
            }
        // Log out
        case LOG_OUT:
            return {
                ...state,
                loggedUser: false,
            }
        // Toggle form
        case TOGGLE_FORM:
            return {
                ...state,
                toggleForm: payload,
            }
        default:
            return state
    }
}