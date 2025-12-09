const Header = ({course}) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Content = ({parts}) => {
  const contentParagprahs = parts.map((e,index) => <p key={index}>{e.name} {e.exercises}</p> )
  return (
    <>{contentParagprahs}</>
  )
}

const Total = ({parts}) => {

  const sum = parts.reduce((acc, part) => acc + part.exercises, 0); // last 0 is the starter of the acc
  return (
    <p>
        <strong>
            total of {sum} exercises
        </strong>
    </p>
  )
}

const Course = (props) => {
  return (
    <>
        <Header course = {props.course}/>
        <Content parts = {props.course.parts}/>
        <Total parts = {props.course.parts}/>
    </>
  )
}

export default Course