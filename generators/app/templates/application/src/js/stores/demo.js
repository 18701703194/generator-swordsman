

import configureStore from './config'

import demo from '../reducers/demo'


/**
 * reducer combine
 */
const reducerObj = {
  demo: demo
}

const store = configureStore(reducerObj)

export default store
