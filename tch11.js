const fs = require("fs");

const loadFile = async () => {
  return await fs.readFileSync("submitinput11.txt").toString().split("\n");
};

const getAllNumbers = (number, valids) => {
  let result = 0;

  const part = (n, max, buffer) => {
    if (n === 0) {
      result++;
      return;
    }

    for (let index = Math.min(max, n); index >= 1; index--) {
      if (valids.includes(index)) {
        part(n - index, index, [...buffer, index]);
      }
    }
  };

  part(number, number, []);
  return result - 1;
};

(async () => {
  const lines = await loadFile();
  for (let index = 1; index <= lines[0]; index++) {
    const [number, ...nv] = lines[index].split(" ");
    const nNumber = parseInt(number);
    const nonValids = nv.map((nvv) => parseInt(nvv));
    const valids = Array.from(Array(nNumber), (_, i) => i + 1).filter(
      (num) => !nonValids.includes(num)
    );

    const result = getAllNumbers(Number(number), valids);
    console.log(`Case #${index}: ${result}`);
  }
})();
