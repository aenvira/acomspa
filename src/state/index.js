import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import epicMiddleware from './epics'

const initialState = { }
//const epicMiddleware = createEpicMiddleware(epic)
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default createStore(
  reducer,
  //initialState,
  composeWithDevTools(applyMiddleware(epicMiddleware))
)
