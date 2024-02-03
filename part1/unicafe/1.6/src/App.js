import { useState } from 'react'


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
      good {good} <br></br>
      neutral {neutral} <br></br>
      bad {bad}
    </div>
  )
}

export default App