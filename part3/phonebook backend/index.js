require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./mongo')
const app = express()

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

morgan.token('data',(request,response) => {
  return request.body['data']
})

app.use(morgan(function(tokens,request,response) {
  let result = [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms'
  ]
  if (tokens.method(request,response) === 'POST') {
    result = result.concat(JSON.stringify(request.body))
  }
  return result.join(' ')
}))

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// let persons = 
// [
//     {
//       "id": 1,
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]


app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person.name,person.number)
      })
      response.json(result)
    })
})

app.get('/info', (request, response) => {
    const time = new Date()

    Person.countDocuments().then(result => {
      response.send(`<p>Phonebook has info for ${result} people</p>
    <p>${time}</p>`)
    })
  })
  
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id).then(result => {
    if (result) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.deleteOne({_id: id}).then(result => {
      console.log('User deleted')
    })
    .catch(error => next(error))
})

const generateId = () => {
  const maxId = Person.length > 0
    ? Math.floor(Math.random() * 100000)
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    number: body.number,
    id: generateId(),
    name: body.name
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = new Person({
    number: body.number,
    id: generateId(),
    name: body.name
  })
  
  Person.findByIdAndUpdate(id, person, {new:true})
  .then(updatedPerson => {
    if (updatedPerson) {
      response.json(updatedPerson)
    } else {
      
    }
  })
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })