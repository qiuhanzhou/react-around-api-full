import React from 'react'
import { useState } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import * as auth from '../utils/auth'
import Header from './Header'
import useForm from '../utils/useForm'

function Login({ handleLogin }) {
  // const [loginCredentials, setLoginCredentials] = useState({
  //   email: '',
  //   password: '',
  // })

  // const { email, password } = loginCredentials

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
  })

  const { email, password } = values

  const [error, setError] = useState(false)
  const history = useHistory()

  // function handleChange(e) {
  // const {value, name} = e.target;
  //   setLoginCredentials({ ...loginCredentials, [name]: value })
  // }

  function onLogin() {
    auth
      .authorize(email, password)
      .then((data) => {
        console.log(data)
        if (data.token) {
          setValues({ email: '', password: '' })
          handleLogin(email)
          //wait 3s and then redirect
          setTimeout(() => {
            history.push('/')
          }, 3000)
        } else {
          setError(true)
        }
      })
      .catch((err) => {
        if (err.statusCode === 400) {
          console.log('one or more of the fields were not provided')
        }
        if (err.statusCode === 401) {
          console.log('401 - the user with the specified email not found')
        }
        console.log('cannot log in')
        setError(true)
      })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) {
      return
    }
    onLogin()
  }

  function handleOnClick(e) {
    history.push('/signup')
  }

  return (
    <div className='auth'>
      <Header
        email=''
        buttonText='Sign up'
        loggedIn={false}
        onClick={handleOnClick}
      />
      <form autoComplete='off' onSubmit={handleSubmit} className='auth__form'>
        <h2 className='auth__form_title'>Log in</h2>
        <input
          autoComplete='new-password'
          className='auth__form_input'
          required
          placeholder='email'
          id='email'
          name='email'
          type='email'
          value={email}
          onChange={handleChange}
        />
        <input
          autoComplete='new-password'
          required
          className='auth__form_input'
          placeholder='password'
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={handleChange}
        />
        {error && (
          <div>
            Your email and password does not match our record. Try again!
          </div>
        )}
        <div className='auth__button-container'>
          <button type='submit' className='auth__button'>
            Log in
          </button>
        </div>
      </form>

      <div className='auth__redirect'>
        <p>
          Not a member yet? Sign up{' '}
          <Link to='/signup' className='auth__redirect_link'>
            here!
          </Link>
        </p>
      </div>
    </div>
  )
}

export default withRouter(Login)
