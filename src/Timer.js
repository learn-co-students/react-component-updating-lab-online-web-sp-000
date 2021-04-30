import React, { Component } from 'react';

class Timer extends Component {

  constructor() {
    super()
    this.timer = React.createRef()
    this.state = {
        time: 0,
        color: '#'+Math.floor(Math.random()*16777215).toString(16),
    }
  }



  //Your code here

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.time === nextState.time) {
      return false
    }
    return true
  }

  componentDidUpdate() {
    this.timer.current.style.color = '#'+Math.floor(Math.random()*16777215).toString(16)
    this.timer.current.style.width = 240+this.state.time*5/1000+"px"
    this.timer.current.style.height = 150+this.state.time*5/1000+"px"
  }

  componentDidMount() {
    this.interval = setInterval(this.clockTick, this.props.updateInterval*1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { time, color, className, logText } = this.state
    return (
      <section className="Timer" style={{background: color}} ref={this.timer}>

        <h1>{ time }</h1>
        <button onClick={ this.stopClock }>Stop</button>
        <aside className="logText">{ logText }</aside>
        <small onClick={ this.handleClose }>X</small>

      </section>
    );
  }


  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }))
  }

  stopClock = () => {
    clearInterval(this.interval)
    this.setState({className: "hidden"})
  }

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id)
  }


}

export default Timer;