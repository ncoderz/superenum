[**@ncoderz/superenum**](../README.md) • **Docs**

***

[@ncoderz/superenum](../globals.md) / ArrayEnumToObjectEnum

# Type Alias: ArrayEnumToObjectEnum\<T\>

> **ArrayEnumToObjectEnum**\<`T`\>: `{ [K in T extends ReadonlyArray<infer U> ? U : never]: T extends ReadonlyArray<infer U> ? U : never }`

Convert an ArrayEnum type to an ObjectEnum

## Type Parameters

• **T** *extends* `ReadonlyArray`\<[`EnumValue`](EnumValue.md)\>

## Defined in

[superenum.ts:49](https://github.com/ncoderz/superenum/blob/c6fe1004db5e60151f690d0ad11d6a45c011546d/src/superenum.ts#L49)
