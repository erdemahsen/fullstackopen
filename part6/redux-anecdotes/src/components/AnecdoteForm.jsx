import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value // this is basically anectode text
        event.target.anecdote.value = ''

        dispatch(addAnecdote(anecdote))
        dispatch(setNotification("User added an anecdote"))
        setTimeout(() => {dispatch(removeNotification())}, 4000)
        
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