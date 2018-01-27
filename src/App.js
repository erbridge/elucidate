import React, { Component } from 'react';

import Message from './components/Message';

import { getNextMessage } from './data/messages';

import './App.css';

const SEED = Math.floor(Math.random() * 100000);

class App extends Component {
  state = {
    messageWords: '',
    score: 0,
  };

  componentWillMount() {
    const { score } = this.state;

    this.setState({ messageWords: getNextMessage(score).getWords() });
  }

  componentWillUpdate(nextProps, { score }) {
    if (score !== this.state.score) {
      this.setState({ messageWords: getNextMessage(score).getWords() });
    }
  }

  render() {
    const { messageWords } = this.state;

    return (
      <div className="App">
        <div>
          <button
            onClick={() =>
              this.setState(({ score }) => ({
                score: score - 1,
              }))
            }
          >
            score--
          </button>
          <button
            onClick={() =>
              this.setState(({ score }) => ({
                score: score + 1,
              }))
            }
          >
            score++
          </button>
        </div>
        <Message phrases={messageWords} seed={SEED} />
      </div>
    );
  }
}

export default App;
