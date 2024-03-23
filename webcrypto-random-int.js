// MIT license. https://github.com/bddjr/webcrypto-random-int

export const canIUse = !!globalThis.crypto?.getRandomValues;

export const notRandomTools = {
  /**
   * Bytes to bigint, not ramdom.
   *
   * It throw error if (!(bytes instanceof Uint8Array)).
   *
   * @param {Uint8Array} bytes
   * @returns {bigint}
   */
  uint8ArrayToBigint(bytes) {
    if (!(bytes instanceof Uint8Array))
      throw "webcrypto-random-int notRandomTools uint8ArrayToBigint: argument bytes is not Uint8Array";

    var n = globalThis.BigInt(bytes[0]);
    for (let i = 1; i < bytes.length; i++) {
      n <<= 8n;
      n |= globalThis.BigInt(bytes[i]);
    }
    return n;
  },

  /**
   * Get bigint bitLength, not random.
   *
   * @param {bigint} n
   * @returns {number}
   */
  bigintGetBitlen(n) {
    if (typeof n !== "bigint")
      throw "webcrypto-random-int notRandomTools bigintGetBitlen: argument max is not bigint";

    var bitLen = 0;
    while (n > 0n) {
      n >>= 1n;
      bitLen++;
    }
    return bitLen;
  },
};

/**
 * Int returns a uniform random value in [0,max], excluding max itself.
 *
 * It throw error if (!canIUse || !Number.isInteger(max) || max <= 0 || max-1 > 0xffffffff) .
 *
 * @param {number} max
 * @returns {number}
 */
export function numInt(max) {
  if (!canIUse) throw "webcrypto-random-int numInt: webcrypto undefined";
  if (!Number.isInteger(max))
    throw "webcrypto-random-int numInt: argument max is not integer";
  if (max <= 0) throw "webcrypto-random-int numInt: argument max is <= 0";

  const n = max - 1;
  if (n === 0) return 0;
  if (n > 0xffffffff)
    throw "webcrypto-random-int numInt: argument max-1 is > 0xffffffff";

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
 * It throw error if (!canIUse || typeof max !== "bigint" || max <= 0).
 *
 * @param {bigint} max
 * @returns {bigint}
 */
export function bigInt(max) {
  if (!canIUse) throw "webcrypto-random-int numInt: webcrypto undefined";
  if (typeof max !== "bigint")
    throw "webcrypto-random-int numInt: argument max is not bigint";
  if (max <= 0) throw "webcrypto-random-int numInt: argument max is <= 0";

  var n = max - 1n;
  if (n === 0n) return 0n;

  // bitLen is the maximum bit length needed to encode a value < max.
  var bitLen = notRandomTools.bigintGetBitlen(n);

  // k is the maximum byte length needed to encode a value < max.
  const k = Math.ceil(bitLen / 8);
  // b is the number of bits in the most significant byte of max-1.
  const b = (1 << (bitLen % 8 || 8)) - 1;

  const bytes = new Uint8Array(k);

  while (true) {
    globalThis.crypto.getRandomValues(bytes);

    // Clear bits in the first byte to increase the probability
    // that the candidate is < max.
    bytes[0] &= b;

    n = notRandomTools.uint8ArrayToBigint(bytes);
    if (n < max) return n;
  }
}

/**
 * ```
 * str(32, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
 * ```
 *
 * It throw error if (typeof letters !== "string" || !Number.isInteger(length) || !canIUse).
 *
 * @param {number} length
 * @param {string} letters
 * @returns {string}
 */
export function str(length, letters) {
  if (typeof letters !== "string")
    throw "webcrypto-random-int str: argument letters is not string";
  if (!Number.isInteger(length))
    throw "webcrypto-random-int str: argument length is not integer";

  var str = "";
  for (let i = 0; i < length; i++) {
    str += letters[numInt(letters.length)];
  }
  return str;
}

export default {
  canIUse,
  notRandomTools,
  numInt,
  bigInt,
  str,
};
