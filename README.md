# Runtime Hooks
🔗 Utils for JS runtime hooking & injecting.

<p>
  <a href="https://travis-ci.org/gaoding-inc/runtime-hooks">
    <img src="https://travis-ci.org/gaoding-inc/runtime-hooks.svg?branch=master"/>
  </a>
  <a href='https://coveralls.io/github/gaoding-inc/runtime-hooks?branch=master'>
    <img src='https://coveralls.io/repos/github/gaoding-inc/runtime-hooks/badge.svg?branch=master' alt='Coverage Status'/>
  </a>
  <a href="https://unpkg.com/runtime-hooks/hooks.js">
    <img src="https://img.badgesize.io/https://unpkg.com/runtime-hooks/hooks.js?compression=gzip&amp;label=size&amp;maxAge=300"/>
  </a>
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"/>
  </a>
  <a href="./package.json">
    <img src="https://img.shields.io/npm/v/runtime-hooks.svg?maxAge=300&label=version&colorB=007ec6&maxAge=300"/>
  </a>
</p>


## What's This?
Adding hooks to any function you need!

[中文介绍](https://zhuanlan.zhihu.com/p/54460682)


## Usage

Install via NPM:

``` bash
npm install runtime-hooks
```

Basic usage:

``` js
import { withHookBefore } from 'runtime-hooks'

window.alert = withHookBefore(window.alert, console.log)
```

> These utils are mainly designed for advanced usage (logging / testing / debugging...), don't abusing them in business code.

### withHookBefore
`(originalFn: function, hookFn: function): function`

Given original function, return a new high-order function that:

1. Calls your customs hook function beforehand.
2. Calls the original function.

If your hook function returns `false`, the original function will not be executed. You can replace the reference to original function with the generated function, which makes sense for function hooking:

``` js
window.alert = withHookBefore(window.alert, console.log)
```

### withHookAfter
`(originalFn: function, hookFn: function): function`

Given original function, return a new high-order function that:

1. Calls the original function.
2. Calls your customs hook function afterwards.

### hookArgs
`(originalFn: function, argsGetter: function): function`

Given original function, runs a new high-order function that:

1. Calls `argsGetter` with args of original function.
2. If `argsGetter` returns an array, replace original args with it, or else keep the args.
3. Calls original function with these args, returning what it returns.

### hookOutput
`(originalFn: function, outputGetter: function): function`

Given original function, runs a new high-order function that:

1. Calls original function and get its output.
2. Calls `outputGetter` with output, returning what it returns.

> Both `hookOutput` and `withHookAfter` runs after original function. `hookOutput` replaces the output, but `withHookAfter` won't. 

## License
MIT
