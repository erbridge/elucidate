import seedrandom from 'seedrandom';

class Segment {
  constructor(drawFn) {
    this.drawFn = drawFn;
  }

  draw = (segment, colour) => {
    return this.drawFn(segment, colour);
  };
}

const parameters = {
  counts: [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
  segments: [
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
    new Segment((element, colour) =>
      element
        .rect(140, 2)
        .fill(colour)
        .x(310)
        .cy(425),
    ),
    new Segment((element, colour) =>
      element
        .rect(140, 2)
        .fill(colour)
        .x(310)
        .cy(400),
    ),
    new Segment((element, colour) =>
      element
        .rect(140, 2)
        .fill(colour)
        .x(310)
        .cy(375),
    ),
    new Segment((element, colour) =>
      element
        .rect(140, 20)
        .fill(colour)
        .x(310)
        .cy(315),
    ),
    new Segment((element, colour) =>
      element
        .polygon([
          [-1, -1],
          [140, -1],
          [140, 150],
          [138, 150],
          [138, 1],
          [-1, 1],
        ])
        .fill(colour)
        .x(310)
        .y(350),
    ),
    new Segment((element, colour) =>
      element
        .rect(205, 2)
        .fill(colour)
        .cx(250)
        .cy(50)
        .rotate(15),
    ),
    new Segment((element, colour) =>
      element
        .rect(205, 2)
        .fill(colour)
        .cx(250)
        .cy(25)
        .rotate(-15),
    ),
    new Segment((element, colour) =>
      element
        .rect(205, 2)
        .fill(colour)
        .cx(250)
        .cy(100)
        .rotate(-15),
    ),
    new Segment((element, colour) =>
      element
        .rect(205, 2)
        .fill(colour)
        .cx(250)
        .cy(125)
        .rotate(15),
    ),
    new Segment((element, colour) =>
      element
        .rect(205, 2)
        .fill(colour)
        .cx(250)
        .cy(175)
        .rotate(-15),
    ),
    new Segment((element, colour) =>
      element
        .rect(2, 205)
        .fill(colour)
        .cx(151)
        .y(0),
    ),
    new Segment((element, colour) =>
      element
        .rect(2, 205)
        .fill(colour)
        .cx(136)
        .y(0),
    ),
    new Segment((element, colour) =>
      element
        .rect(2, 205)
        .fill(colour)
        .cx(500 - 151)
        .y(0),
    ),
    new Segment((element, colour) =>
      element
        .rect(2, 205)
        .fill(colour)
        .cx(500 - 136)
        .y(0),
    ),
    new Segment((element, colour) =>
      element
        .rect(20, 300)
        .fill(colour)
        .cx(300)
        .y(200),
    ),
    new Segment((element, colour) =>
      element
        .polygon([[-1, -1], [70, -1], [70, 220], [68, 220], [68, 1], [-1, 1]])
        .fill(colour)
        .x(345)
        .y(280)
        .opacity(0.5),
    ),
    new Segment((element, colour) =>
      element
        .polygon([
          [-1, -1],
          [205, -1],
          [205, 245],
          [-1, 245],
          [-1, 243],
          [203, 243],
          [203, 1],
          [-1, 1],
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
        .stroke({ width: 2, color: colour })
        .x(30)
        .y(425)
        .rotate(45)
        .opacity(0.5),
    ),
    new Segment((element, colour) =>
      element
        .circle(70)
        .fill('none')
        .stroke({ width: 1, color: colour })
        .cx(250)
        .cy(250)
        .opacity(0.3),
    ),
    new Segment((element, colour) =>
      element
        .circle(330)
        .fill('none')
        .stroke({ width: 2, color: colour })
        .cx(250)
        .cy(250)
        .opacity(0.5),
    ),
    new Segment((element, colour) => {
      const mask = element.mask().add(element.rect(220, 435).fill('white'));

      return element
        .circle(435)
        .fill('none')
        .stroke({ width: 2, color: colour })
        .maskWith(mask)
        .cx(250)
        .cy(250)
        .rotate(-12) // FIXME: Why?!
        .opacity(0.5);
    }),
    new Segment((element, colour) =>
      element
        .rect(125, 1)
        .fill(colour)
        .x(-40)
        .cy(250)
        .rotate(-45, 250, 250)
        .opacity(0.5),
    ),
    new Segment((element, colour) =>
      element
        .rect(280, 1)
        .fill(colour)
        .x(-40)
        .cy(290)
        .rotate(-45, 250, 250)
        .opacity(0.5),
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
