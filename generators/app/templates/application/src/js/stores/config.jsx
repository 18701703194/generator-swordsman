import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux'


function configureStore(reducerObj) {

  const appReducer = combineReducers(reducerObj)

  const createStoreWithMiddleware = applyMiddleware(
    thunk
  )(createStore)

  const store = createStoreWithMiddleware(appReducer,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

  return store
}

export default configureStore

