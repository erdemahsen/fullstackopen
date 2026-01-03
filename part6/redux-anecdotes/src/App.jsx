import { useSelector, useDispatch } from 'react-redux'
import {addAnecdote, voteAnecdote} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(voteAnecdote(id))
  }

  const add = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value // this is basically anectode text
    dispatch(addAnecdote(anecdote))
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <form onSubmit={add}>
        <input name="anecdote" /> 
        <button type="submit">add</button>
      </form>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
