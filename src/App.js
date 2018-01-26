import React, { Component } from 'react';

import Message from './components/Message';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Message phrases={[' ', 'hello', 'world']} seed={0} />
      </div>
    );
  }
}

export default App;
