const fs = require("fs");
const loadFile = async () => {
  try {
    const data = await fs.readFileSync("testInput.txt").toString().split("\n");
    return data;
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
};

const getWinner = (results) => {
  const getMatchInfo = (match) => {
    const matchValues = match.split(" ");
    const a = matchValues[0];
    const b = matchValues[1];
    const winner = matchValues[2];
    return { a, b, winner };
  };
  const resultsMap = new Map();
  results.map((result) => {
    const { a, b, winner } = getMatchInfo(result);
    const winnerIndex = winner == 1 ? a : b;
    const wins = resultsMap.has(winnerIndex)
      ? resultsMap.get(result === 1 ? a : b)
      : 0;
    resultsMap.set(winnerIndex, wins);
  });
  return [...resultsMap.entries()].reduce((k, v) => (v[1] > k[1] ? v : k));
};

(async () => {
  const lines = await loadFile();
  const cases = Number.parseInt(lines.splice(0, 1)[0]);

  for (let currentCase = 0; currentCase < cases; currentCase++) {
    const matchsNumber = Number.parseInt(lines.splice(0, 1)[0]);
    const matchsResults = lines.splice(0, matchsNumber);
    console.log(`Case #${currentCase + 1}: ${getWinner(matchsResults)[0]}`);
  }
})();
