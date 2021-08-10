import React, {  } from 'react'
import { Route, Switch } from 'react-router-dom'

import Cards from '../Cards'
import Cart from '../Cart'
import Orders from '../Orders'
import Profile from '../Profile'
import Form from '../Form'

import './App.scss'

function App() {

    return (
        <div className='app'>
            <Profile/>
            <Cart/>
            <Switch>
                <Route exact path='/' component={Cards}/>
                <Route path='/orders' component={Orders}/>
                <Route path='/form' component={Form}/>
            </Switch>
        </div>
    )
}

export default App
