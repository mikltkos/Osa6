
const initialState = ''

export const setNotification = (notification, delay) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIF',
      notification
    })
    await setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIF'
      })
    }, delay * 1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  console.log('notification action: ', action)
  switch (action.type) {
  case 'SET_NOTIF':
    return action.notification
  case 'CLEAR_NOTIF':
    return ''
  default:
    return state
  }
}

export default notificationReducer