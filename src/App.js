import React, { Component } from 'react';
import Timer from './Timer'
import Controls from './Controls'

class App extends Component {
  state = {
    updateInterval: 1,
    timerIDs: []
  }

  componentDidMount() {
    this.handleAddTimer()
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>MultiTimer</h1>
          <Controls
            updateIntervalSetting={this.updateIntervalSetting}
            updateInterval={this.state.updateInterval}
            handleAddTimer={this.handleAddTimer}
          />
        </header>
        <div className="TimerGrid">
          {this.renderTimers()}
        </div>
      </div>
    );
  }

  handleAddTimer = () => {
    this.setState(prevState => ({
      timerIDs: [
        ...prevState.timerIDs,
        {
          updateInterval: prevState.updateInterval,
          id: Date.now()
        }
      ]
    }))
  }

  updateIntervalSetting = increment => {
    this.setState(prevState => {
      if (prevState.updateInterval + increment <= 1) return { updateInterval: 1 }
      return {
        updateInterval: prevState.updateInterval + increment
      }
    })
  }

  renderTimers = () => this.state.timerIDs.map(({id, updateInterval}) => <Timer key={id} id={id} removeTimer={this.removeTimer} updateInterval={updateInterval}/>)

  removeTimer = id => {
    this.setState(prevState => ({
      timerIDs: prevState.timerIDs.filter(timer => timer.id !== id)
    }))
  }
}

export default App;
