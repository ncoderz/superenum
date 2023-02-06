[@ncoderz/superenum](API.md) / Exports

# @ncoderz/superenum

## Table of contents

### Type Aliases

- [EnumKey](modules.md#EnumKey)
- [EnumValue](modules.md#EnumValue)
- [ArrayEnum](modules.md#ArrayEnum)
- [ObjectEnum](modules.md#ObjectEnum)
- [ArrayEnumToObjectEnum](modules.md#ArrayEnumToObjectEnum)
- [EnumType](modules.md#EnumType)

### Interfaces

- [EnumOptions](interfaces/EnumOptions.md)
- [FromValueOptions](interfaces/FromValueOptions.md)
- [FromKeyOptions](interfaces/FromKeyOptions.md)
- [KeyFromValueOptions](interfaces/KeyFromValueOptions.md)
- [SetMetadataOptions](interfaces/SetMetadataOptions.md)
- [GetMetadataOptions](interfaces/GetMetadataOptions.md)
- [EnumExtensions](interfaces/EnumExtensions.md)
- [Superenum](interfaces/Superenum.md)

### Functions

- [superenum](modules.md#superenum)

## Type Aliases

### EnumKey

Ƭ **EnumKey**: `string`

Enum keys

#### Defined in

[superenum.ts:29](https://github.com/zx-ncoderz/superenum/blob/0639e51/src/superenum.ts#L29)

___

### EnumValue

Ƭ **EnumValue**: `string` \| `number`

Enum values

#### Defined in

[superenum.ts:34](https://github.com/zx-ncoderz/superenum/blob/0639e51/src/superenum.ts#L34)

___

### ArrayEnum

Ƭ **ArrayEnum**<`V`\>: `V`[]

Array Enum declaration

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends [`EnumValue`](modules.md#EnumValue) |

#### Defined in

[superenum.ts:39](https://github.com/zx-ncoderz/superenum/blob/0639e51/src/superenum.ts#L39)

___

### ObjectEnum

Ƭ **ObjectEnum**<`K`, `V`\>: { [key in K]: V }

Object enum declaration

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`EnumKey`](modules.md#EnumKey) |
| `V` | extends [`EnumValue`](modules.md#EnumValue) |

#### Defined in

[superenum.ts:44](https://github.com/zx-ncoderz/superenum/blob/0639e51/src/superenum.ts#L44)

___

### ArrayEnumToObjectEnum

Ƭ **ArrayEnumToObjectEnum**<`T`\>: { [K in T extends ReadonlyArray<infer U\> ? U : never]: T extends ReadonlyArray<infer U\> ? U : never }

Convert an ArrayEnum type to an ObjectEnum

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ReadonlyArray`<[`EnumValue`](modules.md#EnumValue)\> |

#### Defined in

[superenum.ts:49](https://github.com/zx-ncoderz/superenum/blob/0639e51/src/superenum.ts#L49)

___

### EnumType

Ƭ **EnumType**<`T`\>: `T`[keyof `Omit`<`T`, keyof [`EnumExtensions`](interfaces/EnumExtensions.md)<[`EnumValue`](modules.md#EnumValue)\>\>]

Get the type of an enum from a superenum, removing the  [EnumExtensions](interfaces/EnumExtensions.md) from the type

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[superenum.ts:56](https://github.com/zx-ncoderz/superenum/blob/0639e51/src/superenum.ts#L56)

## Functions

### superenum

▸ **superenum**<`K`, `V`, `T`\>(`enumeration`, `options?`): `Readonly`<`T`\> & [`EnumExtensions`](interfaces/EnumExtensions.md)<[`EnumType`](modules.md#EnumType)<`T`\>\>

Create a superenum from a plain JavaScript object.

Alias of [fromObject](interfaces/Superenum.md#fromObject).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |
| `V` | extends [`EnumValue`](modules.md#EnumValue) |
| `T` | extends [`ObjectEnum`](modules.md#ObjectEnum)<`K`, `V`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enumeration` | `T` | the plain JavaScript object enum to enhance |
| `options?` | [`EnumOptions`](interfaces/EnumOptions.md) | options for the enum enhancement |

#### Returns

`Readonly`<`T`\> & [`EnumExtensions`](interfaces/EnumExtensions.md)<[`EnumType`](modules.md#EnumType)<`T`\>\>

the plain object enum converted to a superenum

#### Defined in

[superenum.ts:241](https://github.com/zx-ncoderz/superenum/blob/0639e51/src/superenum.ts#L241)
