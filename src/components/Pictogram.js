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

  makeSvg(node) {
    if (!this.pictogram) {
      this.pictogram = svg(node);
    }
  }

  generatePictogram({ char, seed }) {
    // FIXME: Pass this in instead of generating it every time.
    const pictograms = generatePictograms(seed);

    this.pictogram.clear();
    this.pictogram.viewbox(0, 0, 500, 500);

    pictograms[char].forEach(draw => draw(this.pictogram, 'white'));
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
          this.makeSvg(node);
        }}
        className="Pictogram"
      />
    );
  }
}

export default Pictogram;
