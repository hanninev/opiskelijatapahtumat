const initialState = {
    filters: {
      organizer: [],
      organizerType: [],
      location: []
    }
  }

const filterReducer = (state = initialState.filters, action) => {
    console.log(action.type)
    console.log(action)
    if (action.type === 'SET_ORGANIZER_FILTER') {
        return { ...state, organizer: action.organizerFilter }
    }
    if (action.type === 'SET_ORGANIZER_TYPE_FILTER') {
        return { ...state, organizerType: action.organizerTypeFilter }
    }
    if (action.type === 'SET_LOCATION_FILTER') {
        return { ...state, location: action.locationFilter }
    }
    console.log(state)
    return state
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

  export default filterReducer