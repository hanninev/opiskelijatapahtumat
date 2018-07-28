import eventTypeService from '../services/eventTypes'
import locationService from '../services/locations'
import organizerService from '../services/organizers'

const initialState = {
  selections: {
    organizers: [],
    locations: [],
    eventTypes: [],
    newEvent_organizers: [],
    newEvent_eventTypes: [],
    newEvent_locations: []
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
    return { ...store, organizers: store.organizers.concat(action.organizer), newEvent_organizers: store.newEvent_organizers.concat(action.organizer) }
  }
  if (action.type === 'SET_EVENT_ORGANIZERS') {
    console.log(action)
    return { ...store, newEvent_organizers: action.organizers }
  }
  if (action.type === 'ADD_NEW_LOCATION') {
    console.log(action)
    return { ...store, locations: store.locations.concat(action.location), newEvent_locations: store.newEvent_locations.concat(action.location) }
  }
  if (action.type === 'SET_EVENT_LOCATIONS') {
    console.log(action)
    return { ...store, newEvent_locations: action.locations }
  }
  if (action.type === 'ADD_NEW_EVENT_TYPE') {
    console.log(action)
    return { ...store, eventTypes: store.eventTypes.concat(action.eventType), newEvent_eventTypes: store.newEvent_eventTypes.concat(action.eventType) }
  }
  if (action.type === 'SET_EVENT_EVENT_TYPES') {
    console.log(action)
    return { ...store, newEvent_eventTypes: action.eventTypes }
  }
  if (action.type === 'INIT_NEW_EVENT_VALUES') {
    console.log(action)
    return { ...store, newEvent_eventTypes: [], newEvent_locations: [], newEvent_organizers: [] }
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

export const addNewOrganizer = (organizer, user) => {
  return async (dispatch) => {
    const addedOrganizer = await organizerService.createOrganizer(organizer, user)
    dispatch({
      type: 'ADD_NEW_ORGANIZER',
      organizer: addedOrganizer,
    })
  }
}

export const setEventOrganizers = (organizers) => {
  return {
    type: 'SET_EVENT_ORGANIZERS',
    organizers: organizers,
  }
}

export const addNewLocation = (location, user) => {
  return async (dispatch) => {
    const addedLocation = await locationService.createLocation(location, user)
    dispatch({
      type: 'ADD_NEW_LOCATION',
      location: addedLocation,
    })
  }
}

export const setEventLocations = (locations) => {
  return {
    type: 'SET_EVENT_LOCATIONS',
    locations: locations,
  }
}

export const addNewEventType = (eventType, user) => {
  return async (dispatch) => {
    const addedEventType = await eventTypeService.createEventType(eventType, user)
    dispatch({
      type: 'ADD_NEW_EVENT_TYPE',
      eventType: addedEventType,
    })
  }
}

export const setEventEventTypes = (eventTypes) => {
  return {
    type: 'SET_EVENT_EVENT_TYPES',
    eventTypes: eventTypes,
  }
}

export const initNewEventValues = () => {
  return {
    type: 'INIT_NEW_EVENT_VALUES'
  }
}

export default selectionReducer