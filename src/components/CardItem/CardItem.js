import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core';

import { addToCart } from '../../redux/actions/cartActions'
import { like, unlike, getUsers, getLikes } from '../../redux/actions/formActions'

function CardItem({item}) {

    const authUser = JSON.parse(localStorage.getItem('AUTH_USER') || '[]')

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(getLikes(authUser.id))
    }, [dispatch, authUser.id])

    
    const cart = useSelector(state => state.cart.cart)

    const checkUsers = useSelector(state => state.auth.users)
    const checkLikes = useSelector(state => state.auth.likes)

    const userasd = checkUsers.find(el => el.id === item.id)
    const likeasd = checkLikes.find(el => el.id === item.id)

    console.log(checkUsers);
    console.log(checkLikes);
    return (
        <div className='card-item' key={item.id}>
            <span>{item.likes}</span>
            <img src={item.img} alt='alt'/>
            <span>{item.title}</span>
            {/* <Button onClick={() => dispatch(like(authUser.id, item, checkLikes))}>Like</Button> */}

            <Button onClick={() => dispatch(unlike(likeasd.id, checkLikes))}>Unlike</Button>
            <Button onClick={() => dispatch(like(authUser.id, item, checkLikes))}>Like</Button>
            <Button 
                onClick={() => dispatch(addToCart(item))} 
                color="primary"
                disabled={cart && cart.find(el => el.title === item.title) ? true : false}
            >Add to cart</Button>
        </div>
    )
}

export default CardItem
