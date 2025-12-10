import { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  function handleNameChange(event) {
    setNewName(event.target.value)
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value)
  }

  function handleFilterChange(event) {
    setNewFilter(event.target.value)
  }

  function handleAddClick(event){
    event.preventDefault()
    for(let i = 0; i < persons.length; i++)
    {
      if(persons[i].name === newName){
        alert(`${newName} is already in the list`)
        return 
      }
    }
    setPersons([...persons, {name: newName, number: newNumber}])
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>

      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/> <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleAddClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLocaleLowerCase())).map(person => <Person key = {person.name} person = {person}/>)}
      <div>debug: {newName}</div>
    </div>
  )
}

export default App