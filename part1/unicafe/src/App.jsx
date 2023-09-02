import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <>
    <button onClick={handleClick}>{text}</button>
  </>
);

const StatisticLine = ({text,value}) =>
<tr>
  <td>{text}</td>
  <td>{value}</td>
</tr>

const Statistics = (props) => {
  const [good,neutral,bad,all,avg,pos] = props.data
  if(all === 0)
  return(
    <>
    <p>No feedback given</p>
    </>
  )
  return(
  <table>
    <tbody>
    <StatisticLine text="good" value={good}></StatisticLine>
    <StatisticLine text="neutral" value={neutral}></StatisticLine>
    <StatisticLine text="bad" value={bad}></StatisticLine>
    <StatisticLine text="all" value={all}></StatisticLine>
    <StatisticLine text="average" value={avg}></StatisticLine>
    <StatisticLine text="positive" value={pos+"%"}></StatisticLine>
    </tbody>
  </table>
  )
}


const App = () =>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg,setAvg] = useState(0)
  const [pos,setPos] = useState(0)

  const handleClickGood = () => {
    const updatedGood = good + 1
    const updatedAll = all + 1
    setGood(updatedGood)
    setAll(updatedAll)
    setAvg((updatedGood-bad)/updatedAll)
    setPos((updatedGood/updatedAll)*100)
  }

  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = all + 1
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    setAvg((good-bad)/updatedAll)
    setPos((good/updatedAll)*100)
  }

  const handleClickBad = () => {
    const updatedBad = bad + 1
    const updatedAll = all + 1
    setBad(updatedBad)
    setAll(updatedAll)
    setAvg((good-updatedBad)/updatedAll)
    setPos((good/updatedAll)*100)
  }
  return(
    <>
    <h1>give feedback</h1>
    <Button handleClick={handleClickGood} text="good"></Button>
    <Button handleClick={handleClickNeutral} text="neutral"></Button>
    <Button handleClick={handleClickBad} text="bad"></Button>
    <br/>
    <h1>Statistics</h1>
    <Statistics data={[good,neutral,bad,all,avg,pos]}></Statistics>
    </>
  )
}

export default App
