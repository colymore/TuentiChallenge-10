//Incomplete
const connect = require("net");
const client = connect.connect("2003", "52.49.91.111");
const movs = {
  "1U2L": [-1, -2],
  "2U1L": [-2, -1],
  "2U1R": [-2, 1],
  "1U2R": [-1, 2],
  "1D2R": [1, 2],
  "2D1R": [2, 1],
  "2D1L": [2, -1],
  "1D2L": [1, -2],
};

const inverMovs = {
  "2U1L": "2D1R",
  "1U2L": "1D2R",
  "2U1R": "2D1L",
  "1U2R": "1D2L",
  "1D2R": "1U2L",
  "2D1R": "2U1L",
  "2D1L": "2U1R",
  "1D2L": "1U2R",
};

let k = [2, 2];
let p = [2, 3];

const chunkArray = (data) => {
  const chunked = [];
  let index = 0;
  while (index < data.length) {
    chunked.push(data.slice(index, 5 + index));
    index += 5;
  }
  return chunked;
};

const getBoard = (data) => {
  const content = data.toString().split("---")[0];
  return chunkArray(
    [...content].filter((element) => {
      return element !== "\n";
    })
  );
};

const searchChar = (data, char) => {
  for (let row = 0; row < data.length; row++) {
    const r = data[row];
    for (let col = 0; col < r.length; col++) {
      if (r[col] === char) {
        return [row, col];
      }
    }
  }
  return [-1, -1];
};

const sendMove = (movement) => {
  console.log("Sending move: " + movement);
  client.write(movement);
};

const heroi = (board, movs) => {
  const movements = new Set();
  const getValidMovements = (board) => {
    let find = false;
    const allowedMovs = [];
    for (let [name, mov] of Object.entries(movs)) {
      if (!find) {
        const newPos = [k[0] + mov[0], k[1] + mov[1]];
        if (board[newPos[0]][newPos[1]] === "P") {
          allowedMovs.splice(0, allowedMovs.length);
          allowedMovs.push(name);
          find = true;
        }
        if (board[newPos[0]][newPos[1]] === ".") {
          allowedMovs.push(name);
        }
      }
    }
    return allowedMovs;
  };

  movements.push(getValidMovements(board));
  console.log(pendingMovements);
  sendMove(pendingMovements[0].pop());
};

client.on("data", function (data) {
  console.log("\nReceived new board: \n");
  console.log(data.toString());
  const board = getBoard(data);
  console.log(board);
  heroi(board, new Set());
});
