import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <p>good {props.good} <br></br>
      neutral {props.neutral} <br></br>
      bad {props.bad} <br></br>
      all {props.good+props.neutral+props.bad} <br></br>
      average {(props.good-props.bad)/(props.good+props.neutral+props.bad)} <br></br>
      positive {props.good/(props.good+props.neutral+props.bad)*100} %
      </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = (newValue) => () => setGood(newValue)
  const setNeutralValue = (newValue) => () => setNeutral(newValue)
  const setBadValue = (newValue) => () => setBad(newValue)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={setGoodValue(good+1)}>good</button>
      <button onClick={setNeutralValue(neutral+1)}>neutral</button>
      <button onClick={setBadValue(bad+1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App