import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Pictogram from './Pictogram';

import './Keyboard.css';

class Keyboard extends Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleInput: PropTypes.func.isRequired,
    pictograms: PropTypes.object.isRequired,
  };

  render() {
    const { chars, handleInput, pictograms } = this.props;

    return (
      <div className="Keyboard">
        {chars.map(char => (
          <div
            key={char}
            className="Keyboard__key"
            onClick={() => handleInput(char)}
          >
            <Pictogram drawFns={pictograms[char]} />{' '}
          </div>
        ))}
      </div>
    );
  }
}

export default Keyboard;
