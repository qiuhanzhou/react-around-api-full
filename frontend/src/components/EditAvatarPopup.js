import { useRef } from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const inputRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()
    // Pass the latest values of the input ref (uncontrolled component) to the external handler
    onUpdateAvatar({
      avatar: inputRef.current.value,
    })
  }

  return (
    <PopupWithForm
      name='update-avatar'
      title='Update profile picture'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Saving...' : 'Save'}
      onSubmit={handleSubmit}
    >
      <label className='modal__form-field'>
        <input
          name='url'
          type='url'
          className='modal__input'
          placeholder='Image link of the new avatar'
          id='link-input'
          required
          ref={inputRef}
        />
        <span className='modal__error link-input-error'></span>
      </label>
    </PopupWithForm>
  )
}
