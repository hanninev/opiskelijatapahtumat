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
    return { ...store, organizers: store.organizers.concat(action.organizer), newEvent_organizers: store.newOrganizers.concat(action.organizer) }
  }
  if (action.type === 'SET_EVENT_ORGANIZERS') {
    console.log(action)
    return { ...store, newEvent_organizers: action.organizers }
  }
  if (action.type === 'ADD_NEW_LOCATION') {
    console.log(action)
    return { ...store, locations: store.locations.concat(action.location), newEvent_locations: store.newLocations.concat(action.location) }
  }
  if (action.type === 'SET_EVENT_LOCATIONS') {
    console.log(action)
    return { ...store, newEvent_locations: action.locations }
  }
  if (action.type === 'ADD_NEW_EVENT_TYPE') {
    console.log(action)
    return { ...store, eventTypes: store.eventTypes.concat(action.eventType), newEvent_eventTypes: store.newEventTypes.concat(action.eventType) }
  }
  if (action.type === 'SET_EVENT_EVENT_TYPES') {
    console.log(action)
    return { ...store, newEvent_eventTypes: action.eventTypes }
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
    const addedOrganizer = await organizerService.createOrganizer(organizer)
    dispatch({
      type: 'ADD_NEW_ORGANIZER',
      organizer: addedOrganizer.data,
    })
  }
}

export const setEventOrganizers = (organizers) => {
  return {
    type: 'SET_EVENT_ORGANIZERS',
    organizers: organizers,
  }
}

export const addNewLocation = (location) => {
  return async (dispatch) => {
    const addedLocation = await locationService.createLocation(location)
    dispatch({
      type: 'ADD_NEW_LOCATION',
      organizer: addedLocation.data,
    })
  }
}

export const setEventLocations = (locations) => {
  return {
    type: 'SET_EVENT_LOCATIONS',
    locations: locations,
  }
}

export const addNewEventType = (eventType) => {
  return async (dispatch) => {
    const addedEventType = await eventTypeService.createeventType(eventType)
    dispatch({
      type: 'ADD_NEW_EVENT_TYPE',
      eventType: addedEventType.data,
    })
  }
}

export const setEventEventTypes = (eventTypes) => {
  return {
    type: 'SET_EVENT_EVENT_TYPES',
    eventTypes: eventTypes,
  }
}

export default selectionReducer