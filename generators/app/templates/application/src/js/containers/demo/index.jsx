'use strict'

import React, {PropTypes, Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pure from 'recompose/pure'

import api from '../../apis/demo'
import * as demoActions from '../../actions/demo'

import './index.less'

@connect(
  (state) => (state.demo),
  (dispatch) => (bindActionCreators(demoActions, dispatch))
)
@pure
export default class Demo extends  Component{
  
  static propTypes = {
    saySome: PropTypes.func,
    msg: PropTypes.string
  }

  sayHello = () => {
    this.props.saySome('hello')
    api.getShops().then(res => {
      console.log(res)
    })
  }

  render(){
    const {msg} = this.props

    return (
      <div>
        <button onClick={this.sayHello}>sayHello</button>
        <div>{msg}</div>
      </div>
    )
  }
}