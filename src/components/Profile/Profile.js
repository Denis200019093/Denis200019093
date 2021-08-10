import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

import { openCart, closeCart } from '../../redux/actions/cartActions'
import { logOut } from '../../redux/actions/formActions'

import './Profile.scss'

function Profile() {

    const authUser = JSON.parse(localStorage.getItem('AUTH_USER'))
    const dispatch = useDispatch()
    const stateCart = useSelector(state => state.cart.openCart)
    const cart = useSelector(state => state.cart.cart)
    const loggedUser = useSelector(state => state.auth.loggedUser)
    // const auth = useSelector(state => state.auth.authUser)


    console.log(authUser);
    return (
        <div className='profile'>
            {
                
                authUser ?
                    <div className='profile-auth-user'>
                        <span>{authUser.name}</span>
                        <i className="fas fa-user"></i>
                        <div onClick={() => {
                            dispatch(logOut())
                            localStorage.removeItem('AUTH_USER')
                        }} className='profile-logOut'>Log out</div>
                    </div>
                : 
                    <div>Login</div>
                   
            }
            <Link onClick={() => dispatch(closeCart())} to={'/'}>
                <Button color='primary'>Home</Button>
            </Link>

            {
                stateCart ?
                    <Button onClick={() => dispatch(closeCart())} color='primary'>Close cart</Button>
                :
                    <Button className='open-cart-btn' onClick={() => dispatch(openCart())} color='primary'>
                        <div>{cart.length}</div>
                        Cart
                    </Button>
            }
     
            <Link onClick={() => dispatch(closeCart())} to={'/orders/'}>
                <Button color='primary'>Orders</Button>
            </Link>
            <Link onClick={() => dispatch(closeCart())} to={'/form/'}>
                <Button color='primary'>Auth</Button>
            </Link>

            
        </div>
    )
}

export default Profile
