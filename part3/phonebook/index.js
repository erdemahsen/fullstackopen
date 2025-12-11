const express = require('express');
const app = express();

let personsData = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('health check')
})

app.get('/api/persons', (request, response) => {
    response.json(personsData)
})

app.get('/api/info', (request, response) => {
    const now = new Date()
    //const infoText = "<p>Phonebook has info for " + String(personsData.length) + " people" + "\n" + now

    const infoText = `<p>Phonebook has info for ${String(personsData.length)} people <br/> ${now}</p>`
    
    response.send(infoText)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = personsData.find(p => p.id == id)
    if(!person) {
        return response.status(404).end("Person with that id DNE")
    }
    response.json(person)
})


app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    personsData = personsData.filter(p => p.id != id)
    response.status(204).end("Person successfully deleted")
})


const PORT = 3001;
app.listen(PORT, () => console.log(`we are live on http://localhost:${PORT}`))