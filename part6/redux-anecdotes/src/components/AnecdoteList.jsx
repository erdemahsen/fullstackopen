import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdoteFunc } from '../reducers/anecdoteReducer'

import { notifHere } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
        if (state.filter == "") {
            return state.anecdotes
        }
        else {
            // console.log(state.filter)
            return state.anecdotes.filter(anecdote => {
                return anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
            })
        }
    })

    const vote = (anecdote) => {
        dispatch(voteAnecdoteFunc(anecdote))
        dispatch(notifHere(`Voted the anecdote with id ${anecdote.id}`, 3))
    }

    return (
        <>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AnecdoteList