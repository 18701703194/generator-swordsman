'use strict'

require('../style/index.less')

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route} from 'react-router'
import DemoPage from './containers/demo/index'
import store from './stores/demo'

function render() {
  try{
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Route path='/' component={DemoPage}/>
          <Route path='demo' component={DemoPage}/>
        </Router>
      </Provider>,
      document.getElementById('app')
    )
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e.stack)
  }
}

render()
