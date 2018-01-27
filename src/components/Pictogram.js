import PropTypes from 'prop-types';
import React, { Component } from 'react';
import svg from 'svg.js';

import './Pictogram.css';

class Pictogram extends Component {
  static propTypes = {
    drawFns: PropTypes.arrayOf(PropTypes.func).isRequired,
  };

  makeSvg(node) {
    if (!this.pictogram) {
      this.pictogram = svg(node);
    }
  }

  generatePictogram({ drawFns }) {
    this.pictogram.clear();
    this.pictogram.viewbox(0, 0, 500, 500);

    drawFns.forEach(draw => draw(this.pictogram, 'white'));
  }

  componentDidMount() {
    this.generatePictogram(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.drawFns !== this.props.drawFns) {
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
