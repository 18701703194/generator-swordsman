

import configureStore from './config.jsx'

import demo from '../reducers/demo.es6'


/**
 * reducer combine
 */
const reducerObj = {
  demo: demo
}

const store = configureStore(reducerObj)

export default store
