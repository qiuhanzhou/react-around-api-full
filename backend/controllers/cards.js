const NotFoundError = require('../errors/not-found-error')
const BadRequestError = require('../errors/bad-request-error')
const UnauthorizedError = require('../errors/unauthorized-error')
const ForbiddenError = require('../errors/forbidden-error')

const Card = require('../models/card')

// the getCards request handler - GET '/cards'
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next)
}

// the createCard request handler - POST '/cards'
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      console.log('creating card', card)
      return res.send({ data: card })
    })
    .catch(next)
}

// the deleteCard request handler
module.exports.deleteCard = (req, res, next) => {
  const currentUserId = req.user._id
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('No card found with that id')
    })
    .then((card) => {
      if (!card.owner.toString() === currentUserId) {
        throw new ForbiddenError("cannot delete another user's card")
      } else {
        Card.deleteOne(card).then(() => res.send({ data: card }))
      }
    })
    .catch(next)
}

const updateLikes = (req, res, method, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { [method]: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('No card found with that id')
    })
    .then((card) => res.send({ data: card }))
    .catch(next)
}

module.exports.likeCard = (req, res, next) =>
  updateLikes(req, res, '$addToSet', next)

module.exports.dislikeCard = (req, res, next) =>
  updateLikes(req, res, '$pull', next)
