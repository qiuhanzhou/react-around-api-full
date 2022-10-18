import { useEffect, useContext } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import useForm from '../utils/useForm'

export default function EditProfilePopup(props) {
  // const [name, setName] = useState('')
  // const [description, setDescription] = useState('')

  // Subscription to the context
  const currentUser = useContext(CurrentUserContext)

  // After loading the current user from the API
  // their data will be used in managed components.

  const { values, handleChange, setValues } = useForm({
    name: '',
    about: '',
  })

  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    })
  }, [currentUser, props.isOpen])

  // function handleChange(e) {
  //   if (e.target.name === 'name') {
  //     setName(e.target.value)
  //   } else {
  //     setDescription(e.target.value)
  //   }
  // }

  const { name, about } = values

  function handleSubmit(e) {
    e.preventDefault()

    // Pass the values of the managed components to the external handler
    props.onUpdateUser({
      name,
      about,
    })
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title='Edit profile'
      name='edit'
      buttonText={props.isLoading ? 'Saving...' : 'Save'}
      onSubmit={handleSubmit}
    >
      <label className='modal__form-field'>
        <input
          name='name'
          type='text'
          value={name || ''}
          onChange={handleChange}
          className='modal__input'
          id='name-input'
          placeholder='Your name'
          required
          minLength='2'
          maxLength='40'
        />
        <span className='modal__error name-input-error'></span>
      </label>

      <label className='modal__form-field'>
        <input
          name='about'
          type='text'
          value={about || ''}
          onChange={handleChange}
          className='modal__input'
          id='about-input'
          placeholder='About you'
          required
          minLength='2'
          maxLength='200'
        />
        <span className='modal__error about-input-error'></span>
      </label>
    </PopupWithForm>
  )
}
