const fs = require("fs");

const loadFile = async () => {
  try {
    const data = await fs
      .readFileSync("submitInput (2).txt")
      .toString()
      .split("\n");
    return data;
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
};

const loadBook = async () => {
  try {
    const data = await fs.readFileSync("pg17013.txt").toString();
    return data;
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
};

const validLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ñ",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "á",
  "é",
  "í",
  "ó",
  "ú",
  "ü",
];

const parseBook = (book) => {
  const toLowerCase = (word) => word.toLowerCase();
  const isInLetters = (character) => validLetters.includes(character);
  const countWords = (words) => {
    const wordsMap = words.reduce(function (obj, b) {
      obj[b] = ++obj[b] || 1;
      return obj;
    }, {});
    return wordsMap;
  };

  const orderByValue = (words) => {
    const ordered = new Map();
    Object.keys(words).forEach(function (key) {
      ordered.set(key, words[key]);
    });
    return new Map(
      [...ordered.entries()]
        .sort((a, b) => {
          return b[1] - a[1];
        })
        .sort((a, b) => {
          if (b[1] === a[1]) return compare(b[0], a[0]);
          return 0;
        })
    );
  };

  function compare(a, b) {
    (a = a.toString()), (b = b.toString());
    for (
      let i = 0, n = Math.max(a.length, b.length);
      i < n && a.charAt(i) === b.charAt(i);
      ++i
    );
    if (i === n) return 0;
    return a.charAt(i) > b.charAt(i) ? -1 : 1;
  }

  const getWordsFiltered = (book) => {
    return book
      .split(" ")
      .map((word) => {
        return [...toLowerCase(word)]
          .map((character) => {
            if (isInLetters(character)) return character;
            else return " ";
          })
          .join("");
      })
      .map((word) => word.trim())
      .map((word) => word.replace(/\s+/g, " "))
      .map((word) => {
        if (word.includes(" "))
          return word.split(" ").filter((word) => [...word].length > 2);
        else return word;
      })
      .flat()
      .filter((word) => [...word].length > 2);
  };

  return orderByValue(countWords(getWordsFiltered(book)));
};

const toArray = (input) => {
  return [...input.keys()].map((key) => {
    return [String(key), Number(input.get(key))];
  });
};

(async () => {
  const lines = await loadFile();
  const cases = Number.parseInt(lines.splice(0, 1)[0]);
  const book = await loadBook();
  const parsedBook = parseBook(book);
  const bookArray = [...parsedBook.entries()];
  const associatedCounters = [...bookArray.entries()];

  for (let index = 0; index < cases; index++) {
    const caseValue = lines.splice(0, 1)[0];
    const indexValue = index + 1;
    if (isNaN(caseValue)) {
      const element =
        associatedCounters[
          associatedCounters.findIndex((entrie) => entrie[1][0] === caseValue)
        ];
      console.log(`Case #${indexValue}: ${element[1][1]} #${element[0] + 1}`);
    } else {
      const element = associatedCounters[caseValue - 1];
      console.log(`Case #${indexValue}: ${element[1][0]} ${element[1][1]}`);
    }
  }
})();
