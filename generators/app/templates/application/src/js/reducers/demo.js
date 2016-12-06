'use strict'

const initState = {
  msg: ''
}

export default function demo(state=initState, action) {
  switch (action.type) {
    case 'SAY_HELLO':
      return Object.assign({}, state, {msg: 'hello'})
    default:
      return state
  }
}
