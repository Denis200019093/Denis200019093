import axios from 'axios'

import { 
    GET_USERS, 
    GET_LIKES,
    FAILURE_REQUEST,
    LIKE,
    UNLIKE,
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
        dispatch({ type: FAILURE_REQUEST, payload: true })
    }
}

export const like = (id, item, likes) => async dispatch => {
    try {
        const saveLikes = likes.concat(item) 

        await axios.patch(`${usersURL}/${id}`, {
            likes: [...saveLikes]
        })

        dispatch({ type: LIKE, payload: item })
    } catch(e) {
        alert('Вы сможете лайкнуть продукт только после авторизации!')
    }
}

export const unlike = (userId, itemId, likes) => async dispatch => {
    try {

        await axios.patch(`${usersURL}/${userId}`, {
            likes: [...likes.filter(item => item.id !== itemId) ]
     
        })

        dispatch({ type: UNLIKE, payload: itemId })
    } catch(e) {
        console.log(e);
    }
}
