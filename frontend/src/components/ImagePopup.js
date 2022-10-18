import { useEffect, useRef } from 'react'

export default function ImagePopup(props) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (props.isOpen) {
      modalRef.current.focus()
    }
  }, [props.isOpen])

  return (
    <div
      className={`modal modal_type_image ${props.isOpen ? 'modal_open' : ''} 
    `}
      id='image-modal'
      onClick={props.onClose}
      onKeyDown={props.onClose}
      tabIndex='0'
      ref={modalRef}
    >
      <div className='modal__content modal__content_type_image'>
        <button
          type='button'
          aria-label='close'
          className='modal__close-button modal__close-button_type_image'
        ></button>
        <img
          className='modal__image'
          src={props.card.link}
          alt={props.card.name}
        />
        <p className='modal__caption'>{props.card.name}</p>
      </div>
    </div>
  )
}
