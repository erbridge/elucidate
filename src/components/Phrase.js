import PropTypes from 'prop-types';
import React, { Component } from 'react';
import equals from 'shallow-equals';

import Pictogram from './Pictogram';

import './Phrase.css';

class Phrase extends Component {
  static propTypes = {
    knownChars: PropTypes.arrayOf(PropTypes.string).isRequired,
    phrase: PropTypes.string.isRequired,
    pictograms: PropTypes.object.isRequired,
    revealAllChars: PropTypes.bool,
  };

  state = {
    pictograms: [],
  };

  generatePictograms({ knownChars, phrase, pictograms, revealAllChars }) {
    this.setState({
      pictograms: phrase
        .split('')
        .map((char, i) => (
          <Pictogram
            key={i}
            char={
              revealAllChars || knownChars.indexOf(char) !== -1 ? char : null
            }
            drawFns={pictograms[char]}
          />
        )),
    });
  }

  componentWillMount() {
    this.generatePictograms(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !equals(nextProps.knownChars, this.props.knownChars) ||
      !equals(nextProps.phrases, this.props.phrases) ||
      !equals(nextProps.pictograms, this.props.pictograms) ||
      nextProps.revealAllChars !== this.props.revealAllChars
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
