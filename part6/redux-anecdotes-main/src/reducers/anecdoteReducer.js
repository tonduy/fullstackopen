import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    toggleVoteOf(state, action) {
      const anecdoteToChange = action.payload
      const id  = anecdoteToChange.id;
      let updatedMap = state.map(anecdote =>
          anecdote.id !== id ? anecdote : anecdoteToChange
      )
      return updatedMap.sort((a, b) => b.votes - a.votes)
    },

    appendAnecdote(state, action){
      state.push(action.payload)
    },

    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const {toggleVoteOf, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = content => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(content)
    dispatch(toggleVoteOf(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer