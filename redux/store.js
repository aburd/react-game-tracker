import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import reducer from './reducer'

// add middleware
let finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore)

// need reducers and initial state
function configureStore( initialState = {} ) {
  return finalCreateStore(reducer, initialState)
}

export default configureStore
