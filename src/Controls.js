import React, { PureComponent } from 'react';

class Controls extends PureComponent {

  render() {
    return (
      <div>
        <div>
          <button type="text" onClick={() => this.props.updateIntervalSetting(-1)}>-</button>&nbsp;
          {this.props.updateInterval}&nbsp;
          <button type="text" onClick={() => this.props.updateIntervalSetting(1)}>+</button>
        </div>
        <button onClick={this.props.handleAddTimer}>Add New Timer</button>
      </div>
    );
  }

}

export default Controls
