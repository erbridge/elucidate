import PropTypes from 'prop-types';
import React, { Component } from 'react';
import equals from 'shallow-equals';

import Phrase from './Phrase';

import './Message.css';

class Message extends Component {
  static propTypes = {
    knownChars: PropTypes.arrayOf(PropTypes.string).isRequired,
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
    pictograms: PropTypes.object.isRequired,
    revealAllChars: PropTypes.bool,
  };

  state = {
    phrases: [],
  };

  generatePhrases({ knownChars, phrases, pictograms, revealAllChars }) {
    this.setState({
      phrases: phrases.map((phrase, i) => (
        <Phrase
          key={i}
          knownChars={knownChars}
          phrase={phrase}
          pictograms={pictograms}
          revealAllChars={revealAllChars}
        />
      )),
    });
  }

  componentWillMount() {
    this.generatePhrases(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !equals(nextProps.knownChars, this.props.knownChars) ||
      !equals(nextProps.phrases, this.props.phrases) ||
      !equals(nextProps.pictograms, this.props.pictograms) ||
      nextProps.revealAllChars !== this.props.revealAllChars
    ) {
      this.generatePhrases(nextProps);
    }
  }

  render() {
    const { phrases } = this.state;

    return <div className="Message">{phrases}</div>;
  }
}

export default Message;
