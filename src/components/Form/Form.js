import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';

import { useInput } from '../../hooks/validationForm'

import { getUsers } from '../../redux/actions/userActions'
import { signUp, signIn, logOut, toggleFormFunc } from '../../redux/actions/formActions'

import './Form.scss'

function Form() {

    const dispatch = useDispatch()
    const state = useSelector(state => ({
        users: state.users.users,
        toggleForm: state.auth.toggleForm
    }))

    const { users, toggleForm } = state

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch]) 
    
    const authUserLS = JSON.parse(localStorage.getItem('AUTH_USER'))

    const nickname = useInput('', { isEmpty: true, minLength: 3, maxLength: 16 })
    const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true })
    const password = useInput('', { isEmpty: true, minLength: 3, maxLength: 16 })

    const submitHandlerSignIn = e => {
        // e.preventDefault()
        
        const user = users.find(item => item.email === email.value)
        
        if ( user ) {
            localStorage.setItem('AUTH_USER', JSON.stringify({...user, logged: true}))
            dispatch(signIn())
        } else {
            dispatch(logOut())
            alert('Неверно')
        }
    }

    const submitHandlerSignUp = e => {
        // e.preventDefault()

        dispatch(signUp( nickname.value, email.value, password.value ))

    }

    // validation of forms to be in the folder hooks/validations.js
    return (
        <div className='form-page'>
            <Button onClick={() => dispatch(toggleFormFunc(false))}>Sign up</Button>
            <Button disabled={authUserLS ? true : false} onClick={() => dispatch(toggleFormFunc(true))}>Sign in</Button>
            {
                toggleForm ?
                
                // Sign in 
                <form onSubmit={submitHandlerSignIn} className='form-signIn'>
                    {/* Sign in email*/}
                    <div className='form-fignIn-input-email'>
                        <label htmlFor='email'>
                            Email
                        </label>
                        <input 
                            onChange={e => email.onChange(e)} 
                            onBlur={e => email.onBlur(e)}
                            value={email.value} 
                            name='email'
                            type='email'
                        />
                    </div>
                    {/* Sign in password*/}
                    <div className='form-fignIn-input-password'>
                        <label htmlFor='password'>
                            Password
                        </label>
                        <input 
                            onChange={e => password.onChange(e)}
                            onBlur={e => password.onBlur(e)}
                            value={password.value}
                            name='password'
                            type='password'
                        />
                    </div>
                    <Button disabled={ !email.inputValid || !password.inputValid } variant="contained" type='submit' color='primary'>Sign in</Button>
                </form>
            : 
            // SIgn up
                <form onSubmit={submitHandlerSignUp} className='form-signUp'>
                    {/* Sign up nickname */}
                    <div className='form-fignUp-input-name'>
                        <label htmlFor='nickname'>
                            {(nickname.isDirty && nickname.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                            {(nickname.isDirty && nickname.minLengthError) && <div style={{color: 'red'}}>Слишком короткий никнейм</div>}
                            {(nickname.isDirty && nickname.maxLengthError) && <div style={{color: 'red'}}>Слишком длинный никнейм</div>}
                        </label>   
                        <input 
                            onChange={e => nickname.onChange(e)} 
                            onBlur={e => nickname.onBlur(e)}
                            value={nickname.value} 
                            name='nnickname'
                            type='text'/>
                            
                    </div>
                    {/* Sign up email */}
                    <div className='form-fignUp-input-email'>
                        <label htmlFor='email'>
                            {(email.isDirty && email.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                            {(email.isDirty && email.minLengthError) && <div style={{color: 'red'}}>Неккоректная длина</div>}
                            {(email.isDirty && email.emailError) && <div style={{color: 'red'}}>Неккоректный емейл</div>}
                        </label>
                        <input 
                            onChange={e => email.onChange(e)} 
                            onBlur={e => email.onBlur(e)}
                            value={email.value} 
                            name='email'
                            type='email'/>
                    </div>
                    {/* Sign up password */}
                    <div className='form-fignUp-input-password'>
                         <label htmlFor='password'>
                            {(password.isDirty && password.isEmpty) && <div style={{color: 'red'}}>Поле не может быть пустым</div>}
                            {(password.isDirty && password.maxLengthError) && <div style={{color: 'red'}}>Слишком длинный пароль</div>}
                            {(password.isDirty && password.minLengthError) && <div style={{color: 'red'}}>Неккоректная длина</div>}
                        </label>
                        <input 
                            onChange={e => password.onChange(e)}
                            onBlur={e => password.onBlur(e)}
                            value={password.value}
                            name='password'
                            type='password'/>
                    </div>
                    <Button disabled={ !nickname.inputValid || !email.inputValid || !password.inputValid} type='submit' variant="contained" color='primary'>Sign up</Button>
        
                </form>
            }       
        </div>
    )
}

export default Form
