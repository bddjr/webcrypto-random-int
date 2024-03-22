# webcrypto-random-int

Like golang, get crypto random integer or bigInt.

## NPM
```
npm i webcrypto-random-int --save-dev
```

## Example
```js
import CryptoRandInt from "webcrypto-random-int";

console.log("canIUse " + CryptoRandInt.canIUse);
if (CryptoRandInt.canIUse) {
  console.log(CryptoRandInt.numInt(62));
  console.log(CryptoRandInt.bigInt(2n ** 128n));
  console.log(CryptoRandInt.str(
    32,
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  ));
}
```

## Test
```
npm -g i live-server
npm run example
```
