import React, { Component, Fragment } from 'react';
import Sound from 'react-sound';
import shuffle from 'shuffle-array';

import Input from './components/Input';
import Message from './components/Message';

import { generatePictograms } from './data/pictogram';
import { MessageData, getNextMessage } from './data/messages';

import ambienceSound from './assets/audio/ambience.mp3';

import './App.css';

const SEED = Math.floor(Math.random() * 100000);
const PICTOGRAMS = generatePictograms(SEED);

class App extends Component {
  state = {
    messageImage: null,
    messageWords: '',
    score: 0,
    seenChars: {},
    shouldAllowInput: true,
    shouldPlayAudio: true,
    shouldRevealAllChars: false,
  };

  updateMessage({ score }) {
    this.setState(({ seenChars }) => {
      const messageData = getNextMessage(Math.ceil(score));
      const messageType = messageData.getType();
      const messageWords = messageData.getWords();
      const messageImage = messageData.getImage();

      return {
        messageImage,
        messageWords,
        seenChars: shuffle(
          Object.keys(
            messageWords
              .map(word =>
                word
                  .split('')
                  .reduce((acc, char) => ({ ...acc, [char]: true }), {}),
              )
              .reduce((acc, chars) => ({ ...acc, ...chars }), {}),
          ),
        ).reduce((acc, char) => ({ ...acc, [char]: true }), { ...seenChars }),
        shouldAllowInput:
          messageType !== MessageData.types.success &&
          messageType !== MessageData.types.failure,
        shouldRevealAllChars: messageType === MessageData.types.success,
      };
    });
  }

  handleInput(scoreDelta) {
    const { score } = this.state;

    this.setState({ score: score + scoreDelta });
  }

  componentWillMount() {
    this.updateMessage(this.state);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.score !== this.state.score) {
      this.updateMessage(nextState);
    }
  }

  render() {
    const {
      messageImage,
      messageWords,
      seenChars,
      shouldAllowInput,
      shouldPlayAudio,
      shouldRevealAllChars,
    } = this.state;

    return (
      <div className="App">
        <div className="App__content">
          <img className="App__background" src={messageImage} alt="" />
          <button
            onClick={() => this.setState({ shouldPlayAudio: !shouldPlayAudio })}
            style={{ position: 'fixed' }}
          >
            {shouldPlayAudio ? 'mute' : 'unmute'}
          </button>
          <Sound
            url={ambienceSound}
            playStatus={Sound.status.PLAYING}
            volume={shouldPlayAudio ? 100 : 0}
            loop
          />
          <Message
            phrases={messageWords}
            pictograms={PICTOGRAMS}
            revealAllChars={shouldRevealAllChars}
          />
          {shouldAllowInput && (
            <Fragment>
              <div className="App__spacer" />
              <Input
                chars={Object.keys(seenChars)}
                pictograms={PICTOGRAMS}
                revealAllChars={shouldRevealAllChars}
                onSubmitFailure={scoreDelta => this.handleInput(scoreDelta)}
                onSubmitSuccess={scoreDelta => this.handleInput(scoreDelta)}
              />
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;
