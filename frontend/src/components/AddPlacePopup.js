import PopupWithForm from './PopupWithForm'
import useForm from '../utils/useForm'

export default function AddPlacePopup(props) {
  // const [title, setTitle] = useState('')
  // const [url, setLink] = useState('')

  const { values, handleChange } = useForm({
    title: '',
    url: '',
  })

  const { title, url } = values

  function handleSubmit(e) {
    e.preventDefault()
    console.log('add card submit')
    // Pass the latest input value (controlled component) to the external handler
    props.onAddPlaceSubmit({ name: title, link: url })
  }

  // function handleChange(e) {
  //   if (e.target.name === 'title') {
  //     setTitle(e.target.value)
  //   } else {
  //     setLink(e.target.value)
  //   }
  // }

  return (
    <PopupWithForm
      name='add-card'
      title='New Place'
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.isLoading ? 'Creating...' : 'Create'}
      onSubmit={handleSubmit}
    >
      <label className='modal__form-field'>
        <input
          name='title'
          type='text'
          className='modal__input'
          id='title-input'
          placeholder='Title of the new place'
          required
          minLength='1'
          maxLength='30'
          onChange={handleChange}
          value={title}
        />
        <span className='modal__error title-input-error'></span>
      </label>

      <label className='modal__form-field'>
        <input
          name='url'
          type='url'
          className='modal__input'
          placeholder='Image link of the new place'
          id='url-input'
          required
          onChange={handleChange}
          value={url}
        />
        <span className='modal__error url-input-error'></span>
      </label>
    </PopupWithForm>
  )
}
