import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@material-ui/core';

import { 
    getUsers,

    userNickname, 
    userEmail, 
    userPassword,  

    correctNicknameFunc,
    errorNickNameFunc,

    correctEmailFunc, 
    errorEmailFunc,

    correctPasswordFunc,
    errorPasswordFunc,

    formValidFunc,
    whatFormFunc,

    signUp,
    signIn,
    logOut
} from '../../redux/actions/formActions'

import './Form.scss'

function Form() {

    const dispatch = useDispatch()
    const state = useSelector(state => ({
        users: state.auth.users,
        // Info about the user
        nickName: state.auth.nickName,
        email: state.auth.email,
        password: state.auth.password,
        // Validation nickname
        correntNickName: state.auth.correntNickName,
        errorNickNameMessage: state.auth.errorNickNameMessage,
        // Validation email
        correntEmail: state.auth.correntEmail,
        errorEmailMessage: state.auth.errorEmailMessage,
        // Validation password
        correntPassword: state.auth.correntPassword,
        errorPasswordMessage: state.auth.errorPasswordMessage,

        // Form valid
        formValid: state.auth.formValid,
        formSignUp: state.auth.formSignUp
    }))

    const { 
        users, 

        nickName,
        email, 
        password, 

        correntNickName,
        errorNickNameMessage,

        correntEmail, 
        errorEmailMessage,

        correntPassword,
        errorPasswordMessage,

        formValid,
        formSignUp
    } = state

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
   
    useEffect(() => {
        if ( correntNickName && correntEmail && correntPassword ) {
            dispatch(formValidFunc(false))
        } else {
            dispatch(formValidFunc(true))
        }
        
    }, [correntNickName, correntEmail, correntPassword, dispatch])

    const useInput = initialValue => {
        const [ value, setValue ] = useState(initialValue)
        const [ isDirty, setDirty ] = useState(initialValue)

        const onChange = e => {
            setValue(e.target.value)
        }

        const onBLur = e => {

        }


        return {

        }
    }

    const nickNameHandler = e => {
        dispatch(userNickname(e.target.value))

        const nicknameValidation = /^[a-z0-9_-]{3,16}$/

        if ( !nicknameValidation.test(String(e.target.value).toLowerCase()) ) {
            dispatch(errorNickNameFunc('Длина никнейма 3-16 символов'))
            dispatch(correctNicknameFunc(false))
        } else {
            dispatch(errorNickNameFunc('Nickname'))    
            dispatch(correctNicknameFunc(true))
        }

    }

    const emailHandler = e => {
        dispatch(userEmail(e.target.value))

        const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( !emailValidation.test(String(e.target.value).toLowerCase()) ) {
            dispatch(errorEmailFunc('Некорректный емейл'))
            dispatch(correctEmailFunc(false))
        } else {
            dispatch(errorEmailFunc('Email'))    
            dispatch(correctEmailFunc(true))
        }
    }
    
    const passwordHandler = e => {
        dispatch(userPassword(e.target.value))

        const passwordValidation = /^[a-z0-9_-]{3,16}$/

        if ( !passwordValidation.test(String(e.target.value).toLowerCase()) ) {
            dispatch(errorPasswordFunc('Некорректный пароль'))
            dispatch(correctPasswordFunc(false))
        } else {
            dispatch(errorPasswordFunc('Password'))    
            dispatch(correctPasswordFunc(true))
        }
    }

    const submitHandlerSignUp = e => {
        e.preventDefault()

        dispatch(signUp( nickName, email, password ))
    }
    
    const authUser = JSON.parse(localStorage.getItem('AUTH_USER'))

    const submitHandlerSignIn = e => {
        e.preventDefault()
        
        const user = users.find(item => item.email === email)
        
        if ( user ) {
            localStorage.setItem('AUTH_USER', JSON.stringify(user))
            dispatch(signIn())
        } else {
            dispatch(logOut())
            alert('Неверно')
        }
    }
    
    return (
        <div className='form-page'>
            <Button onClick={() => dispatch(whatFormFunc(false))}>Sign up</Button>
            <Button disabled={authUser ? true : false} onClick={() => dispatch(whatFormFunc(true))}>Sign in</Button>
            {
                formSignUp ?
                
                // Sign in 
                <form onSubmit={submitHandlerSignIn} className='form-signIn'>
                    {/* Sign in email*/}
                    <div className='form-fignIn-input-email'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            onChange={emailHandler} 
                            value={email} 
                            name='email'
                            type='email'/>
                    </div>
                    {/* Sign in password*/}
                    <div className='form-fignIn-input-password'>
                        <label>Password</label>
                        <input 
                            onChange={passwordHandler}
                            value={password}
                            name='password'
                            type='password'/>
                    </div>
                    <Button disabled={!email || !password} variant="contained" type='submit' color='primary'>Sign in</Button>
                </form>
            : 
            // SIgn up
                <form onSubmit={submitHandlerSignUp} className='form-signUp'>
                    {/* Sign up nickname */}
                    <div className='form-fignUp-input-name'>
                        <label htmlFor='nickname'>
                            { 'Nickname' && <div>{errorNickNameMessage}</div>}
                        </label>   
                        <input 
                            onChange={nickNameHandler}
                            name='nickname' 
                            value={nickName} 
                            type='text'/>
                    </div>
                    {/* Sign up email */}
                    <div className='form-fignUp-input-email'>
                        <label htmlFor='email'>
                            { 'Email' && <div>{errorEmailMessage}</div>}
                        </label>
                        <input 
                            onChange={emailHandler}
                            name='email' 
                            value={email}  
                            type='email'/>
                    </div>
                    {/* Sign up password */}
                    <div className='form-fignUp-input-password'>
                        <label htmlFor='password'>
                            { 'Password' && <div>{errorPasswordMessage}</div>}
                        </label>
                        <input 
                            onChange={passwordHandler}
                            name='password'
                            value={password} 
                            type='password'/>
                    </div>
                    <Button disabled={formValid}  type='submit' variant="contained" color='primary'>Sign up</Button>
        
                </form>
            }
            
            
        </div>
    )
}

export default Form
