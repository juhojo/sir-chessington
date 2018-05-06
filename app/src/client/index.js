// Client entry point, imports all client code

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { onLoad, onFailure, turnListener, onClick, onCreateLobby, onLobbyCreated } from './api/sock';

import './ui/stylesheets/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    onLoad((err, greeting) => this.setState({ greeting }));
    turnListener((err, yourturn) => this.setState({ yourturn }));
    onLobbyCreated((err, lobbyCreated) => this.setState({ lobbyCreated }));
    onFailure((err, msg) => this.setState({ showError: true, errorMsg: msg }));
    // onPrivateMsg((err, msg) => this.setState({ msg }));
    // subscribeToTimer((err, timestamp) => this.setState({
    //   timestamp
    // }));
  }

  state = {
    greeting: '',
    yourturn: false,
    lobbyCreated: false,
    showError: false,
    errorMsg: '',
  }

  onClick() {
    onClick();
    onCreateLobby();
  }

  render() {
    console.log('it is your turn:', this.state.yourturn);
    console.log('new lobby created:', this.state.lobbyCreated);
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
