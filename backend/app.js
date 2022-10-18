require('dotenv').config()

const { PORT = 3001, NODE_ENV, JWT_SECRET } = process.env
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const auth = require('./middlewares/auth')
const { createUser, login } = require('./controllers/users')
const {
  validateUserBody,
  validateAuthentication,
} = require('./middlewares/validation')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const { celebrate, Joi, errors, Segments } = require('celebrate')
var cors = require('cors')

const usersRouter = require('./routes/users')
const cardRouter = require('./routes/cards')

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/aroundb', {
  useNewUrlParser: true,
})

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// continue on to use router that does not match public folder thru '/'

// include these before other routes
app.use(cors())
app.options('*', cors()) //enable requests for all routes

//enable cross domain visits from allowed origins
app.use((req, res, next) => {
  const allowedCors = [
    'https://loveali.students.nomoredomainssbs.ru',
    'http://localhost:3000',
  ]

  const { origin } = req.headers // saving the request source to the 'origin' variable
  // checking that the source of the request is mentioned in the list of allowed ones
  if (allowedCors.includes(origin)) {
    // setting a header that allows the browser to make requests from this source
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { method } = req // Saving the request type (HTTP method) to the corresponding variable

  // Default value for Access-Control-Allow-Methods header (all request types are allowed)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'

  // If this is a preliminary request, add the required headers
  if (method === 'OPTIONS') {
    // allowing cross-domain requests of any type (default)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS)
  }

  const requestHeaders = req.headers['access-control-request-headers']
  if (method === 'OPTIONS') {
    // allowing cross-domain requests with these headers
    res.header('Access-Control-Allow-Headers', requestHeaders)
    // finish processing the request and return the result to the client
    return res.end()
  }

  next()
})

// REMEMBER: REMOVE AFTER PASS REVIEW
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now')
  }, 0)
})

app.use(requestLogger) // enabling the request logger

// followed by all route handlers
app.post('/signup', validateUserBody, createUser)
app.post('/signin', validateAuthentication, login)

//All routes are protected with authorization, except for '/signup' and '/signin'
app.use(auth)

app.use('/', usersRouter)
app.use('/', cardRouter)

app.use(errorLogger) // enabling the error logger

app.use(errors()) // celebrate error handler

// centralized error handler
app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err
  res.status(statusCode).send({
    // check the status and display a message based on it
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  })
})

// to serve static files that are in the public directory - ie. http://localhost:3000/kitten.jpg
// app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
