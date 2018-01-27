import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Phrase from './Phrase';

import './Message.css';

class Message extends Component {
  static propTypes = {
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
    pictograms: PropTypes.object.isRequired,
  };

  state = {
    phrases: [],
  };

  generatePhrases({ phrases, pictograms }) {
    this.setState({
      phrases: phrases.map((phrase, i) => (
        <Phrase key={i} phrase={phrase} pictograms={pictograms} />
      )),
    });
  }

  componentWillMount() {
    this.generatePhrases(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.phrases !== this.props.phrases ||
      nextProps.pictograms !== this.props.pictograms
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
