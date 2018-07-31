import eventTypeService from '../services/eventTypes'
import locationService from '../services/locations'
import organizerService from '../services/organizers'

const initialState = {
  selections: {
    organizers: [],
    locations: [],
    eventTypes: []
  }
}

const selectionReducer = (store = initialState.selections, action) => {
  console.log(action.type)
  if (action.type === 'INIT_SELECTIONS') {
    console.log(action)
    return { ...store, organizers: action.organizers, locations: action.locations, eventTypes: action.eventTypes }
  }
  if (action.type === 'ADD_NEW_ORGANIZER') {
    console.log(action)
    return { ...store, organizers: store.organizers.concat(action.organizer) }
  }
  if (action.type === 'ADD_NEW_LOCATION') {
    console.log(action)
    return { ...store, locations: store.locations.concat(action.location) }
  }
  if (action.type === 'ADD_NEW_EVENT_TYPE') {
    console.log(action)
    return { ...store, eventTypes: store.eventTypes.concat(action.eventType) }
  }
  return store
}

export const selectionInit = () => {
  return async (dispatch) => {
    const organizers = await organizerService.getOrganizers()
    const locations = await locationService.getLocations()
    const eventTypes = await eventTypeService.getEventTypes()
    dispatch({
      type: 'INIT_SELECTIONS',
      organizers: organizers,
      locations: locations,
      eventTypes: eventTypes
    })
  }
}

export const addNewOrganizer = (organizer) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_NEW_ORGANIZER',
      organizer: organizer,
    })
  }
}

export const addNewLocation = (location) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_NEW_LOCATION',
      location: location,
    })
  }
}

export const addNewEventType = (eventType) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_NEW_EVENT_TYPE',
      eventType: eventType,
    })
  }
}

export default selectionReducer