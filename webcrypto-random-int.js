// MIT license. https://github.com/bddjr/webcrypto-random-int

export const canIUse = !!globalThis.crypto?.getRandomValues;

/**
 * Int returns a uniform random value in [0,max], excluding max itself.
 *
 * It throw error if (max <= 0 || max-1 > 0xffffffff) .
 *
 * @param {number} max
 * @returns {number}
 */
export function numInt(max) {
  if (!canIUse) throw "webcrypto-random-int: webcrypto undefined";
  if (max <= 0) throw "webcrypto-random-int: argument max is <= 0";

  const n = max - 1;
  if (n === 0) return 0;
  if (n > 0xffffffff)
    throw "webcrypto-random-int: argument max-1 is > 0xffffffff";

  var b = n;
  b |= b >> 1;
  b |= b >> 2;
  b |= b >> 4;

  /** @type {Uint8Array | Uint16Array | Uint32Array} */
  var arr;
  if (n <= 0xff) {
    arr = new Uint8Array(1);
  } else {
    b |= b >> 8;
    if (n <= 0xffff) {
      arr = new Uint16Array(1);
    } else {
      b |= b >> 16;
      arr = new Uint32Array(1);
    }
  }

  while (true) {
    globalThis.crypto.getRandomValues(arr);

    // Clear bits in the first byte to increase the probability
    // that the candidate is < max.
    arr[0] &= b;

    if (arr[0] < max) return arr[0];
  }
}

/**
 * bigInt returns a uniform random value in [0,max], excluding max itself.
 *
 * It throw error if max <= 0.
 *
 * @param {bigint} max
 * @returns {bigint}
 */
export function bigInt(max) {
  if (!canIUse) throw "webcrypto-random-int: webcrypto undefined";
  if (max <= 0) throw "webcrypto-random-int: argument max is <= 0";

  var n = max - 1n;
  if (n === 0n) return 0n;

  // bitLen is the maximum bit length needed to encode a value < max.
  var bitLen = 0;
  while (n > 0n) {
    n >>= 1n;
    bitLen++;
  }

  // k is the maximum byte length needed to encode a value < max.
  const k = Math.floor((bitLen + 7) / 8);
  // b is the number of bits in the most significant byte of max-1.
  const b = (1 << (bitLen % 8 || 8)) - 1;

  const bytes = new Uint8Array(k);

  while (true) {
    globalThis.crypto.getRandomValues(bytes);

    // Clear bits in the first byte to increase the probability
    // that the candidate is < max.
    bytes[0] &= b;

    n = BigInt(bytes[0]);
    for (let i = 1; i < k; i++) {
      n <<= 8n;
      n |= BigInt(bytes[i]);
    }
    if (n < max) return n;
  }
}

/**
 * Str(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
 *
 * @param {any} length
 * @param {string} letters
 * @returns {string}
 */
export function str(length, letters) {
  var str = "";
  for (let i = 0; i < length; i++) {
    str += letters[numInt(letters.length)];
  }
  return str;
}

export default {
  canIUse,
  numInt,
  bigInt,
  str,
};
