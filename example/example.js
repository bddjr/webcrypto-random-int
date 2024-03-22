import CryptoRandInt from "../webcrypto-random-int.js";

// @ts-ignore
(window.generate = () => {
  if (CryptoRandInt.canIUse) {
    document.getElementById("CryptoRandInt_NumInt").innerText =
      CryptoRandInt.numInt(62).toString();

    document.getElementById("CryptoRandInt_BigInt").innerText =
      CryptoRandInt.bigInt(2n ** 128n).toString();

    document.getElementById("CryptoRandInt_Str").innerText = CryptoRandInt.str(
      32,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
  } else {
    document.getElementById("CryptoRandInt_Int").innerText =
      "webcrypto undefined";
  }
})();
