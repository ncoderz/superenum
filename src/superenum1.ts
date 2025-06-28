/*

Copyright ©2022-24 Ncoderz Ltd

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following
disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE
USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Enum keys
 */
export type EnumKey = string;

/**
 * Enum values
 */
export type EnumValue = string | number;

/**
 * Array Enum declaration
 */
export type ArrayEnum<V extends EnumValue> = V[];

/**
 * Object enum declaration
 */
export type ObjectEnum<K extends EnumKey, V extends EnumValue> = { [key in K]: V };

/**
 * Convert an ArrayEnum type to an ObjectEnum
 */
export type ArrayEnumToObjectEnum<T extends ReadonlyArray<EnumValue>> = {
  [K in T extends ReadonlyArray<infer U> ? U : never]: T extends ReadonlyArray<infer U> ? U : never;
};

/**
 * Get the type of an enum from a superenum, removing the  {@link EnumExtensions} from the type
 */
export type EnumType<T> = T[keyof Omit<T, keyof EnumExtensions<EnumValue>>];

/**
 * Options for the {@link Superenum} and {@link Superenum.fromArray} functions
 */
export interface EnumOptions {
  iterationKeys?: ArrayEnum<EnumValue>;
  noFreeze?: boolean;
  noTSEnumReverseMapping?: boolean;
}

/**
 * Options for the {@link EnumExtensions.fromValue} function
 */
export interface FromValueOptions {
  /**
   * Ignore case when validating the enum value
   */
  ignoreCase?: boolean;
}

/**
 * Options for the {@link EnumExtensions.fromKey} function
 */
export interface FromKeyOptions {
  /**
   * Ignore case when getting the enum value from the key
   */
  ignoreCase?: boolean;
}

/**
 * Options for the {@link EnumExtensions.keyFromValue} function
 */
export interface KeyFromValueOptions {
  /**
   * Ignore case when getting the enum key from the value
   */
  ignoreCase?: boolean;
}

/**
 * Options for the {@link EnumExtensions.setMetadata} function
 */
export interface SetMetadataOptions {}

/**
 * Options for the {@link EnumExtensions.getMetadata} function
 */
export interface GetMetadataOptions {}

export interface EnumExtensions<V extends EnumValue> {
  /**
   * Validate an enum value, returning the value if valid, otherwise undefined.
   *
   * Since a superenum is just the value, then all this function does is check to see if the value exists, and if
   * so returns it, otherwise it returns undefined.
   *
   * Note: If the enum has duplicate values (or duplicate values when lower-cased if
   * {@link FromValueOptions.ignoreCase} is true), the data returned when when values clash will be indeterminate.
   *
   * @param value - the enum value to validate
   * @param options - options for the function
   * @returns the enum value, or undefined if the value cannot be matched to the enum
   */
  fromValue(value: unknown | null | undefined, options?: FromValueOptions): V | undefined;

  /**
   * Get an enum value from its key, returning the value if key valid, otherwise undefined.
   *
   * Note: If the enum has duplicate keys when lower-cased if
   * {@link FromKeyOptions.ignoreCase} is true, the data returned when when keys clash will be indeterminate.
   *
   * @param key - the enum key to convert to enum value
   * @param options - options for the function
   * @returns the enum represented by the key, or undefined if the key cannot be matched to the enum
   */
  fromKey(key: EnumKey | number | null | undefined, options?: FromKeyOptions): V | undefined;

  /**
   * Get an enum key from its value, returning the key if value valid, otherwise undefined.
   *
   * Note: If the enum has duplicate values (or duplicate values when lower-cased if
   * {@link KeyFromValueOptions.ignoreCase} is true), the data returned when when values clash will be indeterminate.
   *
   * @param value - the enum value to convert to enum key
   * @param options - options for the function
   * @returns the enum key represented by the value, or undefined if the value cannot be matched to the enum
   */
  keyFromValue(
    value: unknown | null | undefined,
    options?: KeyFromValueOptions,
  ): string | undefined;

  /**
   * Store metadata for an enum value. If value is not valid, the metadata will not be stored.
   *
   * @param value - the value for which to store metadata
   * @param metadata - the metadata to store
   * @param options - options for the function
   * @returns true if the metadata was associated with the value, otherwise false
   */
  setMetadata<M>(value: V | null | undefined, metadata: M, options?: SetMetadataOptions): boolean;

  /**
   * Retrieve metadata that was stored against an enum value.
   *
   * If no metadata is found, or the value is invalid, undefined will be returned.
   *
   * @param value - the value for which to retrieve metadata
   * @param options - options for the function
   * @returns the metadata associated with the enum value
   */
  getMetadata<M>(value: V | null | undefined, options?: GetMetadataOptions): M | undefined;

