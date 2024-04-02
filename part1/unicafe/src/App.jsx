import { useState } from 'react'

const Statistics = (props) => {
  if(props.all === 0) {
    return <p>No Feedback given</p>
  }
  else {
    return (
      <div>
      <h1>statistics</h1>
      <table>
      <StatisticsLine text = 'good' value = {props.good} />
      <StatisticsLine text = 'neutral' value = {props.neutral} /> 
      <StatisticsLine text = 'bad' value = {props.bad} /> 
      <StatisticsLine text = 'all' value = {props.all} />
      <StatisticsLine text = 'average' value = {props.average} />
      <StatisticsLine text = 'positive' value = {props.positive} symbol= {'%'} />
      </table>
      </div>
    )
  }
}

const StatisticsLine = ({text, value, symbol}) => {
  return (
  <tr>
    <td>{text}</td>
    <td>{value} {symbol}</td>
  </tr>
  )
}
const Button = ({handleClick, text }) => {
  return( 
    <button onClick={handleClick}>
    {text}
    </button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const newGood = good + 1
    setGood(newGood)

    const newAll = (newGood + neutral + bad)
    setAll(newAll)

    const newAverage = (newGood - bad) / newAll
    setAverage(newAverage)

    const newPositive = newGood/newAll * 100
    setPositive(newPositive)
  }
  const handleNeutralClick = () => {
    const newNeutral = neutral+1
    setNeutral(newNeutral)
    const newAll = (good + newNeutral + bad)
    setAll(newAll)

  }
  const handleBadClick = () => {
    const newBad = bad+1
    setBad(newBad)
    const newAll = (good + neutral + newBad)
    setAll(newAll)
    const newAverage = (good - newBad) / newAll
    setAverage(newAverage)
    const newPositive = good/newAll * 100
    setPositive(newPositive)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} average = {average} positive = {positive} />
    </div>
  )
  }
export default App