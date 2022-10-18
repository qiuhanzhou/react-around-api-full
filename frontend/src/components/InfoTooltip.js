import { useEffect, useRef } from 'react'

export default function InfoTooltip(props) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (props.isOpen) {
      modalRef.current.focus()
    }
  }, [props.isOpen])

  return (
    <div
      className={`modal modal__tooltip ${props.isOpen ? 'modal_open' : ''} 
    `}
      onClick={props.onClose}
      onKeyDown={props.onClose}
      tabIndex='0'
      ref={modalRef}
    >
      <div
        className='modal__content modal__content_type_tooltip
      '
      >
        <button
          type='button'
          aria-label='close'
          className='modal__close-button modal__close-button_type_image'
        ></button>
        <img
          className='modal__tooltip-img'
          src={props.iconSrc}
          alt={props.iconSrc}
        />
        <p className='modal__message'>{props.message}</p>
      </div>
    </div>
  )
}
