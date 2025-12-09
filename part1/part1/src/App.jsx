const Hello = (props) => {
  return (
    <div>
      <p>Hello world {props.name}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>

      <Hello name = "hi"/>
    </div>
  )
}

export default App
