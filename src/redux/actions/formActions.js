import axios from 'axios'

import { 
    SIGN_UP,
    SIGN_IN,
    LOG_OUT,
    TOGGLE_FORM
} from '../types'

const usersURL = 'http://localhost:3005/users'

// Sign up / Sign in
export const signUp = (name, email, password) => dispatch => {
    try {
        axios.post(usersURL, { 
            name, 
            email, 
            password,
            likes: []
        })

        dispatch({ type: SIGN_UP, payload: { name, email, password } })
    } catch(e) {
        console.log(e);
    }
}

export const signIn = () => dispatch => {
    try {
        dispatch({ type: SIGN_IN })
    } catch(e) {
        console.log(e);
    }
}

export const logOut = () => dispatch => {
    try {
        dispatch({ type: LOG_OUT })
    } catch(e) {
        console.log(e);
    }
}

export const toggleFormFunc = boolean => dispatch => {
    try {
        dispatch({ type: TOGGLE_FORM, payload: boolean })
    } catch(e) {
        console.log(e);
    }
}