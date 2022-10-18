import { useContext } from 'react'
import editAvatarIcon from '../images/EditButton.svg'
import Card from './Card'
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext'

export default function Main(props) {
  const { name, about, avatar } = useContext(CurrentUserContext)

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__avatar-wrapper'>
          <img className='profile__avatar' src={avatar} alt='profile avatar' />
          <img
            className='profile__edit-icon'
            src={editAvatarIcon}
            alt='profile edit icon'
            onClick={props.onEditAvatarClick}
          />
        </div>
        <div className='profile__info'>
          <h1 className='profile__name'>{name}</h1>
          <button
            type='button'
            aria-label='edit'
            className='profile__edit-button'
            onClick={props.onEditProfileClick}
          ></button>
          <p className='profile__title'>{about}</p>
        </div>
        <button
          type='button'
          aria-label='add'
          className='profile__add-button'
          onClick={props.onAddPlaceClick}
        ></button>
      </section>

      <section className='places'>
        <ul className='elements-grid cards-container'>
          {props.cards.map((item) => (
            <Card
              card={item}
              key={item._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
