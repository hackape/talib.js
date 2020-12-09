# talib.js

[TA-Lib](https://ta-lib.org/), the technical analysis library written in C, ported to WebAssembly. Plus a nice API wrapper layer, typescript support and docs.

## Installation

```
npm install --save talib.js
```

## Usage
```
const talib = require("talib.js");

const inReal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

async function main() {
  await talib.init();
  console.log(talib.ADD({ inReal0: inReal, inReal1: inReal }));
}

main();
```

output:
```
{ output: [
    2,  4,  6,  8, 10,
  12, 14, 16, 18, 20
] }
```

## Documentation

Visit https://hackape.github.io/talib.js/

Docs are generated using [typedoc](https://github.com/TypeStrong/typedoc) and hosted on [GitHub Pages](https://github.com/hackape/talib.js/tree/gh-pages).
