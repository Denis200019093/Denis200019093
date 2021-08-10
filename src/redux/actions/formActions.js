import axios from 'axios'

import { 
    GET_USERS, 
    GET_LIKES,
    LIKE,
    UNLIKE,
    // Info about the user
    USER_EMAIL, 
    USER_NICKNAME, 
    USER_PASSWORD, 
    // Validation nickname
    CORRENT_NICKNAME,
    ERROR_NICKNAME,
    // Validation email
    CORRENT_EMAIL,
    ERROR_EMAIL,
    // Validation password
    CORRENT_PASSWORD,
    ERROR_PASSWORD,
    // 
    FORM_VALID,
    WHAT_FORM,
    // Sign up / Sign in
    SIGN_UP,
    SIGN_IN,
    LOG_OUT
} from '../types'

const usersURL = 'http://localhost:3005/users'

export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get(usersURL)
        const data = await res.data

        dispatch({ type: GET_USERS, payload: data })
    } catch(e) {
        console.log(e);
    }
}

export const getLikes = id => async dispatch => {
    try {
        const res = await axios.get(usersURL)
        const data = await res.data

        dispatch({ type: GET_LIKES, payload: { data, id } })
    } catch(e) {
        console.log(e);
    }
}

export const like = (id, item, likes) => dispatch => {
    try {
        const saveLikes = likes.concat(item) 

        axios.patch(`${usersURL}/${id}`, {
            likes: [...saveLikes]
        })

        dispatch({ type: LIKE, payload: item })
    } catch(e) {
        console.log(e);
    }
}

export const unlike = (id, likes) => async dispatch => {
    try {

        await axios.patch(`${usersURL}/${id}`, {
            likes: [...likes.filter(item => item.id !== id) ]
     
        })

        // await axios.delete(`${usersURL}/${id}`)

        dispatch({ type: UNLIKE, payload: id })
    } catch(e) {
        console.log(e);
    }
}
// Info about the user
export const userNickname = e => dispatch => {
    try {
        dispatch({ type: USER_NICKNAME, payload: e })
    } catch(e) {
        console.log(e);
    }
}

export const userEmail = e => dispatch => {
    try {
        dispatch({ type: USER_EMAIL, payload: e })
    } catch(e) {
        console.log(e);
    }
}

export const userPassword = e => dispatch => {
    try {
        dispatch({ type: USER_PASSWORD, payload: e })
    } catch(e) {
        console.log(e);
    }
}
// Validation nickname
export const correctNicknameFunc = boolean => dispatch => {
    try {
        dispatch({ type: CORRENT_NICKNAME, payload: boolean })
    } catch(e) {
        console.log(e);
    }
}

export const errorNickNameFunc = message => dispatch => {
    try {
        dispatch({ type: ERROR_NICKNAME, payload: message })
    } catch(e) {
        console.log(e);
    }
}
// Validation email
export const correctEmailFunc = boolean => dispatch => {
    try {
        dispatch({ type: CORRENT_EMAIL, payload: boolean })
    } catch(e) {
        console.log(e);
    }
}

export const errorEmailFunc = message => dispatch => {
    try {
        dispatch({ type: ERROR_EMAIL, payload: message })
    } catch(e) {
        console.log(e);
    }
}
// Validation password
export const correctPasswordFunc = boolean => dispatch => {
    try {
        dispatch({ type: CORRENT_PASSWORD, payload: boolean })
    } catch(e) {
        console.log(e);
    }
}

export const errorPasswordFunc = message => dispatch => {
    try {
        dispatch({ type: ERROR_PASSWORD, payload: message })
    } catch(e) {
        console.log(e);
    }
}
//
export const formValidFunc = boolean => dispatch => {
    try {
        dispatch({ type: FORM_VALID, payload: boolean })
    } catch(e) {
        console.log(e);
    }
}
export const whatFormFunc = boolean => dispatch => {
    try {
        dispatch({ type: WHAT_FORM, payload: boolean })
    } catch(e) {
        console.log(e);
    }
}
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