  /**
   * Get an array of the enum values.
   *
   * Note: Item order is guaranteed unless the enum is initialised using {@link Superenum} or
   * {@link Superenum.fromObject} and it contains keys which can be converted to integers. In this case it will
   * follow the rules of the JavaScript engine which may vary. In order to guarantee the item order
   * in the case of integer keys, use {@link Superenum.fromArray} to initialise the enum, or pass in an array
   * of keys to {@link EnumOptions.iterationKeys} to represent the desired item order.
   *
   * https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
   *
   * @returns iterator over the enum values
   */
  values(): readonly V[];

  /**
   * Get an array of the enum keys.
   *
   * Note: Item order is guaranteed unless the enum is initialised using {@link Superenum} or
   * {@link Superenum.fromObject} and it contains keys which can be converted to integers. In this case it will
   * follow the rules of the JavaScript engine which may vary. In order to guarantee the item order
   * in the case of integer keys, use {@link Superenum.fromArray} to initialise the enum, or pass in an array
   * of keys to {@link EnumOptions.iterationKeys} to represent the desired item order.
   *
   * https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
   *
   * @returns iterator over the enum values
   */
  keys(): readonly EnumKey[];

  /**
   * Get an array of the enum entries.
   *
   * Note: Item order is guaranteed unless the enum is initialised using {@link Superenum} or
   * {@link Superenum.fromObject} and it contains keys which can be converted to integers. In this case it will
   * follow the rules of the JavaScript engine which may vary. In order to guarantee the item order
   * in the case of integer keys, use {@link Superenum.fromArray} to initialise the enum, or pass in an array
   * of keys to {@link EnumOptions.iterationKeys} to represent the desired item order.
   *
   * https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
   *
   * @returns iterator over the enum values
   */
  entries(): readonly [EnumKey, V][];

  /**
   * An iterator that iterates the enum values.
   *
   * Note: Iteration order is guaranteed unless the enum is initialised using {@link Superenum} or
   * {@link Superenum.fromObject} and it contains keys which can be converted to integers. In this case it will
   * follow the rules of the JavaScript engine which may vary. In order to guarantee iteration order
   * in the case of integer keys, use {@link Superenum.fromArray} to initialise the enum, or pass in an array
   * of keys to {@link EnumOptions.iterationKeys} to represent the desired iteration order.
   *
   * https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
   *
   * @returns iterator over the enum values
   */
  [Symbol.iterator](): IterableIterator<V>;
}

/**
 * Interface to manage superenums
 */
export interface Superenum {
  /**
   * Create a superenum from a plain JavaScript object.
   *
   * Alias of {@link Superenum.fromObject}.
   *
   * @param enumeration - the plain JavaScript object enum to enhance
   * @param options - options for the enum enhancement
   * @returns the plain object enum converted to a superenum
   */
  <K extends EnumKey, V extends EnumValue, T extends ObjectEnum<K, V>>(
    enumeration: T,
    options?: EnumOptions,
  ): Readonly<T> & EnumExtensions<EnumType<T>>;

  /**
   * Create a superenum from a plain JavaScript object.
   *
   * Alias of {@link Superenum.fromArray}.
   *
   * @param enumeration - the plain JavaScript array to convert and enhance
   * @param options - options for the enum enhancement
   * @returns the plain array enum converted to a superenum
   */
  <V extends EnumValue, T extends ArrayEnum<V>>(
    enumeration: T,
    options?: EnumOptions,
  ): Readonly<ArrayEnumToObjectEnum<T>> & EnumExtensions<EnumType<ArrayEnumToObjectEnum<T>>>;

  /**
   * Create a superenum from a plain JavaScript object.
   *
   * The plain JavaScript object will be enhanced with {@link EnumExtensions}.
   *
   * Note: Item / iteration order is guaranteed unless the enum contains keys which can be converted to integers. In this case it will
   * follow the rules of the JavaScript engine which may vary. In order to guarantee the item / iteration order
   * in the case of integer keys, pass in an array
   * of keys to {@link EnumOptions.iterationKeys} to represent the desired item / iteration order.
   *
   * Note: If the object has duplicate values, or duplicate keys or values when lower-cased, the initialisation will
   * still succeed. However, the behaviour of
   * {@link EnumExtensions.fromValue},
   * {@link EnumExtensions.fromKey},
   * {@link EnumExtensions.keyFromValue}
   * will be indeterminate in cases where the keys / values clash.
   *
   * @param enumeration - the plain JavaScript object enum to enhance
   * @param options - options for the enum enhancement
   * @returns the plain object enum enhanced to a superenum
   */
  fromObject<K extends EnumKey, V extends EnumValue, T extends ObjectEnum<K, V>>(
    enumeration: T,
    options?: EnumOptions,
  ): Readonly<T> & EnumExtensions<EnumType<T>>;

