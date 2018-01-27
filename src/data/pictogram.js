import seedrandom from 'seedrandom';
import equals from 'shallow-equals';

const MAX_ATTEMPTS = 10000;

class Segment {
  constructor(drawFn) {
    this.drawFn = drawFn;
  }

  draw = (segment, colour) => {
    return this.drawFn(segment, colour);
  };
}

const parameters = {
  counts: {
    vowel: {
      primary: [0, 1, 1, 2],
      secondary: [0, 1, 1, 1, 1, 2, 2, 2, 3],
      tertiary: [0],
      quaternary: [0, 0, 0, 1, 1],
    },
    consonant: {
      primary: [0, 1, 1, 2],
      secondary: [0, 1, 1, 2, 2, 3, 4],
      tertiary: [
        0,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        3,
        3,
        3,
        3,
        3,
        4,
        4,
        5,
        5,
        5,
        6,
        6,
        7,
        8,
        9,
      ],
      quaternary: [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4],
    },
  },
  segments: {
    primary: [
      new Segment((element, colour) =>
        element
          .rect(140, 20)
          .fill(colour)
          .x(310)
          .cy(315),
      ),
      new Segment((element, colour) =>
        element
          .rect(20, 300)
          .fill(colour)
          .cx(300)
          .y(200),
      ),
    ],
    secondary: [
      new Segment((element, colour) =>
        element
          .circle(30)
          .fill(colour)
          .cx(450)
          .cy(350),
      ),
      new Segment((element, colour) =>
        element
          .circle(30)
          .fill(colour)
          .cx(310)
          .cy(350),
      ),
      new Segment((element, colour) =>
        element
          .circle(30)
          .fill(colour)
          .cx(250)
          .cy(250),
      ),
      new Segment((element, colour) =>
        element
          .circle(30)
          .fill(colour)
          .cx(155)
          .cy(205),
      ),
    ],
    tertiary: [
      new Segment((element, colour) =>
        element
          .rect(140, 4)
          .fill(colour)
          .x(310)
          .cy(425),
      ),
      new Segment((element, colour) =>
        element
          .rect(140, 4)
          .fill(colour)
          .x(310)
          .cy(400),
      ),
      new Segment((element, colour) =>
        element
          .rect(140, 4)
          .fill(colour)
          .x(310)
          .cy(375),
      ),
      new Segment((element, colour) =>
        element
          .polygon([
            [-2, -2],
            [140, -2],
            [140, 150],
            [136, 150],
            [136, 2],
            [-2, 2],
          ])
          .fill(colour)
          .x(310)
          .y(350),
      ),
      new Segment((element, colour) =>
        element
          .rect(205, 4)
          .fill(colour)
          .cx(250)
          .cy(50)
          .rotate(15),
      ),
      new Segment((element, colour) =>
        element
          .rect(205, 4)
          .fill(colour)
          .cx(250)
          .cy(25)
          .rotate(-15),
      ),
      new Segment((element, colour) =>
        element
          .rect(205, 4)
          .fill(colour)
          .cx(250)
          .cy(100)
          .rotate(-15),
      ),
      new Segment((element, colour) =>
        element
          .rect(205, 4)
          .fill(colour)
          .cx(250)
          .cy(125)
          .rotate(15),
      ),
      new Segment((element, colour) =>
        element
          .rect(205, 4)
          .fill(colour)
          .cx(250)
          .cy(175)
          .rotate(-15),
      ),
      new Segment((element, colour) =>
        element
          .rect(4, 205)
          .fill(colour)
          .cx(151)
          .y(0),
      ),
      new Segment((element, colour) =>
        element
          .rect(4, 205)
          .fill(colour)
          .cx(136)
          .y(0),
      ),
      new Segment((element, colour) =>
        element
          .rect(4, 205)
          .fill(colour)
          .cx(500 - 151)
          .y(0),
      ),
      new Segment((element, colour) =>
        element
          .rect(4, 205)
          .fill(colour)
          .cx(500 - 136)
          .y(0),
      ),
    ],
    quaternary: [
      new Segment((element, colour) =>
        element
          .polygon([[-2, -2], [70, -2], [70, 220], [66, 220], [66, 2], [-2, 2]])
          .fill(colour)
          .x(345)
          .y(280)
          .opacity(0.5),
      ),
      new Segment((element, colour) =>
        element
          .polygon([
            [-2, -2],
            [205, -2],
            [205, 245],
            [-2, 245],
            [-2, 241],
            [201, 241],
            [201, 2],
            [-2, 2],
          ])
          .fill(colour)
          .x(230)
          .y(255)
          .opacity(0.5),
      ),
      new Segment((element, colour) =>
        element
          .rect(30, 30)
          .fill('none')
          .stroke({ width: 4, color: colour })
          .x(30)
          .y(425)
          .rotate(45)
          .opacity(0.5),
      ),
      new Segment((element, colour) =>
        element
          .circle(70)
          .fill('none')
          .stroke({ width: 2, color: colour })
          .cx(250)
          .cy(250)
          .opacity(0.3),
      ),
      new Segment((element, colour) =>
        element
          .circle(330)
          .fill('none')
          .stroke({ width: 4, color: colour })
          .cx(250)
          .cy(250)
          .opacity(0.5),
      ),
      new Segment((element, colour) => {
        const mask = element.mask().add(element.rect(220, 435).fill('white'));

        return element
          .circle(435)
          .fill('none')
          .stroke({ width: 4, color: colour })
          .maskWith(mask)
          .cx(250)
          .cy(250)
          .rotate(-12) // FIXME: Why?!
          .opacity(0.5);
      }),
      new Segment((element, colour) =>
        element
          .rect(125, 2)
          .fill(colour)
          .x(-40)
          .cy(250)
          .rotate(-45, 250, 250)
          .opacity(0.5),
      ),
      new Segment((element, colour) =>
        element
          .rect(280, 2)
          .fill(colour)
          .x(-40)
          .cy(290)
          .rotate(-45, 250, 250)
          .opacity(0.5),
      ),
    ],
  },
};

