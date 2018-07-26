import eventService from '../services/events'
import moment from 'moment'

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

export const setWeekAndEvents = (date) => {
  return async (dispatch) => {
    const week = [0, 1, 2, 3, 4, 5, 6]
    const days = week.map(w => {
      return moment(date).add(w, 'd')
    })

    const events = await eventService.getEvents(days[0], days[days.length-1])
    dispatch({
      type: 'SET_WEEK',
      events: events,
      days: days
    })
  }
}

export default calendarReducer