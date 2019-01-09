function withHookBefore (originalFn, hookFn) {
  return function () {
    if (hookFn.apply(this, arguments) === false) {
      return
    }
    return originalFn.apply(this, arguments)
  }
}

function withHookAfter (originalFn, hookFn) {
  return function () {
    var output = originalFn.apply(this, arguments)
    hookFn.apply(this, arguments)
    return output
  }
}

function hookArgs (originalFn, argsGetter) {
  return function () {
    var _args = argsGetter.apply(this, arguments)
    if (Array.isArray(_args)) {
      for (var i = 0; i < _args.length; i++) arguments[i] = _args[i]
    }
    return originalFn.apply(this, arguments)
  }
}

function hookOutput (originalFn, valueGetter) {
  return function () {
    var _value = originalFn.apply(this, arguments)
    return valueGetter(_value)
  }
}

module.exports = {
  withHookBefore,
  withHookAfter,
  hookArgs,
  hookOutput
}
