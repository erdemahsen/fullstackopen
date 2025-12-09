const Header = ({course}) => {
  return (
    <h1>{course.name}</h1>
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
  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercise: 10},
      {name: 'Using props to pass data', exercise: 7},
      {name: 'State of a component', exercise: 14}
    ]
  }
  
  return (
    <div>
      <Header course = {course}/>
      <Content parts={course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App