import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux'

import { filterCards, searchType, clearFilter } from '../../redux/actions/cardsActions'

const btns = [
    {id: 1, title: 'Apple device', value: 'apple'},
    {id: 2, title: 'MI device', value: 'mi'},
    {id: 3, title: 'SUMSUNG device', value: 'sumsung'}
]

function Sidebar() {

    const [ activeBtn, setActivebtn ] = useState(0)

    const dispatch = useDispatch()

    return (
        <div className='filter-cards-block'>
            <Button 
                style={{
                    backgroundColor: activeBtn === 0 ? 'red' : '',
                    color: activeBtn === 0 ? '#fff' : ''
                }} 
                onClick={() => {
                    setActivebtn(0)
                    dispatch(clearFilter())
                    dispatch(searchType(''))
                }}
            >All</Button>
            {
                btns.map((item) => (
                    <Button style={{
                        backgroundColor: activeBtn === item.id ? 'red' : '',
                        color: activeBtn === item.id ? '#fff' : ''
                    }} onClick={() => {
                        setActivebtn(item.id) 
                        dispatch(filterCards(item.value))
                        dispatch(searchType(item.value))
                    }} color="secondary" key={item.id}>{item.title}</Button>
                ))
            }
        </div>
    )
}

export default Sidebar
