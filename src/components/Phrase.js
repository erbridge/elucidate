import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Pictogram from './Pictogram';

import './Phrase.css';

class Phrase extends Component {
  static propTypes = {
    phrase: PropTypes.string.isRequired,
    pictograms: PropTypes.object.isRequired,
  };

  state = {
    pictograms: [],
  };

  generatePictograms({ phrase, pictograms }) {
    this.setState({
      pictograms: phrase
        .split('')
        .map((char, i) => <Pictogram key={i} drawFns={pictograms[char]} />),
    });
  }

  componentWillMount() {
    this.generatePictograms(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.phrase !== this.props.phrase ||
      nextProps.pictograms !== this.props.pictograms
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
