// Client entry point, imports all client code

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { subscribeToTimer } from './api/sock';

class App extends Component {
  constructor(props) {
    super(props);
    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
  }

  state = {
    timestamp: 'no timestamp yet'
  }

  render() {
    return (
      <div className="App">
        <h1>Hello World!</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
