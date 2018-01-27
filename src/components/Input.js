import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { isWordValid } from '../data/input';

import Keyboard from './Keyboard';
import Pictogram from './Pictogram';

import './Input.css';

class Input extends Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.string).isRequired,
    pictograms: PropTypes.object.isRequired,
  };

  state = {
    knownChars: [],
    wordInput: [],
    wordTranslation: '',
  };

  submitWord(word) {
    const newState = { wordInput: [] };

    const wordString = word.join('');

    if (isWordValid(wordString)) {
      newState.knownChars = wordString
        .split('')
        .reduce((acc, char) => ({ ...acc, [char]: true }), {
          ...this.state.knownChars,
        });

      newState.wordTranslation = wordString;
    }

    this.setState(newState);
  }

  render() {
    const { chars, pictograms } = this.props;
    const { knownChars, wordInput, wordTranslation } = this.state;

    return (
      <div className="Input">
        {wordTranslation && (
          <div className="Input__translation">{wordTranslation}</div>
        )}
        <div className="Input__word" onClick={() => this.submitWord(wordInput)}>
          {wordInput.map((char, i) => (
            <Pictogram key={i} drawFns={pictograms[char]} />
          ))}
        </div>
        <Keyboard
          chars={chars}
          handleInput={char =>
            this.setState({ wordInput: [...wordInput, char] })
          }
          knownChars={Object.keys(knownChars)}
          pictograms={pictograms}
        />
      </div>
    );
  }
}

export default Input;
