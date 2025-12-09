import { useState } from 'react'

const Person = ({name}) => {
  return (
    <p>{name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  function handleNameChange(event) {
    console.log("hi")
    setNewName(event.target.value)
  }

  function handleAddClick(event){
    event.preventDefault()
    setPersons([...persons, {name: newName}])
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>

        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleAddClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key = {person.name} name = {person.name}/>)}
      <div>debug: {newName}</div>
    </div>
  )
}

export default App