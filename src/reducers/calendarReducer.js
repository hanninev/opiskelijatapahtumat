const initialState = {
  calendar: {
    week: [1, 2, 3, 4, 5, 6, 7]
  }
}

const calendarReducer = (store = initialState.calendar, action) => {
  console.log(action.type)
  if (action.type === 'SET_NEXT_WEEK') {
    console.log(action)
    return { week: store.week.map(d => d+7) }
  }
  if (action.type === 'SET_PREVIOUS_WEEK') {
    console.log(action)
    return { week: store.week.map(d => d-7) }
  }
  if (action.type === 'SET_CURRENT_WEEK') {
    console.log(action)
    return { week: initialState.calendar.week }
  }
  return store
}

export const setNextWeek = () => {
  return {
    type: 'SET_NEXT_WEEK'
  }
}

export const setPreviousWeek = () => {
  return {
    type: 'SET_PREVIOUS_WEEK'
  }
}

export const setCurrentWeek = () => {
  return {
    type: 'SET_CURRENT_WEEK'
  }
}

export default calendarReducer