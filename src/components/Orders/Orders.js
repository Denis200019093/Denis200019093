import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getOrders } from '../../redux/actions/cartActions'

import './Order.scss'

function Orders() {

    const [ openOrder, setOpenOrder ] = useState()
    const dispatch = useDispatch()
    const state = useSelector(state => ({
        orders: state.cart.orders
    }))

    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])

    const { orders } = state
    console.log(orders);

    let date = new Date();

    return (
        <div className='order-page'>
            {
                !orders.length ?
                    <div>No orders yet</div>
                :
                orders.map((item, index) => {

                    const totalPrice = item.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)

                    return (
                        <div className='order-page-items' key={index}>
                            <div 
                                style={{
                                    borderBottom: openOrder === index ? 'none' : '1px solid #000',
                                }} 
                                onClick={() => setOpenOrder(index)} 
                                className='order-item-header'>
                                <div className='order-header-status'>Status</div>
                                <div className='order-header-total'>
                                    <span>Sum order</span>
                                    <div>{totalPrice}</div>
                                </div>
                                
                                <div className='order-header-content'>
                                    {
                                        item.items.map((el, index) => (
                                            <div className='item-header' key={index}>
                                                <div className='item-header-img'>
                                                    <img src={el.img} alt='alt'/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div 
                                style={{borderTop: openOrder === index ? 'none' : 'block'}} 
                                className={openOrder === index ? 'order-item-body open-body' : 'order-item-body'}>
                                <div className='order-body-content'>
                                    {
                                        item.items.map((el, index) => (
                                            <div className='item-body' key={index}>
                                                <div className='item-body-title'>
                                                    <div>{el.title}</div>
                                                    <img src={el.img} alt='alt'/>
                                                </div>
                                                <div className='item-body-price'>
                                                    <span>Price</span>
                                                    <div>{el.price}</div>
                                                </div>
                                                <div className='item-body-count'>
                                                    <span>Count</span>
                                                    <div>{el.count}</div>
                                                </div>
                                                <div className='item-body-count'>
                                                    <span>Sum</span>
                                                    <div>{el.price * el.count}</div>
                                                </div>
                                                
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Orders
