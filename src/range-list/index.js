const BigInt = require('big-integer');

// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)

/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */

/**
 * Returns a bit map of the range's values
 * @param range - array of ranges [ [range1], [range2], ... ]
 * @param minLength - minimum map length, if the range if less minLength the rest of the map will be filled by '0'
 * @returns {string}
 */
const getBitRange = (range, minLength) => {
  const start = [];

  if (minLength) {
    for (let i = 0; i < minLength; i++) {
      start.push(0);
    }
  }

  return range.reduce((prev, curr) => {
    // add items to the end if the current range is large
    const diff = curr[1] - prev.length;

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        prev.push('0');
      }
    }

    // set bits of the current range
    for (let i = curr[0]; i < curr[1]; i++) {
      prev[i] = '1';
    }

    return prev;
  }, start).reverse().join('');
};

/**
 * Returns an array of ranges from a bit map
 * @param bitMap - bit map string
 * @returns {Array}
 */
const getRangeFromBitMap = (bitMap) => {
  const range = bitMap.split('').reverse();

  return range.reduce((prev, curr, index) => {
    if (curr === '0') {
      return prev;
    }

    if (prev.length > 0 && prev[prev.length - 1][1] === index) {
      prev[prev.length - 1][1]++;
    } else {
      prev.push([index, index + 1]);
    }

    return prev;
  }, []);
};

class RangeList {
  constructor() {
    this.data = [];
  }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    if (range[1] <= range[0]) {
      return;
    }

    if (range[0] < 0 || range[1] < 0) {
      return;
    }

    const dataMapString = getBitRange(this.data, range[1]);
    const rangeMapString = getBitRange([range], dataMapString.length);

    const dataMap = BigInt(dataMapString, 2);
    const rangeMap = BigInt(rangeMapString, 2);

    const resultMap = dataMap.or(rangeMap).toString(2);

    this.data = getRangeFromBitMap(resultMap);
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    if (range[1] <= range[0]) {
      return;
    }

    if (range[0] < 0 || range[1] < 0) {
      return;
    }

    const dataMapString = getBitRange(this.data, range[1]);
    const rangeMapString = getBitRange([range], dataMapString.length);

    const dataMap = BigInt(dataMapString, 2);
    const rangeMap = BigInt(rangeMapString, 2);

    const resultMap = dataMap.and(rangeMap.not()).toString(2);

    this.data = getRangeFromBitMap(resultMap);
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    const string = this.data.map(range => `[${range[0]}, ${range[1]})`).join(' ');

    console.log(string);
  }
}

module.exports = RangeList;
