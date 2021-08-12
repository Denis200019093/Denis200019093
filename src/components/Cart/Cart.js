import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';

import './Cart.scss'

import { 
    renderCart, 
    removeFromCart,
    plusCartItem, 
    minusCartItem, 
    clearCart 
} from '../../redux/actions/cartActions'

import { confirmOrder } from '../../redux/actions/ordersActions'

function Cart() {

    const dispatch = useDispatch()
    const state = useSelector(state => ({
        cart: state.cart.cart,
        openCart: state.cart.openCart
    }))

    const { cart, openCart } = state

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('CART_SHOP'))

        dispatch(renderCart(cartData))
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('CART_SHOP', JSON.stringify(cart))
    }, [cart])

    const totalPrice = cart.reduce((sum, obj) => (obj.price * obj.count) + sum , 0)

    if ( openCart ) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "auto"
    }

    return (
        <div 
            // style={{display: openCart ? 'flex' : 'none'}} 
            className={openCart ? 'shop-cart' : 'close'}>
            {
                cart.length ?
                <div>
                    <div>
                        {
                            cart.map(item => (
                                <div key={item.id} className='cart-item-wrapper'>
                                    <div className='cart-item' >
                                        <div className='cart-item-title'>{item.title}</div>
                                        <div className='cart-item-countBlock'>
                                            <Button onClick={() => dispatch(plusCartItem(item.id))} color='primary'>+</Button>
                                            <span>{item.count}</span>
                                            <Button disabled={ item.count === 1 ? true : false } onClick={() => dispatch(minusCartItem(item.id))} color='primary'>-</Button>
                                        </div>
                                    
                                        <div>{item.price * item.count}</div>
                                        <span className='remove-item' onClick={() => dispatch(removeFromCart(item.id))}>&times;</span>
                                    </div>
                                </div>
                            
                            ))
                        }
                    </div>
                    <div className='confirm-order-wrapper'>
                        <div className='confirm-order'>
                            <Button onClick={() => dispatch(clearCart())}>Clear cart</Button>
                            <div className='confirm-order-block'>
                                <div className='shop-cart-totalPrice'>{cart.length ? totalPrice : ''}</div>
                                <Button onClick={() => {
                                    dispatch(confirmOrder(cart))
                                    dispatch(clearCart())
                                }}>Confirm order</Button>
                            </div>
                        
                        </div>
                    </div>
                </div>
            : 
                <div className='clear' style={{color: '#000', textAlign: 'center', fontSize: '28px'}}>пусто</div>
            }     
        </div>
    )
}

export default Cart
