import React, { PureComponent } from "react";

//? using PureComponent below to prevent unnecessary rendering
class Timer extends PureComponent {
  constructor() {
    super();
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }

  //? Below has been swapped out for making Timer a pure component that changes only if state changes
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.time === nextState.time) {
  //     return false
  //   }
  //   return true
  // }

  componentDidUpdate() {
    this.timer.current.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
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
