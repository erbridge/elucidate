import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Pictogram from './Pictogram';

import './Phrase.css';

class Phrase extends Component {
  static propTypes = {
    phrase: PropTypes.string.isRequired,
    seed: PropTypes.number.isRequired,
  };

  state = {
    pictograms: [],
  };

  generatePictograms({ phrase, seed }) {
    this.setState({
      pictograms: phrase
        .split('')
        .map((char, i) => <Pictogram key={i} char={char} seed={seed} />),
    });
  }

  componentWillMount() {
    this.generatePictograms(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.phrase !== this.props.phrase ||
      nextProps.seed !== this.props.seed
    ) {
      this.generatePictograms(nextProps);
    }
  }

  render() {
    const { pictograms } = this.state;

    return <div className="Phrase">{pictograms}</div>;
  }
}

export default Phrase;
