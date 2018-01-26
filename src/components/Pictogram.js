import PropTypes from 'prop-types';
import React, { Component } from 'react';
import svg from 'svg.js';

import { generatePictograms } from '../data/pictogram';

import './Pictogram.css';

class Pictogram extends Component {
  static propTypes = {
    char: PropTypes.string.isRequired,
    seed: PropTypes.number.isRequired,
  };

  generatePictogram({ char, seed }) {
    // FIXME: Pass this in instead of generating it every time.
    const pictograms = generatePictograms(seed);

    this.pictogram.clear();

    pictograms[char].forEach(draw => draw(this.pictogram));
  }

  componentDidMount() {
    this.generatePictogram(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.char !== this.props.char ||
      nextProps.seed !== this.props.seed
    ) {
      this.generatePictogram(nextProps);
    }
  }

  render() {
    return (
      <div
        ref={node => {
          this.pictogram = svg(node);
        }}
        className="Pictogram"
      />
    );
  }
}

export default Pictogram;
