/* globals inspect */

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

const isMaybe = Symbol('isMaybe accessor')

/**
 * Creates a Maybe value
 *
 * @param {*} value
 * @template T
 * @returns {Maybe<T>}
 */
function Maybe (value) {
  const self = {}
  self[isMaybe] = true

  function isNothing () {
    return value === null || typeof value === 'undefined'
  }

  self.match = function match (just, nothing) {
    if (isNothing()) {
      return nothing()
    } else {
      return just(value)
    }
  }

  self.map = function map (transform) {
    if (isNothing()) {
      return Maybe(value)
    } else {
      return Maybe(transform(value))
    }
  }

  self.join = function join () {
    if (value[isMaybe]) {
      return value.match(
        Maybe,
        Maybe
      )
    } else {
      // not a maybe value
      return Maybe(value)
    }
  }

  self.inspect = function () {
    const fromValue = (typeof inspect === 'function') ? inspect(value) : (value + '')
    return `Maybe(${fromValue})`
  }

  return self
}

export default Maybe
