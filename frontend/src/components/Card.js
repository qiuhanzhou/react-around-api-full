import { useContext } from 'react'
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext'

export default function Card(props) {
  //subscribe to current user context and retrieve current user id
  const { _id } = useContext(CurrentUserContext)

  // Checking if the current user is the owner of the current card
  const isOwn = props.card.owner === _id

  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some((id) => id === _id)

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_full' : ''
  }`

  function handleClick() {
    props.onCardClick(props.card)
  }
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className='card' id={props.card._id}>
      {isOwn && (
        <button
          type='button'
          aria-label='delete'
          className='card__close-button'
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className='card__image'
        src={props.card.link}
        onClick={handleClick}
        alt={props.card.name}
      />
      <div className='card__info'>
        <h2 className='card__title'>{props.card.name}</h2>
        <div className='card__likes'>
          <button
            type='button'
            aria-label='like'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className='card__like-count'>{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}