  /**
   * Create a superenum from a plain JavaScript array.
   *
   * The array will be converted to a plain JavaScript object will be enhanced with {@link EnumExtensions}.
   *
   * Note: Iteration order is guaranteed to be that of the items in the array. A different iteration order can be
   * specified using {@link EnumOptions.iterationKeys} to represent the desired iteration order.
   *
   * Note: If the array has duplicate values, the initialisation will not fail. Instead the duplicate values will
   * be ignored and the resultant enum will contain just one of the values.
   *
   * Note: If the array has duplicate values when lower-cased, the data returned when
   * calling {@link EnumExtensions.fromKey} and {@link EnumExtensions.keyFromValue} with
   * *ignoreCase* set will be indeterminate for duplicate keys / values.
   *
   * @param enumeration - the plain JavaScript array to convert and enhance
   * @param options - options for the enum enhancement
   * @returns the plain array enhanced to a superenum
   */
  fromArray<V extends EnumValue, T extends ArrayEnum<V>>(
    enumeration: T,
    options?: EnumOptions,
  ): Readonly<ArrayEnumToObjectEnum<T>> & EnumExtensions<EnumType<ArrayEnumToObjectEnum<T>>>;

  /**
   * Create a superenum from a TypeScript enum.
   *
   * The TypeScript enum will be enhanced with {@link EnumExtensions}.
   *
   * Note: Iteration order is guaranteed to be that of the items in the enum. A different iteration order can be
   * specified using {@link EnumOptions.iterationKeys} to represent the desired iteration order.
   *
   * Note: If the enum has duplicate keys or values when lower-cased, the initialisation will
   * still succeed. However, the behaviour of
   * {@link EnumExtensions.fromValue},
   * {@link EnumExtensions.fromKey},
   * {@link EnumExtensions.keyFromValue}
   * will be indeterminate in cases where the keys / values clash.
   *
   * @param enumeration - the TypeScript enum to enhance
   * @param options - options for the enum enhancement
   * @returns the TypeScript enum enhanced to a superenum
   */
  fromTsEnum<K extends EnumKey, V extends EnumValue, T extends ObjectEnum<K, V>>(
    enumeration: T,
    options?: EnumOptions,
  ): Readonly<T> & EnumExtensions<EnumType<T>>;
}

function fromArray(arr: any, options?: EnumOptions) {
  if (!Array.isArray(arr)) arr = [];

  const enumeration = arr.reduce((acc: any, v: any) => {
    acc[`${v}`] = v;
    return acc;
  }, {});

  // Default the iteration keys to be the passed in arr if not set
  if (!options || (options && !options.iterationKeys)) {
    options = Object.assign({}, options);
    options.iterationKeys = arr;
  }

  return fromObject(enumeration, options);
}

function fromTsEnum<T extends Record<string, string | number>>(tsEnum: T, options?: EnumOptions) {
  return superenum.fromObject(tsEnum, options) as Readonly<T> & EnumExtensions<EnumType<T>>;
}

