import eventService from '../services/events'

const initialState = {
  calendar: {
    days: [],
    events: []
  }
}

const calendarReducer = (store = initialState.calendar, action) => {
  console.log(action.type)
  if (action.type === 'SET_WEEK') {
    console.log(action)
    return { ...store, events: action.events, days: action.days }
  }
  return store
}

export const setNextWeek = (thisWeek) => {
  return async (dispatch) => {
    console.log(thisWeek)
    const days = thisWeek.map(d => d.add(7, 'd'))
    console.log(days)
    const events = await eventService.getEvents(days)
    dispatch({
      type: 'SET_WEEK',
      events: events,
      days: days
    })
  }
}

export const setPreviousWeek = (thisWeek) => {
  return async (dispatch) => {
    console.log(thisWeek)
    const days = thisWeek.map(d => d.add(-7, 'd'))
    console.log(days)
    const events = await eventService.getEvents(days)
    dispatch({
      type: 'SET_WEEK',
      events: events,
      days: days
    })
  }
}

export const setCurrentWeek = (days) => {
  return async (dispatch) => {
    // const days = [1, 2, 3, 4, 5, 6, 7]
    const events = await eventService.getEvents(days)
    dispatch({
      type: 'SET_WEEK',
      events: events,
      days: days
    })
  }
}

export default calendarReducer