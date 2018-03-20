import eventService from '../services/events'

const reducer = (store = [], action) => {
  console.log(action.type)
  if (action.type === 'INIT_EVENTS') {
    return action.data
  }

  return store
}

export const eventInitialization = (user) => {
  return async (dispatch) => {
    console.log(user)
    const events = await eventService.getAll(user)
    dispatch({
      type: 'INIT_EVENTS',
      data: events
    })
  }
}

export default reducer