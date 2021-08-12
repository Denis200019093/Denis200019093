import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core';

import { addToCart } from '../../redux/actions/cartActions'
import { getUsers, getLikes, like, unlike } from '../../redux/actions/userActions'

function CardItem({item}) {

    const authUserLS = JSON.parse(localStorage.getItem('AUTH_USER') || '[]')

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(getLikes(authUserLS.id))
    }, [dispatch, authUserLS.id])

    
    const cart = useSelector(state => state.cart.cart)

    const checkUsers = useSelector(state => state.users.users)
    const checkLikes = useSelector(state => state.users.likes)

    const userasd = checkUsers.find(el => el.title === item.title)
    const likeasd = checkLikes.find(el => el.title === item.title)

    return (
        <div className='card-item' key={item.id}>
            <div className='card-item-content'>
                <span>{item.title}</span>
                <img src={item.img} alt='alt'/>
            </div>
            
            {
                userasd !== likeasd ?
                    <Button onClick={() => dispatch(unlike(authUserLS.id, likeasd.id, checkLikes))}>Unlike</Button>
                :
                    <Button onClick={() => dispatch(like(authUserLS.id, item, checkLikes))}>Like</Button>
            }

            <Button 
                onClick={() => dispatch(addToCart(item))} 
                color="primary"
                disabled={cart && cart.find(el => el.title === item.title) ? true : false}
            >Add to cart</Button>
        </div>
    )
}

export default CardItem
