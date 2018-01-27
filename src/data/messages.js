export class MessageData {
  static types = {
    default: -2,
    failure: -1,
    fool: 0,
    magician: 1,
    success: 2, // TODO: Make this the last one.
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
}

const parameters = {
  messages: [
    new MessageData(MessageData.types.failure),
    new MessageData(MessageData.types.fool, ['fool']),
    new MessageData(MessageData.types.magician, ['sex', 'magic']),
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
