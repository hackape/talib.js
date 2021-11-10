import { init, ADD } from "talib.js";

async function main() {
  await init();
  const inReal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log("talib.ADD result:", ADD({ inReal0: inReal, inReal1: inReal }));
}

main();
