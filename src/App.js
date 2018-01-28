import React, { Component, Fragment } from 'react';
import Sound from 'react-sound';
import shuffle from 'shuffle-array';

import Input from './components/Input';
import Message from './components/Message';
import TitleScreen from './components/TitleScreen';

import { generatePictograms } from './data/pictogram';
import { MessageData, getNextMessage } from './data/messages';

import ambienceSound from './assets/audio/ambience.mp3';

import './App.css';

const SEED = Math.floor(Math.random() * 100000);
const PICTOGRAMS = generatePictograms(SEED);

class App extends Component {
  state = {
    knownChars: {},
    messageImage: null,
    messageWords: '',
    score: 0,
    seenChars: {},
    shouldAllowInput: true,
    shouldPlayAudio: true,
    shouldRevealAllChars: false,
    shouldShowImage: false,
    shouldShowNextImage: true,
    shouldShowTitleScreen: true,
    usedWords: {},
  };

  updateMessage({ score, seenChars, shouldShowNextImage, usedWords }) {
    const messageData = getNextMessage(Math.ceil(score));
    const messageType = messageData.getType();
    const messageWords = messageData.getWords();
    const messageImage = messageData.getImage();

    this.setState({
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
      shouldRevealAllChars:
        messageType === MessageData.types.success ||
        messageType === MessageData.types.failure,
      shouldShowImage: shouldShowNextImage,
      shouldShowNextImage: false,
      usedWords:
        messageType === MessageData.types.fool
          ? usedWords
          : {
              ...usedWords,
              ...messageWords.reduce(
                (acc, word) => ({ ...acc, [word]: true }),
                {},
              ),
            },
    });
  }

  handleNewWord(newChars) {
    const { knownChars, usedWords } = this.state;

    this.setState({
      knownChars: newChars.reduce((acc, char) => ({ ...acc, [char]: true }), {
        ...knownChars,
      }),
      usedWords: { ...usedWords, [newChars.join('')]: true },
    });
  }

  handleInput(scoreDelta) {
    const { score } = this.state;

    const newScore = score + scoreDelta;

    this.setState({
      score: newScore,
      shouldShowNextImage: Math.ceil(newScore) !== Math.ceil(score),
    });
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
      knownChars,
      messageImage,
      messageWords,
      seenChars,
      shouldAllowInput,
      shouldPlayAudio,
      shouldRevealAllChars,
      shouldShowImage,
      shouldShowTitleScreen,
      usedWords,
    } = this.state;

    return (
      <div
        className="App"
        onClick={() =>
          shouldShowTitleScreen
            ? this.setState({
                shouldShowTitleScreen: false,
              })
            : this.setState({
                shouldShowImage: false,
              })
        }
      >
        {shouldShowTitleScreen && <TitleScreen />}
        {!shouldShowTitleScreen && (
          <Fragment>
            {shouldShowImage &&
              messageImage && (
                <img className="App__background" src={messageImage} alt="" />
              )}
            <Sound
              url={ambienceSound}
              playStatus={Sound.status.PLAYING}
              volume={shouldPlayAudio ? 100 : 0}
              loop
            />
            {!(shouldShowImage && messageImage) && (
              <Fragment>
                <Message
                  knownChars={Object.keys(knownChars)}
                  phrases={messageWords}
                  pictograms={PICTOGRAMS}
                  revealAllChars={shouldRevealAllChars}
                />
                {shouldAllowInput && (
                  <Fragment>
                    <div className="App__spacer" />
                    <Input
                      chars={Object.keys(seenChars)}
                      knownChars={Object.keys(knownChars)}
                      pictograms={PICTOGRAMS}
                      revealAllChars={shouldRevealAllChars}
                      onNewWord={newChars => this.handleNewWord(newChars)}
                      onSubmitFailure={scoreDelta =>
                        this.handleInput(scoreDelta)
                      }
                      onSubmitSuccess={scoreDelta =>
                        this.handleInput(scoreDelta)
                      }
                      usedWords={Object.keys(usedWords)}
                    />
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default App;
