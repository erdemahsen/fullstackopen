const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({parts}) => {
  const contentParagprahs = parts.map((e,index) => <p key={index}>{e.name}{e.exercise}</p> )
  return (
    <>{contentParagprahs}</>
  )
}

const Total = ({parts}) => {

  const sum = parts.reduce((acc, part) => acc + part.exercise, 0); // last 0 is the starter of the acc
  //console.log(sum)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [
    {name: part1, exercise: exercises1},
    {name: part2, exercise: exercises2},
    {name: part3, exercise: exercises3}
  ]
  return (
    <div>
      <Header course = {course}/>
      <Content parts={parts}/>
      <Total parts = {parts}/>
    </div>
  )
}

export default App