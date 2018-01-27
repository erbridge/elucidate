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
    revealAllChars: PropTypes.bool,
  };

  render() {
    const {
      chars,
      knownChars,
      onInput,
      pictograms,
      revealAllChars,
    } = this.props;

    return (
      <div className="Keyboard">
        {chars.map(char => (
          <div
            key={char}
            className="Keyboard__key"
            onClick={() => onInput(char)}
          >
            <Pictogram
              char={
                revealAllChars || knownChars.indexOf(char) !== -1 ? char : null
              }
              drawFns={pictograms[char]}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Keyboard;
