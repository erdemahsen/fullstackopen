const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({content}) => {
  const contentParagprahs = content.map((e,index) => <p key={index}>{e.part}{e.exercise}</p> )
  return (
    <>{contentParagprahs}</>
  )
}

const Total = ({totalExercises}) => {

  const sum = totalExercises.reduce((a, b) => a + b, 0);
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

  const content = [
    {part: part1, exercise: exercises1},
    {part: part2, exercise: exercises2},
    {part: part3, exercise: exercises3}
  ]
  return (
    <div>
      <Header course = {course}/>
      <Content content={content}/>
      <Total totalExercises = {[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App