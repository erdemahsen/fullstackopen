import Person from './Person'
const Persons = ({persons, newFilter}) => {
  return (
    <>{persons.filter(person => person.name.toLowerCase().includes(newFilter.toLocaleLowerCase())).map(person => <Person key = {person.name} person = {person}/>)}</>
  )
}

export default Persons