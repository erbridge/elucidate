class Message {
  static types = {
    default: -1,
    fool: 0,
    magician: 1,
  };

  constructor(type = Message.types.default, words = []) {
    this.type = type;
    this.words = words;
  }

  getWords() {
    return this.words;
  }
}

const parameters = {
  messages: [
    new Message(Message.types.fool, ['a', 'fool', 'e']),
    new Message(Message.types.magician, ['sex', 'magic']),
  ],
};

export const getNextMessage = score => {
  return parameters.messages[score] || new Message();
};