const alphabet = [];

for (let i = 10; i < 36; i++) {
  alphabet.push(i.toString(36));
}

const selectDrawFns = (char, rng, usedDrawFns, attemptCount = 0) => {
  const charCode = char.charCodeAt(0);
  const countType =
    ['a', 'e', 'i', 'o', 'u'].indexOf(char) !== -1 ? 'vowel' : 'consonant';

  const drawFns = [];

  Object.keys(parameters.segments).forEach(key => {
    const segments = [...parameters.segments[key]];
    const count =
      parameters.counts[countType][key][
        (charCode * rng() + attemptCount) %
          parameters.counts[countType][key].length
      ];

    for (let i = 0; i < count; i++) {
      const [segment] = segments.splice(
        (charCode * rng() + attemptCount) % segments.length,
        1,
      );

      drawFns.push(segment.draw);
    }
  });

  if (!drawFns.length || usedDrawFns.find(fns => equals(fns, drawFns))) {
    if (attemptCount > MAX_ATTEMPTS) {
      throw new Error(`Unable to generate a pictogram for '${char}'`);
    }

    return selectDrawFns(char, rng, usedDrawFns, attemptCount + 1);
  }

  usedDrawFns.push(drawFns);

  return drawFns;
};

export const generatePictograms = seed => {
  console.log(`seed = ${seed}`);

  const rng = () => Math.abs(seedrandom(seed).int32());
  const usedDrawFns = [];

  return (
    alphabet
      // FIXME: We need to guarantee no two pictograms match.
      .map(char => [char, selectDrawFns(char, rng, usedDrawFns)])
      .reduce((acc, [char, drawFns]) => ({ ...acc, [char]: drawFns }), {
        '1': parameters.segments.primary.map(segment => segment.draw),
        '2': parameters.segments.secondary.map(segment => segment.draw),
        '3': parameters.segments.tertiary.map(segment => segment.draw),
        '4': parameters.segments.quaternary.map(segment => segment.draw),
      })
  );
};
