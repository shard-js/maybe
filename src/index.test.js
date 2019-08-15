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
