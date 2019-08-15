/**
 * A maybe value
 * @typedef {Object} Maybe
 * @template T
 * @property {Match<T>} match
 */

/**
 * functional equivalent of switch statement
 * @typedef {Function} Match
 * @template T
 * @param {On} just
 * @param {On} nothing
 */

/**
 * The function type of just and nothing
 * @typedef On
 * @template T
 * @param {T} value
 * @returns {*}
 */

/**
 * Creates a Maybe value
 *
 * @param {*} value
 * @template T
 * @returns {Maybe<T>}
 */
function createMaybe (value) {
  const self = {}

  self.match = function match (just, nothing) {
    if (value === null || typeof value === 'undefined') {
      return nothing(value)
    } else {
      return just()
    }
  }

  return self
}

export default createMaybe
