import React, { Component } from 'react';

import Message from './components/Message';

import { getNextMessage } from './data/messages';

import './App.css';

const SEED = Math.floor(Math.random() * 100000);

class App extends Component {
  state = {
    messageWords: '',
    score: 0,
    seenChars: {},
  };

  updateMessage({ score }) {
    this.setState(({ seenChars }) => {
      const messageWords = getNextMessage(score).getWords();

      return {
        messageWords,
        seenChars: messageWords
          .map(word =>
            word
              .split('')
              .reduce((acc, char) => ({ ...acc, [char]: true }), {}),
          )
          .reduce((acc, chars) => ({ ...acc, ...chars }), { ...seenChars }),
      };
    });
  }

  componentWillMount() {
    this.updateMessage(this.state);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.score !== this.state.score) {
      this.updateMessage(nextState);
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
