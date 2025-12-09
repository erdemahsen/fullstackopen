import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({data}) => {

  const {good, neutral, bad} = data
  if (!(good || neutral || bad)){
    return(
   <>
    <h1>statistics</h1>
    <p>
      No feedback given
    </p>
  </>
  )
  }
  return(
   <>
    <h1>statistics</h1>

    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={good + neutral + bad}/>
        <StatisticLine text="average" value={(good - bad) / (good + bad + neutral)}/>
        <StatisticLine text="positive" value={(good) / (good + bad + neutral) * 100}/>
      </tbody>
    </table>
  </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text ="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text ="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text ="bad"/>

      <Statistics data={{good, neutral, bad}}/>
      

    </div>
  )
}

export default App