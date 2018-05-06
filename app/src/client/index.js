// Client entry point, imports all client code

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { onLoad, turnListener, onClick } from './api/sock';

import './ui/stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    onLoad((err, greeting) => this.setState({ greeting }));
    turnListener((err, yourturn) => this.setState({ yourturn }));
    // onPrivateMsg((err, msg) => this.setState({ msg }));
    // subscribeToTimer((err, timestamp) => this.setState({
    //   timestamp
    // }));
  }

  state = {
    greeting: '',
    yourturn: false,
  }

  onClick() {
    onClick();
  }

  render() {
    console.log('it is your turn:', this.state.yourturn);
    return (
      <div className="App">
        <h1>{this.state.greeting}</h1>
        <button onClick={this.onClick}>Click</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
