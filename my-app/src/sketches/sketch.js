// Example sketches for each clue
const sketch = {
    '1': function (p) {
      p.setup = function () {
        p.createCanvas(200, 200);
        p.background(100);
      };
  
      p.draw = function () {
        p.fill(255, 0, 0);
        p.ellipse(p.width / 2, p.height / 2, 50, 50);
      };
    },
    '2': function (p) {
      p.setup = function () {
        p.createCanvas(200, 200);
        p.background(150);
      };
  
      p.draw = function () {
        p.fill(0, 255, 0);
        p.rect(p.width / 2 - 25, p.height / 2 - 25, 50, 50);
      };
    },
    '3': function (p) {
      p.setup = function () {
        p.createCanvas(200, 200);
        p.background(200);
      };
  
      p.draw = function () {
        p.fill(0, 0, 255);
        p.triangle(
          p.width / 2, p.height / 2 - 30,
          p.width / 2 - 30, p.height / 2 + 30,
          p.width / 2 + 30, p.height / 2 + 30
        );
      };
    }
  };
  
  export default sketch;
  