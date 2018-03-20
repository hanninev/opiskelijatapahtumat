import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import filterReducer from './reducers/filterReducer'
import organizerReducer from './reducers/organizerReducer'
import eventReducer from './reducers/eventReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    user: userReducer,
    filter: filterReducer,
    organizers: organizerReducer,
    events: eventReducer
  })

  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )

export default store