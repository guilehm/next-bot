const mongoose = require('mongoose')


const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  msg: Object,
  dateAdded: {
    type: Date,
    default: Date.now,
  },
})

const Tag = mongoose.model('Tag', TagSchema)


module.exports = Tag
