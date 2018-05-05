// Client entry point, imports all client code

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  state = {helloto: ''}

  componentDidMount() {
    fetch('/hello')
      .then(res => res.json())
      .then(helloto => this.setState({ helloto }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        <p>Hello {this.state.helloto}</p>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
