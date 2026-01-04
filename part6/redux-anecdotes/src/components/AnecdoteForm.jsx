import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value // this is basically anectode text
        dispatch(addAnecdote(anecdote))
        event.target.anecdote.value = ''
    };
    return (
        <>
            <form onSubmit={add}>
                <input name="anecdote" /> 
                <button type="submit">add</button>
            </form>
        </>
    )
}

export default AnecdoteForm