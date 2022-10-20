// create the router
const router = require('express').Router()
const { validateCardBody } = require('../middlewares/validation')

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards')

router.get('/cards', getCards)
router.post('/cards', validateCardBody, createCard)
router.delete('/cards/:cardId', deleteCard)
router.put('/cards/:cardId/likes', likeCard)
router.delete('/cards/:cardId/likes', dislikeCard)

module.exports = router
