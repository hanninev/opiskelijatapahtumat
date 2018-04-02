const initialState = {
  filters: {
    organizer: [],
    organizerType: [],
    location: [],
    eventType: []
  }
}

const filterReducer = (state = initialState.filters, action) => {
  console.log(action.type)
  console.log(action)
  if (action.type === 'INIT_FILTER') {
    return { action }
  }
  if (action.type === 'SET_ORGANIZER_FILTER') {
    return { ...state, organizer: action.organizerFilter }
  }
  if (action.type === 'SET_ORGANIZER_TYPE_FILTER') {
    return { ...state, organizerType: action.organizerTypeFilter }
  }
  if (action.type === 'SET_LOCATION_FILTER') {
    return { ...state, location: action.locationFilter }
  }
  if (action.type === 'SET_EVENT_TYPE_FILTER') { 
    return { ...state, eventType: action.eventTypeFilter }
  }
  console.log(state)
  return state
}

export const initFilter = (value) => {
  return {
    type: 'INIT_FILTER',
    organizer: value,
    organizerType: [],
    location: [],
    eventType: []
  }
}

export const locationFilterCreation = (value) => {
  return {
    type: 'SET_LOCATION_FILTER',
    locationFilter: value
  }
}

export const organizerFilterCreation = (value) => {
  return {
    type: 'SET_ORGANIZER_FILTER',
    organizerFilter: value
  }
}

export const organizerTypeFilterCreation = (value) => {
  return {
    type: 'SET_ORGANIZER_TYPE_FILTER',
    organizerTypeFilter: value
  }
}

export const eventTypeFilterCreation = (value) => {
  let values = []
  value.map(a => {
    values = values.concat(a)})
  return {
    type: 'SET_EVENT_TYPE_FILTER',
    eventTypeFilter: values
  }
}

export default filterReducer