import Person from './Person'
const Persons = ({persons, newFilter, onDelete}) => {
  return (
    <>{persons.filter(person => person.name.toLowerCase().includes(newFilter.toLocaleLowerCase())).map(person => <Person key = {person.name} person = {person} onDelete={onDelete}/>)}</>
  )
}

export default Persons