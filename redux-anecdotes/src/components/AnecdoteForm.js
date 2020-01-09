import React from 'react'
import Filter from './Filter'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) =>  {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if(content){
      event.target.anecdote.value = ''
      props.createAnecdote(content)
      props.setNotification(`anecdote "${content}" added`, 5)      
    } else {
      props.setNotification('cannot create "empty" anecdote', 5)
    }
  }
  return (
    <>
      <h2>Anecdotes</h2>
      <Filter store={props} />
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default connect(
  null, { createAnecdote, setNotification }
)(AnecdoteForm)
