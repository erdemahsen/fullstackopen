const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, handleAddClick}) => {
  return(
    <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/> <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleAddClick}>add</button>
        </div>
      </form>
  )
}

export default PersonForm