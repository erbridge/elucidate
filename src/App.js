import React, { Component } from 'react';

import Message from './components/Message';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Message
          phrases={[/*'1234',*/ 'abcdefghijklmnopqrstuvwxyz']}
          seed={Math.floor(Math.random() * 100000)}
        />
      </div>
    );
  }
}

export default App;
