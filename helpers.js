/**
 * Compares two strings and calculates their Jaccard similarity.
 *
 * @param {string} str1 - The first string to compare.
 * @param {string} str2 - The second string to compare.
 * @returns {number} - The Jaccard similarity between the two strings.
 *
 * @example
 * const similarity = compareStrings("hello", "world");
 * console.log(similarity); // Output: 0
 *
 * const similarity2 = compareStrings("hello", "hello");
 * console.log(similarity2); // Output: 1
 */
function compareStrings(str1, str2) {
  // Convert strings to sets of characters
  const set1 = new Set(str1);
  const set2 = new Set(str2);

  // Find the intersection of the sets
  const intersection = new Set([...set1].filter((x) => set2.has(x)));

  // Find the union of the sets
  const union = new Set([...set1, ...set2]);

  // Calculate the Jaccard similarity
  const similarity = intersection.size / union.size;

  return similarity;
}

/**
 * Generates a random ID of specified length.
 *
 * @param {number} length - The length of the random ID to generate.
 * @returns {string} - The generated random ID.
 *
 * @example
 * const randomID = generateRandomID(10);
 * console.log(randomID); // Output: "aBcDeFgHiJ"
 */
function generateRandomID(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

module.exports = { compareStrings, generateRandomID };
