import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { isWordValid } from '../data/input';

import Keyboard from './Keyboard';
import Pictogram from './Pictogram';

import './Input.css';

class Input extends Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.string).isRequired,
    knownChars: PropTypes.arrayOf(PropTypes.string).isRequired,
    onNewWord: PropTypes.func.isRequired,
    onSubmitFailure: PropTypes.func.isRequired,
    onSubmitSuccess: PropTypes.func.isRequired,
    pictograms: PropTypes.object.isRequired,
    revealAllChars: PropTypes.bool,
    usedWords: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = {
    wordInput: [],
    wordTranslation: '',
  };

  submitWord() {
    const { onNewWord, onSubmitFailure, usedWords } = this.props;
    const { wordInput } = this.state;

    const wordString = wordInput.join('');

    const newState = { wordInput: [] };

    const isValid =
      usedWords.indexOf(wordString) === -1 && isWordValid(wordString);

    if (isValid) {
      newState.wordTranslation = wordString;
    }

    this.setState(newState);

    if (isValid) {
      onNewWord(wordInput);
    } else {
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
    const { chars, knownChars, pictograms, revealAllChars } = this.props;
    const { wordInput, wordTranslation } = this.state;

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
            <Pictogram
              key={i}
              char={
                revealAllChars || knownChars.indexOf(char) !== -1 ? char : null
              }
              drawFns={pictograms[char]}
            />
          ))}
        </div>
        <Keyboard
          allowInput={!wordTranslation}
          chars={chars}
          knownChars={knownChars}
          pictograms={pictograms}
          revealAllChars={revealAllChars}
          onInput={char => this.setState({ wordInput: [...wordInput, char] })}
        />
      </div>
    );
  }
}

export default Input;
