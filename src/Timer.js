import React, { Component } from "react";

class Timer extends Component {
  constructor() {
    super();
    this.timer = React.createRef(); //REF!!! attribute added to specific JSX element, section
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }

  //Your code here
  //limit how often a component updates 
  //fires just b4 a component commits to updating 
  //if true, component updates (boolean)
  //
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.time === nextProps.time) {
        return false;
    }
    return true;
}

//called after every component rerender 
//post processing actions - 3rd party animation library or manipulate dom outside of JSX
//fires every time the component updates 
componentDidUpdate() {
    this.timer.current.style.color = '#'+Math.floor(Math.random()*16777215).toString(16) //changes font color randomly
    this.timer.current.style.width = 240+this.state.time*5/1000+"px"
    this.timer.current.style.height = 150+this.state.time*5/1000+"px"
}



//initializes an interval, in APP.JS, method adds one initial timer
  componentDidMount() {
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  //ref used here too
  //added to jsx element 
  render() {
    const { time, color, logText } = this.state;
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}> /
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
