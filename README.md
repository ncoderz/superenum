# Superenum

![Build & Test](https://github.com/ncoderz/superenum/actions/workflows/build-test.yml/badge.svg?branch=main)
![npm version](https://img.shields.io/npm/v/@ncoderz/superenum)
![License](https://img.shields.io/badge/license-BSD--2--Clause-blue)
![Minified Size](https://img.shields.io/bundlephobia/min/@ncoderz/superenum)

`🚀 The enum utility that TypeScript forgot` — _JavaScript too!_

---

## Why @ncoderz/superenum?

Ever wanted Validation, Iteration, Key-Lookups, Localization for your enums in Typescript or JavaScript?

Ever wanted it to be so simple you'll use it everywhere?

@ncoderz/superenum is the enum utility that TS forgot:

- 🚀 Super-powers for your enums
- ✅ Input validation
- 📚 Iterable, order guaranteed
- ↔️ key ⬌ value conversion
- 🌐 Localization (i18n)
- ✨ Simple to use
- 🔒 Type-safe

Additionally:

- 🌐 Works with TypeScript or JavaScript enums
- 🖥️ Works in NodeJS, Deno, Bun, or the browser
- 📦 Very small code footprint (~1.5kB minified + gzipped)
- 🛠️ No dependencies
- 📜 Permissive license ([BSD-2-Clause](https://opensource.org/licenses/BSD-2-Clause))

## Installation

```sh
npm install @ncoderz/superenum
pnpm install @ncoderz/superenum
yarn add @ncoderz/superenum
deno add @ncoderz/superenum
bun add @ncoderz/superenum
```

Using jsDelivr CDN (ES6 IFFE module):

```html
<script src="https://cdn.jsdelivr.net/npm/@ncoderz/superenum@latest/dist/browser/superenum.global.js"></script>
```

Using unpkg CDN (ES6 IFFE module):

```html
<script src="https://unpkg.com/@ncoderz/superenum@latest/dist/browser/superenum.global.js"></script>
```

Replace `latest` with a specific version in either of the URLs above to use a specific version.

## Importing

`@ncoderz/superenum` can be used via ES Module import, CommonJS, or as a script import directly in the browser.

```ts
import { Enum } from '@ncoderz/superenum';
```

```ts
const { Enum } = require('@ncoderz/superenum');
```

```html
<script src="https://cdn.jsdelivr.net/npm/@ncoderz/superenum@latest/dist/browser/superenum.global.js"></script>
<script>
  const { Enum } = window.superenum;
</script>
```

## Basic Usage

```ts
import { Enum, EnumType } from '@ncoderz/superenum';

// Standard TypeScript enum
enum MyEnum {
  node = 'node',
  chrome = 'chrome',
  safari = 'safari',
};

// ALTERNATIVE: Standard object style enum
const MyEnum {
  node: 'node',
  chrome: 'chrome',
  safari: 'safari',
};

// ALTERNATIVE: String enums can also be declared
// short-hand using arrays (keys and values are the same, so lower case in this case)
const MyEnum = Enum.fromArray('node', 'chrome', 'safari')

// Type for object and array enum declarations
// (not necessary for TypeScript enums as enum is already also type)
type MyEnum = EnumType<typeof MyEnum>;
```

#### Validation

```ts
enum MyEnum {
  NODE = 'node',
  CHROME = 'chrome',
  SAFARI = 'safari',
}

// Validation
const value = Enum(MyEnum).fromValue('node'); // MyEnum.NODE

// Validation with default
const value = Enum(MyEnum).fromValue('not supported') ?? MyEnum.SAFARI; // MyEnum.SAFARI
```

#### Iteration

```ts
enum MyEnum {
  NODE = 'node',
  CHROME = 'chrome',
  SAFARI = 'safari',
}

// Iteration (values)
for (const value of Enum(MyEnum) /* or Enum(MyEnum).values() */) {
  console.log(value); // 'node', 'chrome', 'safari'
}

// Iteration (keys)
for (const key of Enum(MyEnum).keys()) {
  console.log(key); // 'NODE', 'CHROME', 'SAFARI'
}

// Iteration (entries)
for (const e of Enum(MyEnum).entries()) {
  console.log(e); // ['NODE', 'node'], ['CHROME', 'chrome'], ['SAFARI', 'safari']
}
```

#### key => value conversion

```ts
enum MyEnum {
  NODE = 'node',
  CHROME = 'chrome',
  SAFARI = 'safari',
}

// Key to Value (fromKey)
const value = Enum(MyEnum).fromKey('NODE'); // 'node'
```

#### value => key conversion

```ts
enum MyEnum {
  NODE = 'node',
  CHROME = 'chrome',
  SAFARI = 'safari',
}

// Value to Key (keyFromValue)
const key = Enum(MyEnum).keyFromValue(MyEnum.NODE); // 'NODE'
```

#### Localization (i18n)

```ts
enum MyEnum {
  HELLO = 'hello',
  GOODBYE = 'goodbye',
}

// Localization (i18n)

// Set labels all at one
Enum(MyEnum).setAllLabels({
  [MyEnum.HELLO]: {
    en: 'Hello',
    de: 'Guten Tag',
  },
  [MyEnum.GOODBYE]: {
    en: 'Goodbye',
    de: 'Auf Wiedersehen',
  },
});

// Or set labels one by one
Enum(MyEnum).setLabels(MyEnum.HELLO, { en: 'Hello', de: 'Guten Tag' });
Enum(MyEnum).setLabels(MyEnum.GOODBYE, { en: 'Goodbye', de: 'Auf Wiedersehen' });

// Get a label in the first configured (default) language
Enum(MyEnum).getLabel(MyEnum.HELLO); // 'Hello'

// Get a label in a specific language
Enum(MyEnum).getLabel(MyEnum.HELLO, 'de'); // 'Guten Tag'

// If a locale does not exist, the enum value is returned
Enum(MyEnum).getLabel(MyEnum.HELLO, 'es'); // 'hello'
```

## Validation

Validation is a common use case when reading data from an API, file, or database.

`@ncoderz/superenum` makes this easy with `Enum(<enum>).fromValue()` which returns a typed enum or undefined if the data does not match an enum value.

```ts
const MyEnum = Enum.fromArray(['node', 'chrome', 'safari']);

// End enum declaration

// Input values could come from external data / API
const valueNode = Enum(MyEnum).fromValue('node'); // MyEnum.node
const valueChrome = Enum(MyEnum).fromValue('chrome'); // MyEnum.chrome
const invalid = Enum(MyEnum).fromValue('surfari'); // undefined
const invalid2 = Enum(MyEnum).fromValue(undefined); // undefined

// Validate with default of MyEnum.node
const validOrDefault = Enum(MyEnum).fromValue('invalid') ?? MyEnum.node; // MyEnum.node
```

## Iteration / forEach / map / reduce

It is easy to iterate the enum values, keys, or entries.

The `Enum(<enum>)` itself is iterable and will iterate the values in the defined key order.

The `Enum(<enum>).values()`, `Enum(<enum>).keys()`, `Enum(<enum>).entries()` functions return arrays in the defined key order which can be iterated, mapped, reduced, etc.

```ts
enum MyNumericEnum = {
  node = 0,
  chrome = 1,
  safari = 2,
};

// End enum declaration

// Iterate enum values
for (const value of Enum(MyNumericEnum)) {
  console.log(value);
}
// 0
// 1
// 2

for (const value of Enum(MyNumericEnum).values()) {
  console.log(value);
}
// 0
// 1
// 2

Enum(MyNumericEnum).values().forEach((value) => {
  console.log(value);
});
// 0
// 1
// 2

Enum(MyNumericEnum).values().map((value) => {
  console.log(value + 1);
});
// 1
// 2
// 3

// Iterate enum keys (forEach, map, etc also work on keys())
for (const value of Enum(MyNumericEnum).keys()) {
  console.log(value);
}
// node
// chrome
// safari

// Iterate enum entries (forEach, map, etc also work on entries())
for (const value of Enum(MyNumericEnum).entries()) {
  console.log(value);
}
// [ 'node', 0 ]
// [ 'chrome': 1 ]
// [ 'safari': 2 ]
```

#### A note on Iteration Order

Iteration order will be the order of declaration of items in the enum.

However there is one exception which can affect object or array enums (NOT TypeScript enums).

If a key is a positive integer like string, for example '99', then it will be iterated before all
other keys.

This is a feature of how JavaScript engines store keys. It cannot be avoided without making
the library more complex, and it is only a very minor edge case. It is documented here for reference.

It does not affect TypeScript enums because they specifically forbid numeric like keys as otherwise
they would clash with the reverse lookups.

## Enum value from enum key

There are use-cases where you might want to get an enum value from the enum key.
An example might be where the key is stored in a configuration file, and matched to a value in code.

This is possible with `Enum(<enum>).fromKey()`

```ts
const MyEnum = {
  node: 0,
  chrome: 1,
  safari: 2,
};
type MyEnum = EnumType<typeof MyEnum>;

// End enum declaration

const nodeValue = MyEnum.fromKey('node'); // MyEnum.node
const invalidValue = MyEnum.fromKey('NoDe'); // undefined
const nodeValue2 = MyEnum.fromKey('NoDe', {
  ignoreCase: true,
}); // MyEnum.node
```

## Enum key from enum value

There are use-cases where you might want to get an enum key from the enum value. An example might be for
logging purposes.

This is possible with `Enum(<enum>).keyFromValue()`

```ts
const MyEnum = superenum({
  node: 'NodeJS',
  chrome: 'GoogleChrome',
  safari: 'MacOSSafari',
});

// End enum declaration

const nodeKey = Enum(MyEnum).keyFromValue('NodeJS'); // 'node'
const nodeKey2 = Enum(MyEnum).keyFromValue(MyEnum.node); // 'node'
const invalid = Enum(MyEnum).keyFromValue('node'); // undefined
```

<!--

## API

[API Documentation](dist/docs/API.md)
-->

## License

This open source software is licensed under the [BSD-2-Clause license](https://opensource.org/licenses/BSD-2-Clause).

---

## Alternatives

- [ts-enum-util](https://github.com/UselessPickles/ts-enum-util)

## Table of Contents

- [Superenum](#superenum)
  - [Why @ncoderz/superenum?](#why-ncoderzsuperenum)
  - [Installation](#installation)
  - [Importing](#importing)
  - [Basic Usage](#basic-usage)
    - [Validation](#validation)
    - [Iteration](#iteration)
    - [key =\> value conversion](#key--value-conversion)
    - [value =\> key conversion](#value--key-conversion)
    - [Localization (i18n)](#localization-i18n)
  - [Validation](#validation-1)
  - [Iteration / forEach / map / reduce](#iteration--foreach--map--reduce)
    - [A note on Iteration Order](#a-note-on-iteration-order)
  - [Enum value from enum key](#enum-value-from-enum-key)
  - [Enum key from enum value](#enum-key-from-enum-value)
  - [License](#license)
  - [Alternatives](#alternatives)
  - [Table of Contents](#table-of-contents)
