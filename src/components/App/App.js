import React, {  } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Container } from 'react-bootstrap'
import Cards from '../Cards'
import Cart from '../Cart'
import Orders from '../Orders'
import Profile from '../Profile'
import Form from '../Form'

import './App.scss'

const routes = [
    {path: '/', Component: Cards},
    {path: '/orders', Component: Orders},
    {path: '/form', Component: Form}
]

function App() {

    return (
        <div className='app'>
            <Profile/>
            <Cart/>
                {routes.map(({path, Component}) => 
                    <Route key={path} exact path={path}>
                        {({match}) => 
                            <CSSTransition
                            timeout={1000}
                            classNames='page'
                            unmountOnExit
                            in={match !== null}
                            >
                            <div className='page'>
                                <Component/>
                            </div>
                            </CSSTransition>
                        }
                    </Route>
                )}
                



                {/* <Route exact path='/' component={Cards}/>
    
                <Route path='/orders' component={Orders}/>
    
                <Route path='/form' component={Form}/>
     */}
            {/* <Switch>
       
                <Route exact path='/' component={Cards}/>
    
                <Route path='/orders' component={Orders}/>
    
                <Route path='/form' component={Form}/>
    
            </Switch> */}
        </div>
    )
}

export default App
