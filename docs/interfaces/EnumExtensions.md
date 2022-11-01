[@relefant/superenum](../API.md) / [Exports](../modules.md) / EnumExtensions

# Interface: EnumExtensions<V\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends [`EnumValue`](../modules.md#EnumValue) |

## Table of contents

### Methods

- [fromValue](EnumExtensions.md#fromValue)
- [fromKey](EnumExtensions.md#fromKey)
- [keyFromValue](EnumExtensions.md#keyFromValue)
- [setMetadata](EnumExtensions.md#setMetadata)
- [getMetadata](EnumExtensions.md#getMetadata)
- [values](EnumExtensions.md#values)
- [keys](EnumExtensions.md#keys)
- [entries](EnumExtensions.md#entries)
- [[iterator]](EnumExtensions.md#[iterator])

## Methods

### fromValue

▸ **fromValue**(`value`, `options?`): `undefined` \| `V`

Validate an enum value, returning the value if valid, otherwise undefined.

Since a superenum is just the value, then all this function does is check to see if the value exists, and if
so returns it, otherwise it returns undefined.

Note: If the enum has duplicate values (or duplicate values when lower-cased if
[ignoreCase](FromValueOptions.md#ignoreCase) is true), the data returned when when values clash will be indeterminate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | the enum value to validate |
| `options?` | [`FromValueOptions`](FromValueOptions.md) | options for the function |

#### Returns

`undefined` \| `V`

the enum value, or undefined if the value cannot be matched to the enum

#### Defined in

[superenum.ts:120](https://github.com/relefant/superenum/blob/cd25d8d/src/superenum.ts#L120)

___

### fromKey

▸ **fromKey**(`key`, `options?`): `undefined` \| `V`

Get an enum value from its key, returning the value if key valid, otherwise undefined.

Note: If the enum has duplicate keys when lower-cased if
[ignoreCase](FromKeyOptions.md#ignoreCase) is true, the data returned when when keys clash will be indeterminate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `undefined` \| `string` \| `number` | the enum key to convert to enum value |
| `options?` | [`FromKeyOptions`](FromKeyOptions.md) | options for the function |

#### Returns

`undefined` \| `V`

the enum represented by the key, or undefined if the key cannot be matched to the enum

#### Defined in

[superenum.ts:132](https://github.com/relefant/superenum/blob/cd25d8d/src/superenum.ts#L132)

___

### keyFromValue

▸ **keyFromValue**(`value`, `options?`): `undefined` \| `string`

Get an enum key from its value, returning the key if value valid, otherwise undefined.

Note: If the enum has duplicate values (or duplicate values when lower-cased if
[ignoreCase](KeyFromValueOptions.md#ignoreCase) is true), the data returned when when values clash will be indeterminate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | the enum value to convert to enum key |
| `options?` | [`KeyFromValueOptions`](KeyFromValueOptions.md) | options for the function |

#### Returns

`undefined` \| `string`

the enum key represented by the value, or undefined if the value cannot be matched to the enum

#### Defined in

[superenum.ts:144](https://github.com/relefant/superenum/blob/cd25d8d/src/superenum.ts#L144)

___

### setMetadata

▸ **setMetadata**<`M`\>(`value`, `metadata`, `options?`): `boolean`

Store metadata for an enum value. If value is not valid, the metadata will not be stored.

#### Type parameters

| Name |
| :------ |
| `M` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| `V` | the value for which to store metadata |
| `metadata` | `M` | the metadata to store |
| `options?` | [`SetMetadataOptions`](SetMetadataOptions.md) | options for the function |

#### Returns

`boolean`

true if the metadata was associated with the value, otherwise false

#### Defined in

[superenum.ts:154](https://github.com/relefant/superenum/blob/cd25d8d/src/superenum.ts#L154)

___

### getMetadata

▸ **getMetadata**<`M`\>(`value`, `options?`): `undefined` \| `M`

Retrieve metadata that was stored against an enum value.

If no metadata is found, or the value is invalid, undefined will be returned.

#### Type parameters

| Name |
| :------ |
| `M` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| `V` | the value for which to retrieve metadata |
| `options?` | [`GetMetadataOptions`](GetMetadataOptions.md) | options for the function |

#### Returns

`undefined` \| `M`

the metadata associated with the enum value

#### Defined in

[superenum.ts:165](https://github.com/relefant/superenum/blob/cd25d8d/src/superenum.ts#L165)

___

### values

▸ **values**(): `IterableIterator`<`V`\>

An iterator that iterates the enum values.

Note: Iteration order is guaranteed unless the enum is initialised using [Superenum](Superenum.md) or
[fromObject](Superenum.md#fromObject) and it contains keys which can be converted to integers. In this case it will
follow the rules of the JavaScript engine which may vary. In order to guarantee iteration order
in the case of integer keys, use [fromArray](Superenum.md#fromArray) to initialise the enum, or pass in an array
of keys to [iterationKeys](EnumOptions.md#iterationKeys) to represent the desired iteration order.

https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order

#### Returns

`IterableIterator`<`V`\>

iterator over the enum values

#### Defined in

[superenum.ts:180](https://github.com/relefant/superenum/blob/cd25d8d/src/superenum.ts#L180)

___

### keys

▸ **keys**(): `IterableIterator`<`string`\>

An iterator that iterates the enum keys.

Note: Iteration order is guaranteed unless the enum is initialised using [Superenum](Superenum.md) or
[fromObject](Superenum.md#fromObject) and it contains keys which can be converted to integers. In this case it will
follow the rules of the JavaScript engine which may vary. In order to guarantee iteration order
in the case of integer keys, use [fromArray](Superenum.md#fromArray) to initialise the enum, or pass in an array
of keys to [iterationKeys](EnumOptions.md#iterationKeys) to represent the desired iteration order.

https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order

#### Returns

`IterableIterator`<`string`\>

iterator over the enum values

#### Defined in

[superenum.ts:195](https://github.com/relefant/superenum/blob/cd25d8d/src/superenum.ts#L195)

___

### entries

▸ **entries**(): `IterableIterator`<[`string`, `V`]\>

An iterator that iterates the enum entries.

Note: Iteration order is guaranteed unless the enum is initialised using [Superenum](Superenum.md) or
[fromObject](Superenum.md#fromObject) and it contains keys which can be converted to integers. In this case it will
follow the rules of the JavaScript engine which may vary. In order to guarantee iteration order
in the case of integer keys, use [fromArray](Superenum.md#fromArray) to initialise the enum, or pass in an array
of keys to [iterationKeys](EnumOptions.md#iterationKeys) to represent the desired iteration order.

https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order

#### Returns

`IterableIterator`<[`string`, `V`]\>

iterator over the enum values

#### Defined in

[superenum.ts:210](https://github.com/relefant/superenum/blob/cd25d8d/src/superenum.ts#L210)

___

### [iterator]

▸ **[iterator]**(): `IterableIterator`<`V`\>

An iterator that iterates the enum values.

Alias of [values](EnumExtensions.md#values).

https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order

#### Returns

`IterableIterator`<`V`\>

iterator over the enum values

#### Defined in

[superenum.ts:221](https://github.com/relefant/superenum/blob/cd25d8d/src/superenum.ts#L221)
