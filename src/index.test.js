/* global describe, test, expect */

import Maybe from '.'

describe('#match', () => {
  test('null matches nothing case', () => {
    testMatch({
      value: null,
      just: shouldNotRun,
      nothing: shouldRun
    })
  })

  test('undefined matches nothing case', () => {
    testMatch({
      value: undefined,
      just: shouldNotRun,
      nothing: shouldRun
    })
  })

  test('zero matches just case', () => {
    testMatch({
      value: 0,
      just: shouldRun,
      nothing: shouldNotRun
    })
  })

  test('empty string matches just case', () => {
    testMatch({
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

  function testMatch ({ value, just, nothing }) {
    const maybe = Maybe(value)
    const result = maybe.match(
      just('just'),
      nothing('nothing')
    )
    expect(result).toEqual(true)
  }
})

describe('#join', () => {
  test('should unwrap a nested maybe', () => {
    const maybe = Maybe(Maybe('hi'))
    const joined = maybe.join()
    joined.match(
      (val) => expect(val).toEqual('hi'),
      shouldNotRun('nothing')
    )
  })

  test('should not unwrap unnested maybe', () => {
    const maybe = Maybe('hi')
    const joined = maybe.join()
    joined.match(
      (val) => expect(val).toEqual('hi'),
      shouldNotRun('nothing')
    )
  })
})

describe('#map', () => {
  test('should apply transform to Just', () => {
    const maybe = Maybe('hi')
    const mapped = maybe.map(s => s.toUpperCase())
    mapped.match(
      val => expect(val).toEqual('HI'),
      shouldNotRun('nothing')
    )
  })

  test('should not apply transform to Nothing', () => {
    const maybe = Maybe()
    const transform = shouldNotRun('transform')
    const mapped = maybe.map(transform)
    const val = mapped.match(
      shouldNotRun('Just'),
      shouldRun('Nothing')
    )
    expect(val).toEqual(true)
  })
})

function shouldRun (_) {
  return () => true
}

function shouldNotRun (name) {
  return () => { throw new Error(`${name} was not expected to run`) }
}
