import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { isWordValid } from '../data/input';

import Keyboard from './Keyboard';
import Pictogram from './Pictogram';

import './Input.css';

class Input extends Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSubmit: PropTypes.func.isRequired,
    pictograms: PropTypes.object.isRequired,
  };

  state = {
    knownChars: [],
    wordInput: [],
    wordTranslation: '',
  };

  submitWord() {
    const { onSubmit } = this.props;
    const { knownChars, wordInput } = this.state;
    const wordString = wordInput.join('');

    const newState = { wordInput: [] };

    const isValid = isWordValid(wordString);

    if (isValid) {
      newState.knownChars = wordString
        .split('')
        .reduce((acc, char) => ({ ...acc, [char]: true }), {
          ...knownChars,
        });

      newState.wordTranslation = wordString;
    }

    this.setState(newState);

    onSubmit(isValid);
  }

  render() {
    const { chars, pictograms } = this.props;
    const { knownChars, wordInput, wordTranslation } = this.state;

    return (
      <div className="Input">
        {wordTranslation && (
          <div className="Input__translation">{wordTranslation}</div>
        )}
        <div className="Input__word" onClick={() => this.submitWord()}>
          {wordInput.map((char, i) => (
            <Pictogram key={i} drawFns={pictograms[char]} />
          ))}
        </div>
        <Keyboard
          chars={chars}
          knownChars={Object.keys(knownChars)}
          pictograms={pictograms}
          onInput={char => this.setState({ wordInput: [...wordInput, char] })}
        />
      </div>
    );
  }
}

export default Input;
