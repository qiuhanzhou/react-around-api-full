const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { NODE_ENV, JWT_SECRET } = process.env

const User = require('../models/user')
const ConflictError = require('../errors/conflict-error')
const BadRequestError = require('../errors/bad-request-error')
const NotFoundError = require('../errors/not-found-error')
const UnauthorizedError = require('../errors/unauthorized-error')

// the login request handler - POST /signin
module.exports.login = (req, res, next) => {
  const { email, password } = req.body
  //only return found user with matching password
  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log('POST /signin findUserByCredentials')
      console.log(user)
      // we're generating a token
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        },
      )

      // we return the token
      res.send({ data: user, token })
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'))
    })
}

// the createUser request handler - POST /signup
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          'The user with the provided email already exists',
        )
      } else {
        return bcrypt
          .hash(password, 10)
          .then((hash) => {
            return User.create({
              name,
              about,
              avatar,
              email,
              password: hash, // adding the hash to the database
            })
          })
          .then((user) => res.status(201).send(user))
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(', ')}`,
          ),
        )
      } else {
        next(err)
      }
    })
}

// the getUsers request handler - GET /users
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next)
}

// the getCurrentUser request handler - GET /users/:id AND GET /users/me
const getUserData = (id, res, next) => {
  User.findById(id)
    //the orFail() query helper makes the query promise reject if no documents matched the query conditions
    .orFail(() => {
      //throw an error so .catch handles it
      throw new NotFoundError('User ID not found')
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch(next)
}

// GET /users/:id
module.exports.getUserById = (req, res, next) => {
  console.log('GET /users/:id')
  getUserData(req.params.id, res, next)
}

// GET /users/me
module.exports.getCurrentUser = (req, res, next) => {
  console.log('GET /users/me', req.user)
  getUserData(req.user._id, res, next)
}

// the updateUserProfile request handler - PATCH /users/me  AND  PATCH '/users/me/avatar'
const updateUserProfile = (req, res, next) => {
  const { name, about, avatar } = req.body
  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true,
    },
  )
    .orFail(() => {
      new NotFoundError('User ID not found')
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch(next)
}

// PATCH /users/me
module.exports.updateUserInfo = (req, res, next) => {
  updateUserProfile(req, res, next)
}
//PATCH '/users/me/avatar'
module.exports.updateUserAvatar = (req, res, next) => {
  updateUserProfile(req, res, next)
}
