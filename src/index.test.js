/* global test, expect */

import Maybe from '.'

test('null matches nothing case', () => {
  runTest({
    value: null,
    just: shouldNotRun,
    nothing: shouldRun
  })
})

test('undefined matches nothing case', () => {
  runTest({
    value: undefined,
    just: shouldNotRun,
    nothing: shouldRun
  })
})

test('zero matches just case', () => {
  runTest({
    value: 0,
    just: shouldRun,
    nothing: shouldNotRun
  })
})

test('empty string matches just case', () => {
  runTest({
    value: '',
    just: shouldRun,
    nothing: shouldNotRun
  })
})

test('should return result from just', () => {
  const result = Maybe(10).match(
    value => value * 2,
    () => -1
  )
  expect(result).toEqual(20)
})

test('should return result from nothing', () => {
  const result = Maybe(undefined).match(
    () => -1,
    () => 10
  )
  expect(result).toEqual(10)
})

function runTest ({ value, just, nothing }) {
  const maybe = Maybe(value)
  const result = maybe.match(
    just('just'),
    nothing('nothing')
  )
  expect(result).toEqual(true)
}

function shouldRun (_) {
  return () => true
}

function shouldNotRun (name) {
  return () => { throw new Error(`${name} was not expected to run`) }
}
