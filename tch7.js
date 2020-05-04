const fs = require("fs");

const dvorak =
  "[]',.pyfgcrl/=aoeuidhtns-;qjkxbmwvz{}\"<>PYFGCRL?+AOEUIDHTNS_:QJKXBMWVZ";
const qwerty =
  "-=qwertyuiop[]asdfghjkl;'zxcvbnm,./_+QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>?";

const loadFile = async () => {
  try {
    const data = await fs
      .readFileSync("submitInput.txt")
      .toString()
      .split("\n");
    return data;
  } catch (err) {
    console.log(err);
    process.exit(-1);
  }
};

const convert = (s) => {
  ret = "";
  for (let i = 0; i < s.length; i++) {
    ret += qwerty.charAt(dvorak.indexOf(s.charAt(i))) || s.charAt(i);
  }
  return ret;
};

(async () => {
  const lines = await loadFile();
  const cases = lines[0];
  for (let index = 1; index <= cases; index++) {
    const line = lines[index];
    console.log(`Case #${index}: ${convert(line)}`);
  }
})();
