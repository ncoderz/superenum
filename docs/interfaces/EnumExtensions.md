[**@ncoderz/superenum**](../README.md) • **Docs**

***

[@ncoderz/superenum](../globals.md) / EnumExtensions

# Interface: EnumExtensions\<V\>

## Type Parameters

• **V** *extends* [`EnumValue`](../type-aliases/EnumValue.md)

## Methods

### fromValue()

> **fromValue**(`value`, `options`?): `undefined` \| `V`

Validate an enum value, returning the value if valid, otherwise undefined.

Since a superenum is just the value, then all this function does is check to see if the value exists, and if
so returns it, otherwise it returns undefined.

Note: If the enum has duplicate values (or duplicate values when lower-cased if
[FromValueOptions.ignoreCase](FromValueOptions.md#ignoreCase) is true), the data returned when when values clash will be indeterminate.

#### Parameters

• **value**: `unknown`

the enum value to validate

• **options?**: [`FromValueOptions`](FromValueOptions.md)

options for the function

#### Returns

`undefined` \| `V`

the enum value, or undefined if the value cannot be matched to the enum

#### Defined in

[superenum.ts:120](https://github.com/ncoderz/superenum/blob/c6fe1004db5e60151f690d0ad11d6a45c011546d/src/superenum.ts#L120)

***

### fromKey()

> **fromKey**(`key`, `options`?): `undefined` \| `V`

Get an enum value from its key, returning the value if key valid, otherwise undefined.

Note: If the enum has duplicate keys when lower-cased if
[FromKeyOptions.ignoreCase](FromKeyOptions.md#ignoreCase) is true, the data returned when when keys clash will be indeterminate.

#### Parameters

• **key**: `undefined` \| `null` \| `string` \| `number`

the enum key to convert to enum value

• **options?**: [`FromKeyOptions`](FromKeyOptions.md)

options for the function

#### Returns

`undefined` \| `V`

the enum represented by the key, or undefined if the key cannot be matched to the enum

#### Defined in

[superenum.ts:132](https://github.com/ncoderz/superenum/blob/c6fe1004db5e60151f690d0ad11d6a45c011546d/src/superenum.ts#L132)

***

### keyFromValue()

> **keyFromValue**(`value`, `options`?): `undefined` \| `string`

Get an enum key from its value, returning the key if value valid, otherwise undefined.

Note: If the enum has duplicate values (or duplicate values when lower-cased if
[KeyFromValueOptions.ignoreCase](KeyFromValueOptions.md#ignoreCase) is true), the data returned when when values clash will be indeterminate.

#### Parameters

• **value**: `unknown`

the enum value to convert to enum key

• **options?**: [`KeyFromValueOptions`](KeyFromValueOptions.md)

options for the function

#### Returns

`undefined` \| `string`

the enum key represented by the value, or undefined if the value cannot be matched to the enum

#### Defined in

[superenum.ts:144](https://github.com/ncoderz/superenum/blob/c6fe1004db5e60151f690d0ad11d6a45c011546d/src/superenum.ts#L144)

***

### setMetadata()

> **setMetadata**\<`M`\>(`value`, `metadata`, `options`?): `boolean`

Store metadata for an enum value. If value is not valid, the metadata will not be stored.

#### Type Parameters

• **M**

#### Parameters

• **value**: `undefined` \| `null` \| `V`

the value for which to store metadata

• **metadata**: `M`

the metadata to store

• **options?**: [`SetMetadataOptions`](SetMetadataOptions.md)

options for the function

#### Returns

`boolean`

true if the metadata was associated with the value, otherwise false

#### Defined in

[superenum.ts:154](https://github.com/ncoderz/superenum/blob/c6fe1004db5e60151f690d0ad11d6a45c011546d/src/superenum.ts#L154)

***

### getMetadata()

> **getMetadata**\<`M`\>(`value`, `options`?): `undefined` \| `M`

Retrieve metadata that was stored against an enum value.

If no metadata is found, or the value is invalid, undefined will be returned.

#### Type Parameters

• **M**

#### Parameters

• **value**: `undefined` \| `null` \| `V`

the value for which to retrieve metadata

• **options?**: [`GetMetadataOptions`](GetMetadataOptions.md)

options for the function

#### Returns

`undefined` \| `M`

the metadata associated with the enum value

#### Defined in

[superenum.ts:165](https://github.com/ncoderz/superenum/blob/c6fe1004db5e60151f690d0ad11d6a45c011546d/src/superenum.ts#L165)

***

### values()

> **values**(): readonly `V`[]

Get an array of the enum values.

Note: Item order is guaranteed unless the enum is initialised using [Superenum](Superenum.md) or
[Superenum.fromObject](Superenum.md#fromObject) and it contains keys which can be converted to integers. In this case it will
follow the rules of the JavaScript engine which may vary. In order to guarantee the item order
in the case of integer keys, use [Superenum.fromArray](Superenum.md#fromArray) to initialise the enum, or pass in an array
of keys to [EnumOptions.iterationKeys](EnumOptions.md#iterationKeys) to represent the desired item order.

https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order

#### Returns

readonly `V`[]

iterator over the enum values

#### Defined in

[superenum.ts:180](https://github.com/ncoderz/superenum/blob/c6fe1004db5e60151f690d0ad11d6a45c011546d/src/superenum.ts#L180)

***

### keys()

> **keys**(): readonly `string`[]

Get an array of the enum keys.

Note: Item order is guaranteed unless the enum is initialised using [Superenum](Superenum.md) or
[Superenum.fromObject](Superenum.md#fromObject) and it contains keys which can be converted to integers. In this case it will
follow the rules of the JavaScript engine which may vary. In order to guarantee the item order
in the case of integer keys, use [Superenum.fromArray](Superenum.md#fromArray) to initialise the enum, or pass in an array
of keys to [EnumOptions.iterationKeys](EnumOptions.md#iterationKeys) to represent the desired item order.

https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order

#### Returns

readonly `string`[]

iterator over the enum values

#### Defined in

[superenum.ts:195](https://github.com/ncoderz/superenum/blob/c6fe1004db5e60151f690d0ad11d6a45c011546d/src/superenum.ts#L195)

***

### entries()

> **entries**(): readonly [`string`, `V`][]

Get an array of the enum entries.

Note: Item order is guaranteed unless the enum is initialised using [Superenum](Superenum.md) or
[Superenum.fromObject](Superenum.md#fromObject) and it contains keys which can be converted to integers. In this case it will
follow the rules of the JavaScript engine which may vary. In order to guarantee the item order
in the case of integer keys, use [Superenum.fromArray](Superenum.md#fromArray) to initialise the enum, or pass in an array
of keys to [EnumOptions.iterationKeys](EnumOptions.md#iterationKeys) to represent the desired item order.

https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order

#### Returns

readonly [`string`, `V`][]

iterator over the enum values

#### Defined in

[superenum.ts:210](https://github.com/ncoderz/superenum/blob/c6fe1004db5e60151f690d0ad11d6a45c011546d/src/superenum.ts#L210)

***

### \[iterator\]()

> **\[iterator\]**(): `IterableIterator`\<`V`, `any`, `any`\>

An iterator that iterates the enum values.

Note: Iteration order is guaranteed unless the enum is initialised using [Superenum](Superenum.md) or
[Superenum.fromObject](Superenum.md#fromObject) and it contains keys which can be converted to integers. In this case it will
follow the rules of the JavaScript engine which may vary. In order to guarantee iteration order
in the case of integer keys, use [Superenum.fromArray](Superenum.md#fromArray) to initialise the enum, or pass in an array
of keys to [EnumOptions.iterationKeys](EnumOptions.md#iterationKeys) to represent the desired iteration order.

https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order

#### Returns

`IterableIterator`\<`V`, `any`, `any`\>

iterator over the enum values

#### Defined in

[superenum.ts:225](https://github.com/ncoderz/superenum/blob/c6fe1004db5e60151f690d0ad11d6a45c011546d/src/superenum.ts#L225)
