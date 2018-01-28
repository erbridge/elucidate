import allWords from 'an-array-of-english-words';

const parameters = {
  input: { validWords: allWords.filter(word => word.length > 3) },
};

export const isWordValid = word => {
  return parameters.input.validWords.indexOf(word) !== -1;
};
