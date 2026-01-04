import { act } from "react"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


// Slice is here using toolkit
import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      //const content = action.payload
      //state.push(asObject(content))
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      ).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },

})

const { setAnecdotes, addAnecdote } = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (anecdoteContent) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(anecdoteContent)
    dispatch(addAnecdote(anecdote))
  }
}

export const voteAnecdoteFunc = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(anecdote.id, votedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

// export const { voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer