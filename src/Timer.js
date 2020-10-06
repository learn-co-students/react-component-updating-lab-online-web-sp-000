import React, { Component } from "react";

class Timer extends Component {
  constructor() {
    super();
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }
  
  // In Timer, a class variable, this.timer, is initialized in the constructor. An attribute, ref, is then added to a specific JSX element, in this case, section
  // Once the Timer component mounts, it is possible to access the DOM node, section, using the associated ref attribute. To access the DOM using this.timer, we just need to write this.timer followed by current
  // With this.timer.current.style, we can access and modify many style properties.
  // Using a ref in componentDidUpdate to change style properties will override any styling set up in the render(), but won't set state
  componentDidUpdate() {
    this.timer.current.style.color = '#'+Math.floor(Math.random()*16777215).toString(16)
    this.timer.current.style.width = 240+this.state.time*5/1000+"px"
    this.timer.current.style.height = 150+this.state.time*5/1000+"px"
  }

  // Including this code prevents unnecessary updates being caused by App's state changes.
  // The result is that the DOM changes you've made in componentDidUpdate will only take effect when a Timer increments.
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.time === nextState.time) {
      return false
    }
    return true
  }

  componentDidMount() {
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { time, color, logText } = this.state;
    console.log(this.timer.current);
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    );
    
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }));
  };

  stopClock = () => {
    clearInterval(this.interval);
    this.setState({ className: "hidden" });
  };

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id);
  };
}

export default Timer;
