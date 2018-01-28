import foolImage from '../assets/images/0_thefool.png';
import magicianImage from '../assets/images/01_themagician.png';
import priestessImage from '../assets/images/02_thehighpriestess.png';
import empressImage from '../assets/images/03_theempress.png';
import emperorImage from '../assets/images/04_theemperor.png';
import heirophantImage from '../assets/images/05_theheirophant.png';
import loversImage from '../assets/images/06_thelovers.png';
import chariotImage from '../assets/images/07_thechariot.png';
import strengthImage from '../assets/images/08_strength.png';
import hermitImage from '../assets/images/09_thehermit.png';
import wheelImage from '../assets/images/10_wheeloffortune.png';
import justiceImage from '../assets/images/11_justice.png';
import hangedImage from '../assets/images/12_thehangedman.png';
import deathImage from '../assets/images/13_death.png';
import temperanceImage from '../assets/images/14_temperance.png';
import devilImage from '../assets/images/15_thedevil.png';
import towerImage from '../assets/images/16_thetower.png';
import starImage from '../assets/images/17_thestar.png';
import moonImage from '../assets/images/18_themoon.png';
import sunImage from '../assets/images/19_thesun.png';
import judgementImage from '../assets/images/20_judgement.png';
import worldImage from '../assets/images/21_theworld.png';

export class MessageData {
  static types = {
    default: 'default',
    failure: 'failure',
    fool: 'fool',
    magician: 'magician',
    priestess: 'priestess',
    empress: 'empress',
    emperor: 'emperor',
    heirophant: 'heirophant',
    lovers: 'lovers',
    chariot: 'chariot',
    strength: 'strength',
    hermit: 'hermit',
    wheel: 'wheel',
    justice: 'justice',
    hanged: 'hanged',
    death: 'death',
    temperance: 'temperance',
    devil: 'devil',
    tower: 'tower',
    star: 'star',
    moon: 'moon',
    sun: 'sun',
    judgement: 'judgement',
    world: 'world',
    success: 'success',
  };

  static images = {
    fool: foolImage,
    magician: magicianImage,
    priestess: priestessImage,
    empress: empressImage,
    emperor: emperorImage,
    heirophant: heirophantImage,
    lovers: loversImage,
    chariot: chariotImage,
    strength: strengthImage,
    hermit: hermitImage,
    wheel: wheelImage,
    justice: justiceImage,
    hanged: hangedImage,
    death: deathImage,
    temperance: temperanceImage,
    devil: devilImage,
    tower: towerImage,
    star: starImage,
    moon: moonImage,
    sun: sunImage,
    judgement: judgementImage,
    world: worldImage,
  };

  constructor(type = MessageData.types.default, words = []) {
    this.type = type;
    this.words = words;
  }

  getType() {
    return this.type;
  }

  getWords() {
    return this.words;
  }

  getImage() {
    return MessageData.images[this.type];
  }
}

const parameters = {
  messages: [
    new MessageData(MessageData.types.failure, ['try', 'again']),
    new MessageData(MessageData.types.fool, ['fool']),
    new MessageData(MessageData.types.magician, ['answer']),
    new MessageData(MessageData.types.priestess, ['change']),
    new MessageData(MessageData.types.empress, ['give']),
    new MessageData(MessageData.types.emperor, ['power']),
    new MessageData(MessageData.types.heirophant, ['rule']),
    new MessageData(MessageData.types.lovers, ['love']),
    new MessageData(MessageData.types.chariot, ['steal']),
    new MessageData(MessageData.types.strength, ['hero']),
    new MessageData(MessageData.types.hermit, ['alone']),
    new MessageData(MessageData.types.wheel, ['unknown']),
    new MessageData(MessageData.types.justice, ['law']),
    new MessageData(MessageData.types.hanged, ['martyr']),
    new MessageData(MessageData.types.death, ['end']),
    new MessageData(MessageData.types.temperance, ['patience']),
    new MessageData(MessageData.types.devil, ['tempt']),
    new MessageData(MessageData.types.tower, ['fail']),
    new MessageData(MessageData.types.star, ['impossible']),
    new MessageData(MessageData.types.moon, ['want']),
    new MessageData(MessageData.types.sun, ['win']),
    new MessageData(MessageData.types.judgement, ['result']),
    new MessageData(MessageData.types.world, ['equal']),
    new MessageData(MessageData.types.success, [
      'aid',
      'exchange',
      'destroy',
      'take',
    ]),
  ],
};

export const getNextMessage = score => {
  return parameters.messages[score + 1] || new MessageData();
};
