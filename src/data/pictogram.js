import seedrandom from 'seedrandom';

class Segment {
  constructor(drawFn) {
    this.drawFn = drawFn;
  }

  draw = segment => {
    return this.drawFn(segment);
  };
}

const parameters = {
  counts: [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
  segments: [
    new Segment(element => element.circle(20).center(450, 350)),
    new Segment(element => element.circle(20).center(325, 350)),
    new Segment(element => element.circle(20).center(250, 250)),
    new Segment(element => element.circle(20).center(175, 225)),
    new Segment(element =>
      element
        .rect(125, 2)
        .x(325)
        .cy(425),
    ),
    new Segment(element =>
      element
        .rect(125, 2)
        .x(325)
        .cy(400),
    ),
    new Segment(element =>
      element
        .rect(125, 2)
        .x(325)
        .cy(375),
    ),
    new Segment(element =>
      element
        .rect(125, 20)
        .x(325)
        .cy(315),
    ),
    new Segment(element =>
      element
        .polygon([
          [-1, -1],
          [125, -1],
          [125, 150],
          [123, 150],
          [123, 1],
          [-1, 1],
        ])
        .x(325)
        .y(350),
    ),
  ],
};

const alphabet = [];

for (let i = 10; i < 36; i++) {
  alphabet.push(i.toString(36));
}

export const generatePictograms = seed => {
  const rng = () => Math.abs(seedrandom(seed).int32());

  return alphabet
    .map(char => {
      const charCode = char.charCodeAt(0);
      const segments = [...parameters.segments];
      const count =
        parameters.counts[(charCode * rng()) % parameters.counts.length];

      const drawFns = [];

      // FIXME: We need to guarantee no two pictograms match.
      for (let i = 0; i < count; i++) {
        const [segment] = segments.splice(
          (charCode * rng()) % segments.length,
          1,
        );

        drawFns.push(segment.draw);
      }

      return [char, drawFns];
    })
    .reduce((acc, [char, drawFns]) => ({ ...acc, [char]: drawFns }), {
      ' ': parameters.segments.map(segment => segment.draw),
    });
};
