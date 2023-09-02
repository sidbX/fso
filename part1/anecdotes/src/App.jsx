import { useState } from 'react'

const DisplayAnecdote = ({ heading, anecdote, votes}) => {
  return(
  <>
    <h1>{heading}</h1>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votesArr, setVotesArr] = useState(anecdotes.map(val => 0))
  const [maxVotesIndex, setMaxVotesIndex] = useState(0)

  const handleVote = () => {
    const currVotesArr = [...votesArr]
    ++currVotesArr[selected]
    setVotesArr(currVotesArr)
    setMaxVotesIndex(currVotesArr.indexOf(Math.max(...currVotesArr)))
  }

  return (
    <div>
      <DisplayAnecdote heading="Anecdote of the day" anecdote={anecdotes[selected]} votes={votesArr[selected]}></DisplayAnecdote>
      <button onClick={handleVote}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Get A Quote</button>
      <DisplayAnecdote heading="Anecdote with most votes" anecdote={anecdotes[maxVotesIndex]} votes={votesArr[maxVotesIndex]}></DisplayAnecdote>
    </div>
  )
}

export default App