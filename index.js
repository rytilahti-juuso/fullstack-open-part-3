const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app= express()
const bodyParser = require('body-parser')



app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

const Person = require('./models/person')

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  },
]



app.get('/api/persons', (req, res) => {
  Person
      .find({})
      .then(persons => {

        res.json(persons.map(formatPerson))
      })
})

app.get('/api/notes', (request, response) => {
  Note
    .find({})
    .then(persons => {
      response.json(persons)
    })
})


app.get('/api/info', (req, res) => {
  res.send(`
    <p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p>
    <p>${Date()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
    if(person){
      response.json(person)
    } else {
      response.status(404).end()
    }

})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(body.name === undefined){
    return response.status(400).json({error: 'name missing'})
  }

  if(body.number === undefined){
    return response.status(400).json({error: 'number missing'})
  }
  if(persons.find( person => person.name === body.name) !== undefined){
    return response.status(400).json({error: 'Name must be unique'})
  }

  const person = new Person( {
    name: body.name,
    number: body.number,
    id: generateId()
  })
  person
    .save()
    .then(SavedPerson =>{
      response.json(formatPerson(SavedPerson))
    })
})

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

app.delete('/api/persons/:id', (request, response) => {
//  const id = Number(request.params.id)
//  persons = persons.filter(person => person.id !== id)
//  console.log(persons

Person
  .findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => {
    response.status(400).send({ error: 'malformatted id' })
  })
})

const generateId = () => {
  return Math.floor(Math.random() * 10000) + 8;
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
