const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" field must be filled in'],
    minlength: [2, 'The minimum length of the "name" filed is 2'],
    maxlength: [30, 'The maximum length of the "name" filed is 30'],
  },
  link: {
    type: String,
    required: [true, 'The "link" field must be filled in'],
    validate: {
      validator: (v) => /https?:\/\/(www)?.+/g.test(v),
      message: 'invalid url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create the model to interact with our collection of documents and export it
module.exports = mongoose.model('card', cardSchema);
