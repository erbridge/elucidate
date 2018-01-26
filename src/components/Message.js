import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Phrase from './Phrase';

class Message extends Component {
  static propTypes = {
    phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
    seed: PropTypes.number.isRequired,
  };

  state = {
    phrases: [],
  };

  generatePhrases({ phrases, seed }) {
    this.setState({
      phrases: phrases.map((phrase, i) => (
        <Phrase key={i} phrase={phrase} seed={seed} />
      )),
    });
  }

  componentWillMount() {
    this.generatePhrases(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.phrases !== this.props.phrases ||
      nextProps.seed !== this.props.seed
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
