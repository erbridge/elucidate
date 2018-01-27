import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Keyboard from './Keyboard';

import './Input.css';

class Input extends Component {
  static propTypes = {
    chars: PropTypes.arrayOf(PropTypes.string).isRequired,
    pictograms: PropTypes.object.isRequired,
  };

  render() {
    const { chars, pictograms } = this.props;

    return (
      <div className="Input">
        <Keyboard chars={chars} pictograms={pictograms} />
      </div>
    );
  }
}

export default Input;
