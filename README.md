# webcrypto-random-int

Like golang, get crypto random integer or bigint.

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
```
53
216521706795757442119767567038153766458
SK2jwNqt3xvP1zuSwJt7CcxAI4T2GYbA
```

## Test

<https://bddjr.github.io/webcrypto-random-int/example/example.html>

```
npm -g i live-server
npm run example
```
