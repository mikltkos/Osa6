import React from 'react'
import { connect } from 'react-redux'
import { addVote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdotes, id) => {
    const updatedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    props.addVote(id, anecdotes)
    props.setNotification(`you voted "${updatedAnecdote.content}"`, 5)
  }
  return (
      <>       
        <ul>
          {props.anecdotesToShow.map(anecdote =>
            <li key={anecdote.id}>
              <div>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(props.anecdotesToShow, anecdote.id)}>vote</button>
                </div>
              </div>
            </li>    
          )}
        </ul>
      </>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  const sortedAnecdotes = sortAnecdotes(anecdotes)
  console.log('sortedAnecdotes: ', sortedAnecdotes)
  console.log('filter:', filter )
  if (filter === 'ALL'){
    return anecdotes
  }
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList