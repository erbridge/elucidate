import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Keyboard from './Keyboard';
import Pictogram from './Pictogram';

import './Input.css';

class Input extends Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.string).isRequired,
    pictograms: PropTypes.object.isRequired,
  };

  state = {
    word: [],
  };

  render() {
    const { chars, pictograms } = this.props;
    const { word } = this.state;

    return (
      <div className="Input">
        <div className="Input__word">
          {word.map((char, i) => (
            <Pictogram key={i} drawFns={pictograms[char]} />
          ))}
        </div>
        <Keyboard
          chars={chars}
          handleInput={char => this.setState({ word: [...word, char] })}
          pictograms={pictograms}
        />
      </div>
    );
  }
}

export default Input;
