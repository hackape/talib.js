# ta-lib-wasm

[TA-Lib](https://ta-lib.org/), the technical analysis library written in C, ported to WebAssembly. Plus a nice API wrapper layer, typescript support and docs.

## Installation

```
npm install --save ta-lib-wasm
```

## Usage
```
const talib = require("ta-lib-wasm");

const inReal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

async function main() {
  await talib.init();
  console.log(talib.ADD({ inReal0: inReal, inReal1: inReal }));
}

main();
```
