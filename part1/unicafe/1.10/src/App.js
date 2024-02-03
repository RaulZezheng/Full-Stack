import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <p>
      {props.text} {props.value}
    </p>
  )
}

const Statistics = (props) => {
  const {good,neutral,bad} = props
  const all=good+neutral+bad
  const average=(good-bad)/all
  const positive=good/all*100 
  if (all == 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive+" %"} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = newValue => setGood(newValue)
  const setNeutralValue = newValue => setNeutral(newValue)
  const setBadValue = newValue => setBad(newValue)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGoodValue(good+1)} text="good" />
      <Button handleClick={() => setNeutralValue(neutral+1)} text="neutral" />
      <Button handleClick={() => setBadValue(bad+1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App