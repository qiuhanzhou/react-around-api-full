const router = require('express').Router()
const auth = require('../middlewares/auth')
const usersRouter = require('./users')
const cardsRouter = require('./cards')
const { createUser, login } = require('../controllers/users')
const {
  validateAuthentication,
  validateUserBody,
} = require('../middlewares/validation')
const NotFoundError = require('../errors/not-found-error')

router.post('/signup', validateUserBody, createUser)
router.post('/signin', validateAuthentication, login)

// All routes are protected with authorization, except for '/signup' and '/signin'
router.use(auth)
router.use('/', usersRouter)
router.use('/', cardsRouter)

router.use('*', (req, res, next) => {
  next(new NotFoundError('Requested resource not found'))
})

module.exports = router
