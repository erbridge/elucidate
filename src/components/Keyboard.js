import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Pictogram from './Pictogram';

import './Keyboard.css';

class Keyboard extends Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.string).isRequired,
    pictograms: PropTypes.object.isRequired,
  };

  render() {
    const { chars, pictograms } = this.props;

    return (
      <div className="Keyboard">
        {chars.map(char => <Pictogram key={char} drawFns={pictograms[char]} />)}
      </div>
    );
  }
}

export default Keyboard;
