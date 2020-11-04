
import React, { Component } from 'react';

class LogComponent extends Component {
render() {
  let { log } = this.props;
  return (
    <div className="Log">
      <p>{log}</p>
    </div>
  );
}
}

export default LogComponent;
