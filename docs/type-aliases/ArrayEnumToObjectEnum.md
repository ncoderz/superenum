[**@ncoderz/superenum**](../README.md) • **Docs**

***

[@ncoderz/superenum](../globals.md) / ArrayEnumToObjectEnum

# Type Alias: ArrayEnumToObjectEnum\<T\>

> **ArrayEnumToObjectEnum**\<`T`\>: `{ [K in T extends ReadonlyArray<infer U> ? U : never]: T extends ReadonlyArray<infer U> ? U : never }`

Convert an ArrayEnum type to an ObjectEnum

## Type Parameters

• **T** *extends* `ReadonlyArray`\<[`EnumValue`](EnumValue.md)\>

## Defined in

[superenum.ts:49](https://github.com/ncoderz/superenum/blob/d33bc410e0367e18d55ed211c0ba0541eb217d41/src/superenum.ts#L49)
