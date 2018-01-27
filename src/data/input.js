const parameters = {
  input: { validWords: ['fall', 'fell', 'fool'] },
};

export const isWordValid = word => {
  return parameters.input.validWords.indexOf(word) !== -1;
};
