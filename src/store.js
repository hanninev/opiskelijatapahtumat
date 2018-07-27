import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import filterReducer from './reducers/filterReducer'
import selectionReducer from './reducers/selectionReducer'
import calendarReducer from './reducers/calendarReducer'
import messageReducer from './reducers/messageReducer'

const reducer = combineReducers({
  filter: filterReducer,
  selections: selectionReducer,
  calendar: calendarReducer,
  message: messageReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store