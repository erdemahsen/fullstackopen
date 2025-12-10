import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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

      <Filter filter = {newFilter} handleFilterChange = {handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm 
        newName = {newName}
        handleNameChange = {handleNameChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
        handleAddClick = {handleAddClick}
      />
      
      <h2>Numbers</h2>

      <Persons persons = {persons} newFilter= {newFilter}/>
      
      <div>debug: {newName}</div>
    </div>
  )
}

export default App