const mongoose = require('mongoose')
const logger = require('../utils/logger')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bot'
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => logger.info('Connected to Mongo'))
  .catch(e => logger.error('Error while trying to connect to Mongo', e))


module.exports = mongoose
