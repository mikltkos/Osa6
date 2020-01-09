import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducers/reducer'



const store = createStore(counterReducer)
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

const App = () => {
  const handleGood = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const handleOk = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const handleBad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const handleReset = () => {    
    store.dispatch({
      type: 'ZERO'
    })
  }

  const all = () => {
    return store.getState().good + store.getState().ok + store.getState().bad
  }

  const average = () => {
    if(all() > 0){
      return (store.getState().good + (store.getState().bad * (-1)))/all()
    }
    return 0
  }

  const positive = () => {
    if(all() > 0){
      return (store.getState().good / all()) * 100
    }
    return 0
  }

  return (
    <div>
      <button onClick={handleGood}>hyvä</button> 
      <button onClick={handleOk}>neutraali</button> 
      <button onClick={handleBad}>huono</button>
      <button onClick={handleReset}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
      <div>kaikki {all()}</div>
      <div>keskiarvo {average()}</div>
      <div>positiivisia {positive()} %</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root')) 
}

renderApp()
store.subscribe(renderApp)
