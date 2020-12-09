const talib = require("talib.js");

const inReal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

async function main() {
  await talib.init();
  console.log(talib.ADD({ inReal0: inReal, inReal1: inReal }));
}

main();
