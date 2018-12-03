const mongoose = require('mongoose')
const url = 'mongodb://admin:PASSUTAHAN@ds139341.mlab.com:39341/fullstack-open-eka'

mongoose.connect(url)


const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person
