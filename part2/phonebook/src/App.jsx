import { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0123456'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  function handleNameChange(event) {
    setNewName(event.target.value)
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value)
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
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleAddClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key = {person.name} person = {person}/>)}
      <div>debug: {newName}</div>
    </div>
  )
}

export default App