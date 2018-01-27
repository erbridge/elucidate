import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { isWordValid } from '../data/input';

import Keyboard from './Keyboard';
import Pictogram from './Pictogram';

import './Input.css';

class Input extends Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSubmitFailure: PropTypes.func.isRequired,
    onSubmitSuccess: PropTypes.func.isRequired,
    pictograms: PropTypes.object.isRequired,
  };

  state = {
    knownChars: [],
    wordInput: [],
    wordTranslation: '',
  };

  submitWord() {
    const { onSubmitFailure } = this.props;
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

    if (!isValid) {
      const scoreDelta = -0.25;

      onSubmitFailure(scoreDelta);
    }
  }

  submitSuccess() {
    const { onSubmitSuccess } = this.props;

    this.setState({ wordTranslation: '' });

    const scoreDelta = 1;

    onSubmitSuccess(scoreDelta);
  }

  render() {
    const { chars, pictograms } = this.props;
    const { knownChars, wordInput, wordTranslation } = this.state;

    return (
      <div className="Input">
        {wordTranslation && (
          <div
            className="Input__translation"
            onClick={() => this.submitSuccess()}
          >
            {wordTranslation}
          </div>
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
