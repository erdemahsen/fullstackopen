import { useSelector, useDispatch } from 'react-redux'



const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = id => {
    // console.log('vote', id)
    dispatch({
      type: 'VOTE',
      payload: { id }
    })
  }

  const addAnectode = (event) => {
    event.preventDefault()
    const anectode = event.target.anectode.value // this is basically anectode text
    // console.log(anectode)
    dispatch({
      type: 'ADD_ANECTODE',
      payload: {
        anectode // cool naming trick used, I like this trick
      }
    })
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <form onSubmit={addAnectode}>
        <input name="anectode" /> 
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
