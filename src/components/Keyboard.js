import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Pictogram from './Pictogram';

import './Keyboard.css';

class Keyboard extends Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleInput: PropTypes.func.isRequired,
    knownChars: PropTypes.arrayOf(PropTypes.string).isRequired,
    pictograms: PropTypes.object.isRequired,
  };

  render() {
    const { chars, handleInput, pictograms, knownChars } = this.props;

    return (
      <div className="Keyboard">
        {chars.map(char => (
          <div
            key={char}
            className="Keyboard__key"
            onClick={() => handleInput(char)}
          >
            <Pictogram drawFns={pictograms[char]} />
            {knownChars.indexOf(char) !== -1 && (
              <div className="Keyboard__translation">{char}</div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default Keyboard;
