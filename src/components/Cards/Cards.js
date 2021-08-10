import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { renderCards, searchCards } from '../../redux/actions/cardsActions'
import CardItem from '../CardItem'
import Sidebar from '../Sidebar'

import './Cards.scss'

function Cards() {

    const dispatch = useDispatch()
    const state = useSelector(state => ({
        cards: state.cards.cards,
        filter: state.cards.filter,
        search: state.cards.search,
        searchType: state.cards.searchType
    }))

    const { cards, filter, search, searchType } = state

    useEffect(() => {
        dispatch(renderCards())
    }, [dispatch])

    const filterData = filter.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    const searchData = cards.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className='cards-list-wrapper'>
            <Sidebar/>
            <input onChange={e => dispatch(searchCards(e.target.value))} value={search} type='text' placeholder={`Search ${searchType}`}/>
            <div className='cards-lists'>
                {
                    filter.length ? filterData.map(item => ( 
                        <CardItem
                            key={item.id}
                            item={item}
                        />
                    ))

                    : 
                    
                    !searchData.length ?
                        <div>Device not found</div>
                    : 
                        searchData.map(item => (
                            <CardItem
                                key={item.id}
                                item={item}
                            />
                    ))
                }
            </div>
            
        </div>
    )
}

export default Cards
