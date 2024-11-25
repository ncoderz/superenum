[**@ncoderz/superenum**](../README.md) • **Docs**

***

[@ncoderz/superenum](../globals.md) / ArrayEnumToObjectEnum

# Type Alias: ArrayEnumToObjectEnum\<T\>

> **ArrayEnumToObjectEnum**\<`T`\>: `{ [K in T extends ReadonlyArray<infer U> ? U : never]: T extends ReadonlyArray<infer U> ? U : never }`

Convert an ArrayEnum type to an ObjectEnum

## Type Parameters

• **T** *extends* `ReadonlyArray`\<[`EnumValue`](EnumValue.md)\>

## Defined in

[superenum.ts:49](https://github.com/ncoderz/superenum/blob/45b5b9f31900d20b7c93c62dca1346247d779e81/src/superenum.ts#L49)
