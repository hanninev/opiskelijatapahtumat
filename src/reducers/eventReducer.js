import eventService from '../services/events'

const eventReducer = (store = [], action) => {
  console.log(action.type)
  console.log(action)
  if (action.type === 'INIT_EVENTS') {
    return action.events, action.eventsToShow
  }

  return store
}

export const eventInitialization = () => {
  return async (dispatch) => {
    const events = await eventService.getEvents()
    dispatch({
      type: 'INIT_EVENTS',
      events: events,
      eventsToShow: events
    })
  }
}

export default eventReducer