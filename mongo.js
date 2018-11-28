const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://admin:PASSUTAHAN@ds139341.mlab.com:39341/fullstack-open-eka'
mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if(process.argv.length === 4){
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
})
person
  .save()
  .then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })

}


if(process.argv.length === 2){
  Person
    .find({})
    .then(result=> {
      console.log("Puhelinluettelo")
      result.forEach(person => {
        console.log(person.name, " ", person.number)

        mongoose.connection.close()
      })
    })
}

else{
  console.log("Parametreja on väärä määrä")
  mongoose.connection.close()
}
//person
//  .save()
//  .then(response => {
//    console.log('person saved!')
//    mongoose.connection.close()
//  })
