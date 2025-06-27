# @ncoderz/superenum 🚀

![Build & Test](https://github.com/ncoderz/superenum/actions/workflows/build-test.yml/badge.svg?branch=main)
![npm version](https://img.shields.io/npm/v/@ncoderz/superenum)
![License](https://img.shields.io/badge/license-BSD--2--Clause-blue)
![Minified Size](https://img.shields.io/bundlephobia/min/@ncoderz/superenum)

Simple, typesafe enums in TypeScript, fully compatible with standard JavaScript.

---

## Table of Contents

- [@ncoderz/superenum 🚀](#ncoderzsuperenum-)
  - [Table of Contents](#table-of-contents)
  - [Why @ncoderz/superenum?](#why-ncoderzsuperenum)
  - [Why NOT TypeScript enums? ](#why-not-typescript-enums-)
  - [Installation](#installation)
  - [Importing](#importing)
  - [Enum Declaration](#enum-declaration)
  - [Basic Usage](#basic-usage)
  - [Validation](#validation)
  - [Iteration / forEach / map / reduce](#iteration--foreach--map--reduce)
  - [Enum value from enum key](#enum-value-from-enum-key)
  - [Enum key from enum value](#enum-key-from-enum-value)
  - [Metadata](#metadata)
  - [API](#api)
  - [Feature Comparison](#feature-comparison)
  - [Limitations](#limitations)
  - [License](#license)
  - [Alternatives](#alternatives)

---

## Why @ncoderz/superenum?

The standard TypeScript enum implementation is over-complicated, missing basic features, and is not easily compatible with standard JavaScript enums.

@ncoderz/superenum provides an alternative that is:

- 🚀 An extension of standard JavaScript object enums, fully-interoperable with JavaScript
- ✨ Simple to use
- 🔒 Type-safe
- 💡 Full IDE autocompletion
- 🔄 Iteration order guaranteed
- ✅ Input validation
- 🌐 Interoperable with standard JavaScript enums
- 🖥️ Works in NodeJS, Deno, Bun, or the browser
- 📦 Has a very small code footprint (< 1kB minified + gzipped)

Additionally, the library is committed to:

- 🔄 An API that will always remain backwards compatible
- 🛠️ No dependencies
- 📜 Permissive license ([BSD-2-Clause](https://opensource.org/licenses/BSD-2-Clause))
- 🐛 Fixing bugs

---

## Why NOT TypeScript enums? ❌

TypeScript enums are broken:

- 🚫 **Confusing syntax** that doesn't look like JavaScript
- 🔄 **JavaScript incompatible** - breaks existing codebases
- 🐢 **Performance overhead** in critical applications
- 🔍 **Debugging nightmare** with unreadable compiled output
- ❌ **No mixed keys** - artificially limited
- 🔒 **Type coercion bugs** that break at runtime

Stop fighting TypeScript enums. Use `@ncoderz/superenum` instead.

---

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

---

## Importing

`@ncoderz/superenum` can be used via ES Module import, CommonJS, or as a script import directly in the browser.

```ts
import { superenum, EnumType } from '@ncoderz/superenum';
```

```ts
const { superenum, EnumType } = require('@ncoderz/superenum');
```

```html
<script src="https://cdn.jsdelivr.net/npm/@ncoderz/superenum@latest/dist/browser/superenum.global.js"></script>
<script>
  const { superenum } = window.superenum;
</script>
```

---

## Enum Declaration

Enums are declared as JavaScript objects or arrays wrapped with the `superenum()` function.

```ts
superenum(enumObject | enumArray);
```

As long as the keys and values of the object are constants, or TypeScript can infer a constant value, then the enum will be typesafe and IDE auto-completion will work.

```ts
// String enum
const MyEnum = superenum({
  node: 'node',
  chrome: 'chrome',
  safari: 'safari',
});
type MyEnumType = EnumType<typeof MyEnum>; // Optional type declaration

// Equivalent declaration using an array
const MyEnumFromArray = superenum(['node', 'chrome', 'safari']);
type MyEnumFromArrayType = EnumType<typeof MyEnumFromArray>; // Optional type declaration

// Numeric enum
const MyNumericEnum = superenum({
  node: 0,
  chrome: 1,
  safari: 2,
});
type MyNumericEnumType = EnumType<typeof MyNumericEnum>; // Optional type declaration

// Mixed enum with different values as string keys
const MyMixedEnum = superenum({
  node: 'NodeJS',
  chrome: 1,
  safari: 'MacOSSafari',
});
type MyMixedEnumType = EnumType<typeof MyMixedEnum>; // Optional type declaration
```

---

## Basic Usage

```ts
const MyEnum = superenum({
  node: 'node',
  chrome: 'chrome',
  safari: 'MacOSSafari',
});
type MyEnumType = EnumType<typeof MyEnum>;

// End enum declaration

// Basic variable and comparison
const value: MyEnumType = MyEnum.node;

console.assert(value === MyEnum.node); // true
console.assert(value === 'node'); // true
console.assert(value === MyEnum.chrome); // false
console.assert(value === 'firefox'); // false

// Switch statements
switch (value) {
  case MyEnum.node: // true
    break;
  case MyEnum.chrome: // false
    break;
  case MyEnum.safari: // false
    break;
  default:
}

switch (value) {
  case 'node': // true
    break;
  case 'chrome': // false
    break;
  case 'MacOSSafari': // false
    break;
  case 'safari': // TS compiler error
    break;
  case 'something else': // TS compiler error
    break;
  default:
}
```

---

## Validation

Validation is a common use case when reading data from an API, file, or database.

`@ncoderz/superenum` makes this easy with `<enum>.fromValue()` which returns a typed enum or undefined if the data does not match an enum value.

```ts
const MyEnum = superenum(['node', 'chrome', 'safari']);

// End enum declaration

// Input values could come from external data / API
const valueNode = MyEnum.fromValue('node'); // MyEnum.node / 'node'
const valueChrome = MyEnum.fromValue('chrome'); // MyEnum.chrome / 'chrome'
const invalid = MyEnum.fromValue('surfari'); // undefined
const invalid2 = MyEnum.fromValue(undefined); // undefined

// Validate with default of MyEnum.node
const validOrDefault = MyEnum.fromValue('invalid') ?? MyEnum.node; // MyEnum.node / 'node'
```

---

## Iteration / forEach / map / reduce

It is easy to iterate the enum values, keys, or entries.

The `<enum>` itself is iterable and will iterate the values in the defined key order.

The `<enum>.values()`, `<enum>.keys()`, `<enum>.entries()` functions return arrays in the defined key order which can be iterated, mapped, reduced, etc.

```ts
const MyNumericEnum = superenum({
  node: 0,
  chrome: 1,
  safari: 2,
});

// End enum declaration

// Iterate enum values
for (const value of MyNumericEnum) {
  console.log(value);
}
// 0
// 1
// 2

for (const value of MyNumericEnum.values()) {
  console.log(value);
}
// 0
// 1
// 2

MyNumericEnum.values().forEach((value) => {
  console.log(value);
});
// 0
// 1
// 2

MyNumericEnum.values().map((value) => {
  console.log(value + 1);
});
// 1
// 2
// 3

// Iterate enum keys (forEach, map, etc also work on keys())
for (const value of MyNumericEnum.keys()) {
  console.log(value);
}
// node
// chrome
// safari

// Iterate enum entries (forEach, map, etc also work on entries())
for (const value of MyNumericEnum.entries()) {
  console.log(value);
}
// [ 'node', 0 ]
// [ 'chrome': 1 ]
// [ 'safari': 2 ]
```

The order of iteration is guaranteed usually when using `superenum()` to initialise the enum.

The only exception is when using an object enum, with mixed string and numeric keys. In this
case the order can be modified by setting `EnumOptions.iterationKeys` to represent the desired iteration order.

```ts
// Ensure iteration order when using integer keys mixed with strings and creating
// the object with `superenum() / superenum.fromObject()
//
// In this case if iterationKeys was not used, the iteration order would be defined
// by the JavaScript engine and would probably be:
// 1, 2, node, safari

const MyMixedEnum = superenum(
  {
    node: 0,
    1: 1,
    safari: 2,
    '2': 'two',
  },
  {
    iterationKeys: ['node', 1, 'safari', '2'],
  },
);

// Iterate enum keys
for (const value of MyMixedEnum.keys()) {
  console.log(value);
}
// node
// 1
// safari
// 2
```

---

## Enum value from enum key

There are use-cases where you might want to get an enum value from the enum key.
An example might be where the key is stored in a configuration file, and matched to a value in code.

This is possible with `<enum>.fromKey()`

```ts
const MyEnum = superenum({
  node: 0,
  chrome: 1,
  safari: 2,
});

// End enum declaration

const nodeValue = MyEnum.fromKey('node'); // MyEnum.node / 0
const invalidValue = MyEnum.fromKey('NoDe'); // undefined
const nodeValue2 = MyEnum.fromKey('NoDe', {
  ignoreCase: true,
}); // MyEnum.node / 0
```

---

## Enum key from enum value

There are use-cases where you might want to get an enum key from the enum value. An example might be for
logging purposes.

This is possible with `<enum>.keyFromValue()`

```ts
const MyEnum = superenum({
  node: 'NodeJS',
  chrome: 'GoogleChrome',
  safari: 'MacOSSafari',
});

// End enum declaration

const nodeKey = MyEnum.keyFromValue('NodeJS'); // 'node'
const nodeKey2 = MyEnum.keyFromValue(MyEnum.node); // 'node'
const invalid = MyEnum.keyFromValue('node'); // undefined
```

---

## Metadata

Want to associate some data with a particular enum value? An example might be to store a set of description strings
against a set of keys... the possibilities are endless.

This is possible with `<enum>.setMetadata()` and `<enum>.getMetadata()`

```ts
const MyEnum = superenum(['node', 'chrome', 'safari']);

MyEnum.setMetadata(MyEnum.node, 'Node.js is an open-source, cross-platform...');
MyEnum.setMetadata(MyEnum.chrome, 'Chrome is faster than fast – it’s engine...');
MyEnum.setMetadata(MyEnum.safari, 'Safari is the best way to experience the...');

// End enum declaration

// Input value could come from external data / API
const valueNode = MyEnum.fromValue('node'); // MyEnum.node / 'node'
const desc = MyEnum.getMetadata(valueNode); // 'Node.js is an open-source, cross-platform...'
```

---

## API

[API Documentation](dist/docs/API.md)

---

## Feature Comparison

| Feature                                       | `@ncoderz/enum` (numeric and string)          | TypeScript `enum` (numeric)                                                        | TypeScript `enum` (string)                                                                                                   |
| --------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Compatible with simple JS enums               | Yes                                           | X                                                                                  | X                                                                                                                            |
| Mixed numeric and string keys                 | Yes                                           | X                                                                                  | X                                                                                                                            |
| Compare value                                 | `value === Enum.key`                          | `Enum[value] === Enum[Enum.key]`                                                   | `value === Enum.key`                                                                                                         |
| Validate external data to valid typed enum    | `const val: EnumType = Enum.fromValue(value)` | `const val: Enum = ((Enum[value] === Enum[Enum.key]) ? value : undefined) as Enum` | `const val: Enum = ((value === Enum.key) ? value : undefined) as Enum`                                                       |
| Value from key                                | `const val: EnumType = Enum.fromKey(key)`     | `Enum[key]` - only if key is const; not very useful                                | `Object.entries(Enum).reduce((acc, [k,v]) => { if (acc) return acc; if (k === key) return v; }, '')` - not typed (is string) |
| Value from key safe?                          | Safe                                          | No, will return key for invalid input which happens to be a valid value            | Safe, but see above!                                                                                                         |
| Key from value                                | `Enum.keyFromValue(value)`                    | `Enum[value]`                                                                      | `Object.entries(Enum).reduce((acc, [k,v]) => { if (acc) return acc; if (v === value) return k; }, '')`                       |
| Key from value safe?                          | Safe                                          | No, will return value for invalid input which happens to be a valid key            | Safe, but see above!                                                                                                         |
| Iterate values?                               | `Enum.values()`                               | `Object.values(Enum).filter((v) => isNaN(Number(v))`                               | `Object.values(Enum)`                                                                                                        |
| Iterate keys?                                 | `Enum.keys()`                                 | `Object.keys(Enum).filter((k) => !isNaN(Number(k))`                                | `Object.keys(Enum)`                                                                                                          |
| Iterate entries?                              | `Enum.entries()`                              | `Object.entries(Enum).filter(([k,v]) => isNaN(Number(k)))`                         | `Object.entries(Enum)`                                                                                                       |
| Associate metadata with an enum value         | Yes                                           | X                                                                                  | X                                                                                                                            |
| Declare just first number value and increment | X                                             | Yes                                                                                | N/A                                                                                                                          |
| Bloat code?                                   | < 1kB                                         | Built-in                                                                           | Built-in                                                                                                                     |
| Fast?                                         | Yes                                           | Workarounds involve looping                                                        | Workarounds involve looping                                                                                                  |

---

## Limitations

Enums may not use the keys:

`fromKey`, `fromValue`, `keyFromValue`, `setMetadata`, `getMetadata`, `keys`, `values`, `entries`

as these clash with the extension functions.

If such a key is used, it will be overwitten with the extension function.

---

## License

This open source software is licensed under the [BSD-2-Clause license](https://opensource.org/licenses/BSD-2-Clause).

---

## Alternatives

- [TypeScript enums](https://www.typescriptlang.org/docs/handbook/enums.html)
