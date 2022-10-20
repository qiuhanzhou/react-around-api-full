require('dotenv').config()

const { PORT = 3001, NODE_ENV, JWT_SECRET } = process.env
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const { errors } = require('celebrate')
const cors = require('cors')
const routes = require('./routes')
const { requestLogger, errorLogger } = require('./middlewares/logger')

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
app.options('*', cors()) // enable requests for all routes

// enable cross domain visits from allowed origins
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'https://aroundtheus-timothyrusso.students.nomoreparties.sbs',
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
  next()
})

// REMEMBER: REMOVE AFTER PASS REVIEW
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now')
  }, 0)
})

app.use(requestLogger) // enabling the request logger

app.use(routes)

app.use(errorLogger) // enabling the error logger

app.use(errors()) // celebrate error handler

// to serve static files that are in the public directory - ie. http://localhost:3000/kitten.jpg
// app.use(express.static(path.join(__dirname, 'public')))

// centralized error handler
app.use((err, req, res, next) => {
  // if an error has no status, display 500
  const { statusCode = 500, message } = err
  res.status(statusCode).send({
    // check the status and display a message based on it
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
