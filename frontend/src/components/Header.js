import logo from '../images/logo.svg'
import { useHistory } from 'react-router-dom'

export default function Header({ email, buttonText, loggedIn, onClick }) {
  let history = useHistory()

  function onSignOut() {
    console.log('onSignOut ran')
    localStorage.removeItem('jwt')
    history.push('/signin')
    // window.location.reload()
  }
  return (
    <header className='header'>
      <img src={logo} alt='logo' className='header__logo' />
      <div className='header__user'>
        <div className='header__email '>{email}</div>

        {loggedIn && (
          <button className='header__button' onClick={onSignOut}>
            {buttonText}
          </button>
        )}

        {!loggedIn && (
          <button className='header__button_auth' onClick={onClick}>
            {buttonText}
          </button>
        )}
      </div>
    </header>
  )
}
