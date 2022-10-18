import { Link, withRouter, useHistory } from 'react-router-dom'
import Header from './Header'

import useForm from '../utils/useForm'

function Register({ handleOnRegisterSubmit }) {
  // const [signinCredentials, setSigninCredentials] = useState({
  //   email: '',
  //   password: '',
  // })

  // const { email, password } = signinCredentials

  const history = useHistory()

  // function handleChange(e) {
  //   const { name, value } = e.target
  //   console.log(name, value)
  //   setSigninCredentials({ ...signinCredentials, [name]: value })
  // }

  const { values, handleChange } = useForm({
    email: '',
    password: '',
  })
  const { email, password } = values

  function handleOnClick() {
    history.push('/signin')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (email && password) {
      handleOnRegisterSubmit(password, email)
    }
  }
  return (
    <div className='auth'>
      <Header
        email=''
        buttonText='Log in'
        loggedIn={false}
        onClick={handleOnClick}
      />
      <form onSubmit={handleSubmit} className='auth__form'>
        <h2 className='auth__form_title'>Sign up</h2>
        <input
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
          required
          className='auth__form_input'
          placeholder='password'
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={handleChange}
        />
        <div className='auth__button-container'>
          <button type='submit' className='auth__button'>
            Sign up{' '}
          </button>
        </div>
      </form>

      <div className='auth__redirect'>
        <p>
          Already a member? Log in{' '}
          <Link to='/signin' className='auth__redirect_link'>
            here!
          </Link>
        </p>
      </div>
    </div>
  )
}

export default withRouter(Register)
