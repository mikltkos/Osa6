
const initialState = 'ALL'

export const setFilter = (filter) => {
  console.log('setFilter filter: ', filter)
  return {
    type: 'SET_FILTER',
    filter: filter
  }

}

const filterReducer = (state = initialState, action) => {
  console.log('filterReducer action : ', action)
  switch(action.type){
  case 'SET_FILTER':
    return action.filter
  default:
    return state
  }
}

export default filterReducer