function fromObject(enumeration: any, options?: EnumOptions) {
  // Remove any keys that are numbers - these are the reverse mapping keys from TypeScript enums
  const sanitisedEnumeration: Record<string, EnumValue> = Object.assign({}, enumeration);
  for (const key in enumeration) {
    const nkey = Number(key);
    const isMaybeReverseKey = !isNaN(nkey);
    if (isMaybeReverseKey) {
      const v = enumeration[nkey];
      const isReverseKey = enumeration[v] === nkey;
      if (isReverseKey) delete sanitisedEnumeration[nkey];
    }
  }
  enumeration = sanitisedEnumeration;

  // For reducing code size when minified
  const Object_freeze = Object.freeze;
  const Object_defineProperty = Object.defineProperty;
  const Object_assign = Object.assign;
  const definePropertyOptions = {
    enumerable: false,
    writable: false,
    configurable: false,
  };

  const keyValueMap = new Map<EnumKey, EnumValue>();
  const valueKeyMap = new Map<EnumValue, EnumKey>();
  const lcKeyValueMap = new Map<EnumKey, EnumValue>();
  const lcValueKeyMap = new Map<EnumValue, EnumKey>();
  const metadataMap = new Map<EnumValue, unknown>();
  const iterationKeys = (options?.iterationKeys ?? Object.keys(enumeration)).map((k) => `${k}`);

  // Fill keyValueMap and lcKeyValueMap
  for (const [key, value] of Object.entries(enumeration)) {
    // key must be a string since it's an object property
    keyValueMap.set(key, value as EnumValue);
    lcKeyValueMap.set(key.toLowerCase(), value as EnumValue);
  }

  // Fill valueKeyMap and lcValueKeyMap
  for (const [key, value] of keyValueMap) {
    // value might be a number, so much check
    const lcValue = typeof value === 'string' ? value.toLowerCase() : value;

    valueKeyMap.set(value, key);
    lcValueKeyMap.set(lcValue, key);
  }

  const values = iterationKeys.map((k) => keyValueMap.get(k));
  const entries = iterationKeys.map((k) => [k, keyValueMap.get(k)]);
  const numberValues = values.filter((v) => typeof v === 'number') as number[];

  const init = (options?: EnumOptions) => {
    let superEn = enumeration;

    // If original object is not extensible, so we have to make a copy
    if (!Object.isExtensible(enumeration)) {
      superEn = Object_assign({}, enumeration);
    }

    function fromValue(value: EnumValue, options?: FromValueOptions) {
      if (options?.ignoreCase && typeof value === 'string') {
        return keyValueMap.get(lcValueKeyMap.get(value.toLowerCase()) as EnumKey);
      }
      if (!valueKeyMap.has(value)) return undefined;
      return value;
    }

    function fromKey(key: EnumKey | number, options?: FromKeyOptions) {
      if (options?.ignoreCase && typeof key === 'string') {
        return lcKeyValueMap.get(key.toLowerCase());
      }
      return keyValueMap.get(`${key}`);
    }

    function keyFromValue(value: EnumValue, options?: KeyFromValueOptions) {
      if (options?.ignoreCase && typeof value === 'string') {
        return lcValueKeyMap.get(value.toLowerCase());
      }
      return valueKeyMap.get(value);
    }

    function setMetadata(value: EnumValue, metadata: unknown, options?: SetMetadataOptions) {
      options;
      const v = fromValue(value);
      if (v != null) metadataMap.set(v, metadata);
    }

    function getMetadata(value: EnumValue, options?: GetMetadataOptions) {
      options;
      return metadataMap.get(value);
    }

    function valueIterator() {
      let i = 0;
      return {
        // [Symbol.iterator]() {
        //   return this;
        // },
        next: () => {
          if (i < iterationKeys.length) {
            return { value: keyValueMap.get(`${iterationKeys[i++]}`), done: false };
          }
          return {
            done: true,
          };
        },
      };
    }

    // For each numberValues, add a non-eumerable property to the superEn object
    // This is the equivalent of the TS enum "reverse mapping"
    if (!options?.noTSEnumReverseMapping) {
      for (const num of numberValues) {
        Object_defineProperty(
          superEn,
          num,
          Object_assign(
            {
              value: valueKeyMap.get(num),
            },
            definePropertyOptions,
          ),
        );
      }
    }

    // Add helper functions to the enum but so they cannot be enumerated
    Object_defineProperty(
      superEn,
      'fromKey',
      Object_assign(
        {
          value: fromKey,
        },
        definePropertyOptions,
      ),
    );

    Object_defineProperty(
      superEn,
      'fromValue',
      Object_assign(
        {
          value: fromValue,
        },
        definePropertyOptions,
      ),
    );

    Object_defineProperty(
      superEn,
      'keyFromValue',
      Object_assign(
        {
          value: keyFromValue,
        },
        definePropertyOptions,
      ),
    );

    Object_defineProperty(
      superEn,
      'setMetadata',
      Object_assign(
        {
          value: setMetadata,
        },
        definePropertyOptions,
      ),
    );

    Object_defineProperty(
      superEn,
      'getMetadata',
      Object_assign(
        {
          value: getMetadata,
        },
        definePropertyOptions,
      ),
    );

    Object_defineProperty(
      superEn,
      Symbol.iterator,
      Object_assign(
        {
          value: valueIterator,
        },
        definePropertyOptions,
      ),
    );

    Object_defineProperty(
      superEn,
      'values',
      Object_assign(
        {
          value: () => values,
        },
        definePropertyOptions,
      ),
    );

    Object_defineProperty(
      superEn,
      'keys',
      Object_assign(
        {
          value: () => iterationKeys,
        },
        definePropertyOptions,
      ),
    );

    Object_defineProperty(
      superEn,
      'entries',
      Object_assign(
        {
          value: () => entries,
        },
        definePropertyOptions,
      ),
    );

    // Freeze the enum if required
    let res = superEn;
    if (!options?.noFreeze) {
      res = Object_freeze(superEn);
      Object_freeze(iterationKeys);
      Object_freeze(values);
      Object_freeze(entries);
    }

    return res;
  };

  return init(options);
}

const superenum: Superenum = ((enumeration: any, options?: EnumOptions) => {
  if (Array.isArray(enumeration)) {
    return fromArray(enumeration, options);
  }
  return fromObject(enumeration, options);
}) as Superenum;

superenum.fromObject = fromObject;
superenum.fromArray = fromArray;
superenum.fromTsEnum = fromTsEnum;

export { superenum };
