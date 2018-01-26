import seedrandom from 'seedrandom';

const parameters = {
  counts: [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 5],
  elements: [
    {
      draw(element) {
        return element
          .polyline('0,0 100,50 50,100')
          .fill('none')
          .stroke({ width: 1 });
      },
    },
    {
      draw(element) {
        return element
          .polyline('0,100 0,50 50,100')
          .fill('none')
          .stroke({ width: 1 });
      },
    },
    {
      draw(element) {
        return element
          .polyline('0,100 50,50 50,100')
          .fill('none')
          .stroke({ width: 1 });
      },
    },
    {
      draw(element) {
        return element
          .polyline('0,0 100,100')
          .fill('none')
          .stroke({ width: 1 });
      },
    },
    {
      draw(element) {
        return element
          .polyline('0,0 50,100')
          .fill('none')
          .stroke({ width: 1 });
      },
    },
  ],
};

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export const generatePictograms = seed => {
  const rng = () => Math.abs(seedrandom(seed).int32());

  return alphabet
    .map(char => {
      const charCode = char.charCodeAt(0);
      const elements = [...parameters.elements];
      const count =
        parameters.counts[(charCode * rng()) % parameters.counts.length];

      const drawFns = [];

      // FIXME: We need to guarantee no two pictograms match.
      for (let i = 0; i < count; i++) {
        const [element] = elements.splice(
          (charCode * rng()) % elements.length,
          1,
        );

        drawFns.push(element.draw);
      }

      return [char, drawFns];
    })
    .reduce((acc, [char, drawFns]) => ({ ...acc, [char]: drawFns }), {});
};
