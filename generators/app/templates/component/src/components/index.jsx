import React, {PropTypes, Component} from 'react'
import pure from 'recompose/pure'
// import cx from 'classname'

@pure
export default class Hello extends Component{
  static propTypes = {
    msg: PropTypes.string
  }
  
  state = {
    isShowMsg: false
  }
  
  static defaultProps = {
    msg: 'HELLO swordsman'
  }
  
  sayHello = () => {
    this.setState({isShowMsg: true})
  }
  
  render() {
    const {msg} = this.props
    const {isShowMsg} = this.state
    
    return (
      <div>
        <button onClick={this.sayHello}>say hello</button>
        {
          isShowMsg ?
            <span style={{color: 'red'}}>{msg}</span>
            : null
        }
      </div>
    )
  }
}