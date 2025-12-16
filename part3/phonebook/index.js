const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');
const person = require('./models/person');
const dotenv = require('dotenv').config()

//const Person = require('./models/person')

const app = express();

morgan.token('dataJson', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :dataJson'))
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send('health check')
})

// TODO
app.get('/api/info', (request, response) => {
    const now = new Date()
    //const infoText = "<p>Phonebook has info for " + String(personsData.length) + " people" + "\n" + now

    const infoText = `<p>Time ${now}</p>`
    
    response.send(infoText)
})

app.get('/api/persons', (request, response) => {
    //response.json(personsData)
    Person.find({}).then(persons=>{
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    //const person = personsData.find(p => p.id == id)

    Person.findById(id)
        .then(person => {
            if(!person) {
                console.log("no catch but no person either")
                return response.status(404).end("Person with that id DNE")
            }
            response.json(person)
        })
        .catch(e => {
            console.log(`There was en error while findin the person with id ${id}`)
        })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    //personsData = personsData.filter(p => p.id != id)
    Person.deleteOne({_id: id})
        .then(res => {
            if(res.deletedCount > 0){
                response.status(204).end("Person successfully deleted")
            }
            else{
                response.status(204).end(`Person with id ${id} does not exists`)
            }
        })
        .catch(e => console.log(e))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name || !body.number)
    {
        return response.status(404).json(
            {
                "error": "name or number is missing"
            }
        )
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save()
        .then(p => {
            response.json(p)
        })
        .catch(e => console.log(e))
    
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`we are live on http://localhost:${PORT}`))