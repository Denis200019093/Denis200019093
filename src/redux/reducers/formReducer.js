import { 
    GET_USERS, 
    GET_LIKES,
    LIKE,
    UNLIKE,
    USER_EMAIL, 
    USER_NICKNAME, 
    USER_PASSWORD, 
    CORRENT_NICKNAME,
    ERROR_NICKNAME,
    CORRENT_EMAIL,
    ERROR_EMAIL,
    CORRENT_PASSWORD,
    ERROR_PASSWORD,
    FORM_VALID,
    WHAT_FORM,
    SIGN_UP,
    SIGN_IN,
    LOG_OUT
} from '../types'

const initialState = {
    users: [],
    loggedUser: false,
    likes: [],

    nickName: '',
    email: '',
    password: '',

    correntNickName: false,
    errorNickNameMessage: 'Nickname',

    correntEmail: false,
    errorEmailMessage: 'Email',

    correntPassword: false,
    errorPasswordMessage: 'Password',

    formValid: false,
    formSignUp: false
}

export const formReducer = (state = initialState, { type, payload }) => {
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
        case LIKE:
            // const user = state.users.find(item => item.id === payload.id)

            // const newArr = user.likes.concat(payload.item)
            // const likeObj = state.likes.concat(newArr)
            return {
                ...state,
                likes: [
                    ...state.likes,
                    payload
                ]
                // likes: state.likes.concat(payload.item)
            }
        case UNLIKE:
            return {
                ...state,
                likes: state.likes.filter(item => item.id !== payload)
            }
        // Info about the user
        case USER_NICKNAME:
            return {
                ...state,
                nickName: payload
            }
        case USER_EMAIL:
            return {
                ...state,
                email: payload
            }
        case USER_PASSWORD:
            return {
                ...state,
                password: payload
            }
        // Validation nickname
        case CORRENT_NICKNAME:
            return {
                ...state,
                correntNickName: payload
            }
        case ERROR_NICKNAME:
            return {
                ...state,
                errorNickNameMessage: payload
            }
        // Validation email
        case CORRENT_EMAIL:
            return {
                ...state,
                correntEmail: payload
            }
        case ERROR_EMAIL:
            return {
                ...state,
                errorEmailMessage: payload
            }
        // Validation password
        case CORRENT_PASSWORD:
            return {
                ...state,
                correntPassword: payload
            }
        case ERROR_PASSWORD:
            return {
                ...state,
                errorPasswordMessage: payload
            }
        // Form valid
        case FORM_VALID:
            return {
                ...state,
                formValid: payload
            }
        // What form
        case WHAT_FORM:
            return {
                ...state, 
                formSignUp: payload,
                nickName: '',
                email: '',
                password: '',
            }
        // Sign up 
        case SIGN_UP:
            return {
                ...state,
                users: state.users.concat(payload),
                nickName: '',
                email: '',
                password: ''
            }
        case SIGN_IN:
            return {
                ...state,
                loggedUser: true,
                email: '',
                password: ''
            }
        case LOG_OUT:
            return {
                ...state,
                loggedUser: false,
            }
        default:
            return state
    }
}