import React, { Component } from 'react';

import titleImage from '../assets/images/title.png';

import './TitleScreen.css';

class TitleScreen extends Component {
  render() {
    return (
      <div className="TitleScreen">
        <img className="TitleScreen__image" src={titleImage} alt="elucidate" />
      </div>
    );
  }
}

export default TitleScreen;
