[**@ncoderz/superenum**](../README.md) • **Docs**

***

[@ncoderz/superenum](../globals.md) / Superenum

# Interface: Superenum()

Interface to manage superenums

> **Superenum**\<`K`, `V`, `T`\>(`enumeration`, `options`?): `Readonly`\<`T`\> & [`EnumExtensions`](EnumExtensions.md)\<[`EnumType`](../type-aliases/EnumType.md)\<`T`\>\>

Interface to manage superenums

## Type Parameters

• **K** *extends* `string`

• **V** *extends* [`EnumValue`](../type-aliases/EnumValue.md)

• **T** *extends* [`ObjectEnum`](../type-aliases/ObjectEnum.md)\<`K`, `V`\>

## Parameters

• **enumeration**: `T`

the plain JavaScript object enum to enhance

• **options?**: [`EnumOptions`](EnumOptions.md)

options for the enum enhancement

## Returns

`Readonly`\<`T`\> & [`EnumExtensions`](EnumExtensions.md)\<[`EnumType`](../type-aliases/EnumType.md)\<`T`\>\>

the plain object enum converted to a superenum

## Defined in

[superenum.ts:241](https://github.com/ncoderz/superenum/blob/2ce698cc608b8a9eb1339af0ae362b09ca3bb157/src/superenum.ts#L241)

## Methods

### fromObject()

> **fromObject**\<`K`, `V`, `T`\>(`enumeration`, `options`?): `Readonly`\<`T`\> & [`EnumExtensions`](EnumExtensions.md)\<[`EnumType`](../type-aliases/EnumType.md)\<`T`\>\>

Create a superenum from a plain JavaScript object.

The plain JavaScript object will be enhanced with [EnumExtensions](EnumExtensions.md).

Note: Item / iteration order is guaranteed unless the enum is initialised using [Superenum](Superenum.md) or
[Superenum.fromObject](Superenum.md#fromObject) and it contains keys which can be converted to integers. In this case it will
follow the rules of the JavaScript engine which may vary. In order to guarantee the item / iteration order
in the case of integer keys, use [Superenum.fromArray](Superenum.md#fromArray) to initialise the enum, or pass in an array
of keys to [EnumOptions.iterationKeys](EnumOptions.md#iterationKeys) to represent the desired item / iteration order.

Note: If the object has duplicate values, or duplicate keys or values when lower-cased, the initialisation will
still succeed. However, the behaviour of
[EnumExtensions.fromValue](EnumExtensions.md#fromValue),
[EnumExtensions.fromKey](EnumExtensions.md#fromKey),
[EnumExtensions.keyFromValue](EnumExtensions.md#keyFromValue)
will be indeterminate in cases where the keys / values clash.

#### Type Parameters

• **K** *extends* `string`

• **V** *extends* [`EnumValue`](../type-aliases/EnumValue.md)

• **T** *extends* [`ObjectEnum`](../type-aliases/ObjectEnum.md)\<`K`, `V`\>

#### Parameters

• **enumeration**: `T`

the plain JavaScript object enum to enhance

• **options?**: [`EnumOptions`](EnumOptions.md)

options for the enum enhancement

#### Returns

`Readonly`\<`T`\> & [`EnumExtensions`](EnumExtensions.md)\<[`EnumType`](../type-aliases/EnumType.md)\<`T`\>\>

the plain object enum converted to a superenum

#### Defined in

[superenum.ts:268](https://github.com/ncoderz/superenum/blob/2ce698cc608b8a9eb1339af0ae362b09ca3bb157/src/superenum.ts#L268)

***

### fromArray()

> **fromArray**\<`V`, `T`\>(`enumeration`, `options`?): `Readonly`\<[`ArrayEnumToObjectEnum`](../type-aliases/ArrayEnumToObjectEnum.md)\<`T`\>\> & [`EnumExtensions`](EnumExtensions.md)\<[`EnumType`](../type-aliases/EnumType.md)\<[`ArrayEnumToObjectEnum`](../type-aliases/ArrayEnumToObjectEnum.md)\<`T`\>\>\>

Create a superenum from a plain JavaScript array.

The array will be converted to a plain JavaScript object will be enhanced with [EnumExtensions](EnumExtensions.md).

Note: Iteration order is guaranteed to be that of the items in the array. A different iteration order can be
specified using [EnumOptions.iterationKeys](EnumOptions.md#iterationKeys) to represent the desired iteration order.

Note: If the array has duplicate values, the initialisation will not fail. Instead the duplicate values will
be ignored and the resultant enum will contain just one of the values.

Note: If the array has duplicate values when lower-cased, the data returned when
calling [EnumExtensions.fromKey](EnumExtensions.md#fromKey) and [EnumExtensions.keyFromValue](EnumExtensions.md#keyFromValue) with
*ignoreCase* set will be indeterminate for duplicate keys / values.

#### Type Parameters

• **V** *extends* [`EnumValue`](../type-aliases/EnumValue.md)

• **T** *extends* [`ArrayEnum`](../type-aliases/ArrayEnum.md)\<`V`\>

#### Parameters

• **enumeration**: `T`

the plain JavaScript array to convert and enhance

• **options?**: [`EnumOptions`](EnumOptions.md)

options for the enum enhancement

#### Returns

`Readonly`\<[`ArrayEnumToObjectEnum`](../type-aliases/ArrayEnumToObjectEnum.md)\<`T`\>\> & [`EnumExtensions`](EnumExtensions.md)\<[`EnumType`](../type-aliases/EnumType.md)\<[`ArrayEnumToObjectEnum`](../type-aliases/ArrayEnumToObjectEnum.md)\<`T`\>\>\>

the plain array enum converted to a superenum

#### Defined in

[superenum.ts:292](https://github.com/ncoderz/superenum/blob/2ce698cc608b8a9eb1339af0ae362b09ca3bb157/src/superenum.ts#L292)
