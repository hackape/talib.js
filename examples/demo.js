// const talib = require('talib.js');
const talib = require('../lib/index.cjs');

const inReal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

async function main() {
  await talib.init();
  console.log(talib.SMA({ inReal: inReal, timePeriod: 3 }));
}

main();
