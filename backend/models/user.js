const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'invalid url',
    },
  },
  email: {
    type: String,
    required: [true, 'The "email" field must be filled in'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'invalid email',
    },
  },
  //the password field has no length limit, since it's stored in hash
  password: {
    type: String,
    required: [true, 'The "password" field must be filled in'],
    select: false,
  },
})

// adding the findUserByCredentials methods to the User schema, used when login
userSchema.statics.findUserByCredentials = function (email, password) {
  // trying to find the user by email
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'))
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'))
        }

        return user // now user is available
      })
    })
}

userSchema.methods.returnUserWithoutPassword = function () {
  //used in mongoose to change documents to an object
  const obj = this.toObject()
  const { password, ...user } = obj
  return user
}

// create the model which allows us to interact with our collection of documents and export it
module.exports = mongoose.model('user', userSchema)
