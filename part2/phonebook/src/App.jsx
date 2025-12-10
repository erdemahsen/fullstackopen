import { useEffect, useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
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
    personService.create({name: newName, number: newNumber})

    setPersons([...persons, {name: newName, number: newNumber}])
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
      personService.getAll()
        .then(response => setPersons(response.data))
  }, [])

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