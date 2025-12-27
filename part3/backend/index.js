require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

const PORT = process.env.PORT 

app.use(express.json())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  //response.json(notes)
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  console.log(id)
  // const note = notes.find(note => note.id === id)
  // if(note)
  // {
  //   response.json(note)
  // }
  // else{
  //   response.status(404).end()
  // }
  Note.findById(id).then(note => {
    if(note){
      response.json(note)
    }
    else{
      response.status(404).end()
    }
  })
  .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

function generateId() {
  const maxId = notes.length > 0
    ? Math.max(notes.map(note => note.id).reduce((acc, cur) => acc > cur ? acc : cur, 0))
    : 0
  console.log("Current maxId in the notes are found",maxId)

  return String(maxId+1)
}

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (!body.content){
    return response.status(400).json({
      "error": "Content is missing"
    })
  }
  //const note = {
  //  content: body.content,
  //  important: body.important || false,
  //  id: generateId(),
  //}
  //notes = notes.concat(note)

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  note.save()
    .then(savedNote => {
      response.json(savedNote) // response is only send when succeed
    })
    .catch(error => next(error)) // if someone breaks our validation then we catch that error
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError') {
    return response.status(400).send( { error: error.message})
  }

  next(error) // ex 3.21 is done :)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})