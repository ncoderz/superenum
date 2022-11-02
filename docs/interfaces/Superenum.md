[@relefant/superenum](../API.md) / [Exports](../modules.md) / Superenum

# Interface: Superenum

## Callable

### Superenum

▸ **Superenum**<`K`, `V`, `T`\>(`enumeration`, `options?`): `Readonly`<`T`\> & [`EnumExtensions`](EnumExtensions.md)<[`EnumType`](../modules.md#EnumType)<`T`\>\>

Create a superenum from a plain JavaScript object.

Alias of [fromObject](Superenum.md#fromObject).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `V` | extends [`EnumValue`](../modules.md#EnumValue) |
| `T` | extends [`ObjectEnum`](../modules.md#ObjectEnum)<`K`, `V`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumeration` | `T` | the plain JavaScript object enum to enhance |
| `options?` | [`EnumOptions`](EnumOptions.md) | options for the enum enhancement |

#### Returns

`Readonly`<`T`\> & [`EnumExtensions`](EnumExtensions.md)<[`EnumType`](../modules.md#EnumType)<`T`\>\>

the plain object enum converted to a superenum

#### Defined in

[superenum.ts:241](https://github.com/relefant/superenum/blob/b61a8d6/src/superenum.ts#L241)

## Table of contents

### Methods

- [fromObject](Superenum.md#fromObject)
- [fromArray](Superenum.md#fromArray)

## Methods

### fromObject

▸ **fromObject**<`K`, `V`, `T`\>(`enumeration`, `options?`): `Readonly`<`T`\> & [`EnumExtensions`](EnumExtensions.md)<[`EnumType`](../modules.md#EnumType)<`T`\>\>

Create a superenum from a plain JavaScript object.

The plain JavaScript object will be enhanced with [EnumExtensions](EnumExtensions.md).

Note: Item / iteration order is guaranteed unless the enum is initialised using [Superenum](Superenum.md) or
[fromObject](Superenum.md#fromObject) and it contains keys which can be converted to integers. In this case it will
follow the rules of the JavaScript engine which may vary. In order to guarantee the item / iteration order
in the case of integer keys, use [fromArray](Superenum.md#fromArray) to initialise the enum, or pass in an array
of keys to [iterationKeys](EnumOptions.md#iterationKeys) to represent the desired item / iteration order.

Note: If the object has duplicate values, or duplicate keys or values when lower-cased, the initialisation will
still succeed. However, the behaviour of
[fromValue](EnumExtensions.md#fromValue),
[fromKey](EnumExtensions.md#fromKey),
[keyFromValue](EnumExtensions.md#keyFromValue)
will be indeterminate in cases where the keys / values clash.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `V` | extends [`EnumValue`](../modules.md#EnumValue) |
| `T` | extends [`ObjectEnum`](../modules.md#ObjectEnum)<`K`, `V`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumeration` | `T` | the plain JavaScript object enum to enhance |
| `options?` | [`EnumOptions`](EnumOptions.md) | options for the enum enhancement |

#### Returns

`Readonly`<`T`\> & [`EnumExtensions`](EnumExtensions.md)<[`EnumType`](../modules.md#EnumType)<`T`\>\>

the plain object enum converted to a superenum

#### Defined in

[superenum.ts:268](https://github.com/relefant/superenum/blob/b61a8d6/src/superenum.ts#L268)

___

### fromArray

▸ **fromArray**<`V`, `T`\>(`enumeration`, `options?`): `Readonly`<[`ArrayEnumToObjectEnum`](../modules.md#ArrayEnumToObjectEnum)<`T`\>\> & [`EnumExtensions`](EnumExtensions.md)<[`EnumType`](../modules.md#EnumType)<[`ArrayEnumToObjectEnum`](../modules.md#ArrayEnumToObjectEnum)<`T`\>\>\>

Create a superenum from a plain JavaScript array.

The array will be converted to a plain JavaScript object will be enhanced with [EnumExtensions](EnumExtensions.md).

Note: Iteration order is guaranteed to be that of the items in the array. A different iteration order can be
specified using [iterationKeys](EnumOptions.md#iterationKeys) to represent the desired iteration order.

Note: If the array has duplicate values, the initialisation will not fail. Instead the duplicate values will
be ignored and the resultant enum will contain just one of the values.

Note: If the array has duplicate values when lower-cased, the data returned when
calling [fromKey](EnumExtensions.md#fromKey) and [keyFromValue](EnumExtensions.md#keyFromValue) with
*ignoreCase* set will be indeterminate for duplicate keys / values.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends [`EnumValue`](../modules.md#EnumValue) |
| `T` | extends `V`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumeration` | `T` | the plain JavaScript array to convert and enhance |
| `options?` | [`EnumOptions`](EnumOptions.md) | options for the enum enhancement |

#### Returns

`Readonly`<[`ArrayEnumToObjectEnum`](../modules.md#ArrayEnumToObjectEnum)<`T`\>\> & [`EnumExtensions`](EnumExtensions.md)<[`EnumType`](../modules.md#EnumType)<[`ArrayEnumToObjectEnum`](../modules.md#ArrayEnumToObjectEnum)<`T`\>\>\>

the plain array enum converted to a superenum

#### Defined in

[superenum.ts:292](https://github.com/relefant/superenum/blob/b61a8d6/src/superenum.ts#L292)
