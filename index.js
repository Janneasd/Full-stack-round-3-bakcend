const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
const cors = require('cors')
app.use(cors())



let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "040-123456"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "040-123456"
    },
    {
    id: 4,
    name: "Mary Poppendick",
    number: "040-123456"
    }
  ]
 

  app.use(morgan('tiny'))
  

  morgan.token('body', (req, res) => JSON.stringify(req.body));
  app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

  app.use(express.static('build'))

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (req,res) => {
      const id = Number(req.params.id)
      var person = persons.find(person => person.id === id)
      res.send(person)
  })

  app.get('/info', (req, res) => {
    var date = new Date()
    res.send(`<h1>Phonebook has info for ${persons.length} people</h1>` + date)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const person = request.body
    var max = 100
   if (person.name || person.number === undefined) {
    return response.status(400).json({ 
        error: 'content missing' 
      })
   }
   if(persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
        error: 'name must be unique' 
      })
   }
    person.id =  Math.floor(Math.random() * max)
    persons = persons.concat(person)
 
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })