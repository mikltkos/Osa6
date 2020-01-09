import anecdoteService from '../services/anecdotes'

export const sortAnecdotes = (state) => {
  
  return state.sort((a, b) => b.votes - a.votes)
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const addVote = (anecdoteId, anecdotes) => {
  console.log('addVote: ', anecdoteId, anecdotes)
  return async dispatch => {
    const anecdote = await anecdoteService.updateAnecdote(anecdoteId, anecdotes)
    console.log('addVote anecdote: ', anecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: {
        id: anecdote.id
      }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()  
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => { 
  console.log('anecdote action: ', action)
  switch(action.type) {
  case 'ADD_VOTE': {
    const id = action.data.id
    const anecdoteToVote = state.find(n => n.id === id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    const newState = state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    return newState
  }  
  case 'NEW_ANECDOTE':
    return state.concat(action.data)
  case 'INIT_ANECDOTES':  
    return action.data
  default:
    return state
  }
}

export default anecdoteReducer