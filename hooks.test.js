/* global test jest expect */

const {
  withHookBefore,
  withHookAfter,
  hookArgs,
  hookOutput
} = require('./hooks')

test('withHookBefore', () => {
  const fn = jest.fn(() => {})
  const hookedFn = withHookBefore(fn, function () {
    expect(fn.mock.calls.length).toEqual(0)
  })
  hookedFn()
  expect(fn.mock.calls.length).toEqual(1)

  const interceptedFn = withHookBefore(fn, function () {
    expect(fn.mock.calls.length).toEqual(1)
    return false
  })
  interceptedFn()
  expect(fn.mock.calls.length).toEqual(1)
})

test('withHookAfter', () => {
  const fn = jest.fn(() => 123)
  const hookedFn = withHookAfter(fn, function () {
    expect(fn.mock.calls.length).toEqual(1)
  })
  expect(fn.mock.calls.length).toEqual(0)
  expect(hookedFn()).toEqual(123)
})

test('hookArgs', () => {
  const fn = jest.fn((a, b) => a + b + 1)
  const validHookedFn = hookArgs(fn, (a, b) => [a + 1, b + 1])
  expect(validHookedFn(0, 0)).toEqual(3)

  const invalidHookedFn = hookArgs(fn, () => null)
  expect(invalidHookedFn(0, 0)).toEqual(1)
})

test('hookOutput', () => {
  const fn = jest.fn(x => x)
  const hookedFn = hookOutput(fn, x => x + 1)
  expect(hookedFn(0)).toEqual(1)
})
