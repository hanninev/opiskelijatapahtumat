import eventService from '../services/events'

const initialState = {
  selections: {
    organizers: [],
    locations: [],
    eventTypes: []
  }
}

const reducer = (store = initialState.selections, action) => {
  console.log(action.type)
  if (action.type === 'INIT_FILTER_SELECTIONS') {
    return { ...store, organizers: action.organizers, locations: action.locations, eventTypes: action.eventTypes }
  }

  return store
}

export const selectionInitialization = () => {
  return async (dispatch) => {
    const organizers = await eventService.getOrganizers()
    const locations = await eventService.getLocations()
    const eventTypes = await eventService.getEventTypes()
    dispatch({
      type: 'INIT_FILTER_SELECTIONS',
      organizers: organizers,
      locations: locations,
      eventTypes: eventTypes
    })
  }
}

export default reducer