/**
 * Int returns a uniform random value in [0,max], excluding max itself.
 *
 * It throw error if (!canIUse || !Number.isInteger(max) || max <= 0 || max-1 > 0xffffffff) .
 *
 * @param {number} max
 * @returns {number}
 */
export function numInt(max: number): number;
/**
 * bigInt returns a uniform random value in [0,max], excluding max itself.
 *
 * It throw error if (!canIUse || typeof max !== "bigint" || max <= 0).
 *
 * @param {bigint} max
 * @returns {bigint}
 */
export function bigInt(max: bigint): bigint;
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
export function str(length: number, letters: string): string;
export const canIUse: boolean;
export namespace notRandomTools {
    /**
     * Bytes to bigint, not ramdom.
     *
     * It throw error if (!(bytes instanceof Uint8Array)).
     *
     * @param {Uint8Array} bytes
     * @returns {bigint}
     */
    function uint8ArrayToBigint(bytes: Uint8Array): bigint;
    /**
     * Get bigint bitLength, not random.
     *
     * @param {bigint} n
     * @returns {number}
     */
    function bigintGetBitlen(n: bigint): number;
}
declare namespace _default {
    export { canIUse };
    export { notRandomTools };
    export { numInt };
    export { bigInt };
    export { str };
}
export default _default;
//# sourceMappingURL=webcrypto-random-int.d.ts.map