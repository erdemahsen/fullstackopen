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

const Course = (props) => {
    console.log(props.course.name)
  return (
    <>
        <Header course = {props.course}/>
        <Content parts = {props.course.parts}/>
        
    </>
  )
}

export default Course