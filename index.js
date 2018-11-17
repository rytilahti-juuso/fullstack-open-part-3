const express = require('express')
const app= express()

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



app.get('/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Puhelinluettelossa on ${persons.length} henkilön tiedot</p>
    <p>${Date()}</p>
    `)
})

app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
    if(person){
      response.json(person)
    } else {
      response.status(404).end()
    }

})


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
