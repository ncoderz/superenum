[**@ncoderz/superenum**](../README.md) • **Docs**

***

[@ncoderz/superenum](../globals.md) / superenum

# Function: superenum()

> **superenum**\<`K`, `V`, `T`\>(`enumeration`, `options`?): `Readonly`\<`T`\> & [`EnumExtensions`](../interfaces/EnumExtensions.md)\<[`EnumType`](../type-aliases/EnumType.md)\<`T`\>\>

Create a superenum from a plain JavaScript object.

Alias of [Superenum.fromObject](../interfaces/Superenum.md#fromObject).

## Type Parameters

• **K** *extends* `string`

• **V** *extends* [`EnumValue`](../type-aliases/EnumValue.md)

• **T** *extends* [`ObjectEnum`](../type-aliases/ObjectEnum.md)\<`K`, `V`\>

## Parameters

• **enumeration**: `T`

the plain JavaScript object enum to enhance

• **options?**: [`EnumOptions`](../interfaces/EnumOptions.md)

options for the enum enhancement

## Returns

`Readonly`\<`T`\> & [`EnumExtensions`](../interfaces/EnumExtensions.md)\<[`EnumType`](../type-aliases/EnumType.md)\<`T`\>\>

the plain object enum converted to a superenum

## Defined in

[superenum.ts:523](https://github.com/ncoderz/superenum/blob/c6fe1004db5e60151f690d0ad11d6a45c011546d/src/superenum.ts#L523)
