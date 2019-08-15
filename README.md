# Maybe

`Maybe` is a simple module to help make your javascript more declarative.

## installation


for npm:

```
npm i @shards/maybe
```

for yarn:

```
yarn add @shards/maybe
```

to require:

```
const Maybe = require('@shards/maybe').default
```

to import (es6 modules):

```
import Maybe from '@shards/maybe'
```

for node:

```
import Maybe from '@shards/maybe/dist/maybe.node.js'
```

## usage

By using a `Maybe` value, it forces us to handle both the cases where a value does exist, and where it doesn't. This is helpful for dealing with API's that return null/undefined values if they fail.


```javascript
const list = [
  1,
  2,
  3,
]

const value = list.find(v => v === 4)

Maybe(value).match(
  // just callback
  (v) => {
    console.log(`we found a value: ${v}`)
  },
  // nothing callback
  () => {
    console.log('unable to find value :(')
  },
)
```
