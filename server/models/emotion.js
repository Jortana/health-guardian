const mongoose = require('mongoose')

const emotionSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  emotion: {
    type: String,
    required: true
  }
})

module.exports = emotionSchema
