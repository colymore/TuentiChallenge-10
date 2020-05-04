const fs = require("fs");
const readline = require("readline");

const loadFile = async () => {
  try {
    const data = await fs.readFileSync("testInput.txt").toString().split("\n");
    return data;
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
};

const game = (c, index) => {
  const values = {
    R: 1,
    P: 2,
    S: 3,
  };
  const caseValues = c.split(" ");
  const first = values[caseValues[0]];
  const second = values[caseValues[1]];

  if (first === second) return `Case #${index}: -`;
  if ((second - first + 5) % 3 === 0) return `Case #${index}: ${caseValues[1]}`;
  return `Case #${index}: ${caseValues[0]}`;
};

(async () => {
  const lines = await loadFile();
  const cases = Number.parseInt(lines.splice(0, 1)[0]);
  lines.map((line, index) => {
    const result = game(line, index);
    console.log(result);
  });
})();
