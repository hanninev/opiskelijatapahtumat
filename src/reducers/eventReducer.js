import eventService from '../services/events'

const eventReducer = (store = [], action) => {
  console.log(action.type)
  console.log(action)
  if (action.type === 'INIT_EVENTS') {
    return action.events, action.eventsToShow
  }

  return store
}

export const eventInitialization = (user) => {
  return async (dispatch) => {
    console.log(user)
    const events = await eventService.getAll(user)
    dispatch({
      type: 'INIT_EVENTS',
      events: events,
      eventsToShow: events
    })
  }
}

export default eventReducer