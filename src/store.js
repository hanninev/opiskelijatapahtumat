import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import filterReducer from './reducers/filterReducer'
import selectionReducer from './reducers/selectionReducer'
import calendarReducer from './reducers/calendarReducer'

const reducer = combineReducers({
  filter: filterReducer,
  selections: selectionReducer,
  calendar: calendarReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store