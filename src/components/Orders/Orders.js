import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getOrders, loadOrderAfterScroll } from '../../redux/actions/ordersActions'

import './Order.scss'

function Orders() {

    const [ openOrder, setOpenOrder ] = useState(false)
    const [ indexToggle, setIndexToggle ] = useState()

    const dispatch = useDispatch()
    const state = useSelector(state => ({
        orders: state.orders.orders,
        fetching: state.orders.fetching,
        countOrderLoad: state.orders.countOrderLoad
    }))

    const { orders, fetching, countOrderLoad } = state

    useEffect(() => {
        if ( fetching ) {
            dispatch(getOrders(countOrderLoad))
        }
    }, [dispatch, fetching, countOrderLoad])


    useEffect(() => {
        const handleScroll = (e) => {
            if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 0) {  
                dispatch(loadOrderAfterScroll(countOrderLoad))
            }
        }

        if ( countOrderLoad > orders.length ) {
            return null
        } else {
            document.addEventListener('scroll', handleScroll)
        }

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [dispatch, countOrderLoad, orders.length])

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
                               
                                onClick={() => { 
                                    setOpenOrder(!openOrder)
                                    setIndexToggle(index)
                                }} 
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
                                style={{borderTop: indexToggle === index ? 'none' : 'block'}} 
                                className={ indexToggle === index ? 'order-item-body open-body' : 'order-item-body'}>
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
