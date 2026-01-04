import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer';

import { notifHere } from '../reducers/notificationReducer';


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value // this is basically anectode text
        event.target.anecdote.value = ''

        dispatch(appendAnecdote(anecdote))
        //const newAnecdote = await anecdoteService.createNew(anecdote)
        //console.log(newAnecdote)
        //dispatch(addAnecdote(newAnecdote))

        dispatch(notifHere("User added an anecdote", 3))
        
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