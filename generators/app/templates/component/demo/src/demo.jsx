import React from 'react'
import ReactDOM from 'react-dom'
// import cx from 'classname'

import Hello from '../../src/components/index.jsx'

import './reset.less'

function render() {
  try{
    ReactDOM.render(
      <Hello msg='hello swordsman'/>,
      document.getElementById('app')
    )
  } catch (e) {
    /* eslint-disable no-console */
    console.log(e.stack)
  }
}

render()
