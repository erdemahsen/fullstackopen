import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'

import NotificationContext from "./NotificationContext"

import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()

  const { notificationDispatch } = useContext(NotificationContext)

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: false,
      refetchOnWindowFocus: false // it refetches auto when switching tabs if this is not here
    }
  )

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] }) // cool
    },
    //onSuccess: (newNote) => {
    //  const notes = queryClient.getQueryData(['notes'])
    //  queryClient.setQueryData(['notes'], notes.concat(newNote))
    //}
    // this is much better instead of sending a request to backend

  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })

    const notificationText = `New anecdote with content "${content}" is added`
    notificationDispatch({ type: "SET_NOTIF", payload: notificationText })

    setTimeout(() => {
      notificationDispatch({ type: "REMOVE_NOTIF" })
    }, 5000) // Clears after 5000 milliseconds (5 seconds)


  }
  
  const handleVote = (anecdote) => {
    console.log(anecdote.id)
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})

    const notificationText = `Anecdote with content "${anecdote.content}" is voted`
    notificationDispatch({ type: "SET_NOTIF", payload: notificationText })

    setTimeout(() => {
      notificationDispatch({ type: "REMOVE_NOTIF" })
    }, 5000) // Clears after 5000 milliseconds (5 seconds)
  }

  console.log(JSON.parse(JSON.stringify(result)))
 
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  else if (result.isError){ // cool I can access that isError
    return <div>anecdote service not available due to problems in server</div>
  }
 
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm onCreate={addAnecdote}/>

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
