import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Pictogram from './Pictogram';

import './Keyboard.css';

class Keyboard extends Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.string).isRequired,
    knownChars: PropTypes.arrayOf(PropTypes.string).isRequired,
    onInput: PropTypes.func.isRequired,
    pictograms: PropTypes.object.isRequired,
  };

  render() {
    const { chars, knownChars, onInput, pictograms } = this.props;

    return (
      <div className="Keyboard">
        {chars.map(char => (
          <div
            key={char}
            className="Keyboard__key"
            onClick={() => onInput(char)}
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
