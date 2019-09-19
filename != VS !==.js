/**
 * != check only values of left and right side
 * !== checks data type with value of both side
 */

console.log(7 != '7'); // false
console.log(7 !== '7'); // true
console.log('7' !== 7); // true
console.log(7.3 !== 7.3); // false

/**
 * == checks only values of both side
 * === checks value with data type as well
 */

console.log(7 == '7'); // true
console.log(7 === '7'); // false
console.log('7' === 7); // false
console.log(7.3 === 7.3); // true