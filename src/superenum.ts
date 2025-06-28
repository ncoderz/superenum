/**
 * Create an enum type from an enum like object or array.
 */
export type EnumType<T> = T[keyof T];

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
 * Options for the {@link EnumExtensions.hasKey} function
 */
export interface HasKeyOptions {
  /**
   * Ignore case when getting the enum key from the value
   */
  ignoreCase?: boolean;
}

/**
 * Options for the {@link EnumExtensions.hasValue} function
 */
export interface HasValueOptions {
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

export interface EnumExtensions<
  K extends EnumKey,
  V extends EnumValue,
  T extends ObjectEnum<K, V>,
> {
  /**
   * Validate an enum value, returning the value if valid, otherwise undefined.
   *
   * Since an enum value is just the value, then all this function does is check to see if the value exists on the enum, and if
   * so returns it cast to the enum type, otherwise it returns undefined.
   *
   * Note: If the enum has duplicate values when lower-cased and
   * {@link FromValueOptions.ignoreCase} is true, the data returned when when values clash will be indeterminate.
   *
   * @param value - the enum value to validate
   * @param options - options for the function
   * @returns the enum value, or undefined if the value cannot be matched to the enum
   */
  fromValue(value: unknown | null | undefined, options?: FromValueOptions): EnumType<T> | undefined;

  /**
   * Get an enum value from its key, returning the value if key valid, otherwise undefined.
   *
   * Note: If the enum has duplicate keys when lower-cased and
   * {@link FromKeyOptions.ignoreCase} is true, the data returned when when keys clash will be indeterminate.
   *
   * @param key - the enum key to convert to enum value
   * @param options - options for the function
   * @returns the enum represented by the key, or undefined if the key cannot be matched to the enum
   */
  fromKey(
    key: EnumKey | number | null | undefined,
    options?: FromKeyOptions,
  ): EnumType<T> | undefined;

  /**
   * Get an enum key from its value, returning the key if value valid, otherwise undefined.
   *
   * Note: If the enum has duplicate values when lower-cased and
   * {@link FromValueOptions.ignoreCase} is true, the data returned when when values clash will be indeterminate.
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
   * Check if an enum has a value, returning true if yes, otherwise false.
   *
   * Note: If the enum has duplicate values (or duplicate values when lower-cased if
   * {@link HasValueOptions.ignoreCase} is true), the data returned when when values clash will be indeterminate.
   *
   * @param value - the enum value to check
   * @param options - options for the function
   * @returns true if the enum has the value, otherwise false
   */
  hasValue(value: EnumType<T> | null | undefined, options?: HasValueOptions): boolean;

  /**
   * Check if an enum has a key, returning true if yes, otherwise false.
   *
   * Note: If the enum has duplicate keys when lower-cased and
   * {@link FromKeyOptions.ignoreCase} is true, the data returned when when keys clash will be indeterminate.
   *
   * @param key - the enum key to check
   * @param options - options for the function
   * @returns true if the enum has the key, otherwise false
   */
  hasKey(key: EnumKey | null | undefined, options?: HasKeyOptions): boolean;

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
  values(): readonly EnumType<T>[];

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
  keys(): readonly ExtractEnumKey<K>[];

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
  entries(): readonly [ExtractEnumKey<K>, EnumType<T>][];

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
  [Symbol.iterator](): IterableIterator<EnumType<T>>;
}

type EnumKey = string;
type EnumValue = string | number;
type ExtractEnumKey<T> = keyof T;

type GenericEnum = Readonly<Record<EnumKey, EnumValue>>;

type ObjectEnum<K extends EnumKey, V extends EnumValue> = { [key in K]: V };

interface Cache {
  keyValueMap: Record<EnumKey, EnumValue>;
  valueKeyMap: Record<EnumValue, EnumKey>;
  lcKeyValueMap: Record<EnumKey, EnumValue>;
  lcValueKeyMap: Record<EnumValue, EnumKey>;
  keys: EnumKey[];
  values: (EnumValue | undefined)[];
  entries: [EnumKey, EnumValue | undefined][];
}

const CACHED_ENUMS = new WeakMap<GenericEnum, Cache>();

// Reduce code size when minifying by using a local reference to Object.create
const Object_create = Object.create;

// Implementation of superenum
function superenum<K extends EnumKey, V extends EnumValue, T extends ObjectEnum<K, V>>(
  enm: T,
): EnumExtensions<K, V, T> {
  let cache: Cache = CACHED_ENUMS.get(enm) as Cache;
  if (!cache) {
    const newCache: Cache = {
      keyValueMap: Object_create(null),
      valueKeyMap: Object_create(null),
      lcKeyValueMap: Object_create(null),
      lcValueKeyMap: Object_create(null),
      keys: [],
      values: [],
      entries: [],
    } as Cache;

    // Get the enum as a generic object
    const enmAny = enm as unknown as Record<string, EnumValue>;

    // Get iteration keys from the enum object (ignore reverse mapped integers)
    const enmKeys: EnumKey[] = [];
    for (const key in enm) {
      const nkey = Number(key);
      const isReverseKey = !isNaN(nkey) && enmAny[enmAny[nkey]] === nkey;

      if (!isReverseKey) {
        enmKeys.push(key);
      }
    }
    newCache.keys = enmKeys;

    // Fill keyValueMap and lcKeyValueMap, valueKeyMap and lcValueKeyMap
    for (const key of newCache.keys) {
      const value = enmAny[key];
      newCache.keyValueMap[key] = value as EnumValue;
      newCache.lcKeyValueMap[key.toLowerCase()] = value as EnumValue;

      const lcValue = typeof value === 'string' ? value.toLowerCase() : value;
      newCache.valueKeyMap[value] = key;
      newCache.lcValueKeyMap[lcValue] = key;
    }

    newCache.values = newCache.keys.map((k) => newCache.keyValueMap[k]);
    newCache.entries = newCache.keys.map((k) => [k, newCache.keyValueMap[k]]);

    CACHED_ENUMS.set(enm, newCache);
    cache = newCache;
  }

  function fromValue(value: EnumValue, options?: FromValueOptions) {
    const { keyValueMap, valueKeyMap, lcValueKeyMap } = cache;
    if (options?.ignoreCase && typeof value === 'string') {
      const key = lcValueKeyMap[value.toLowerCase()];
      return keyValueMap[key];
    }
    if (!Object.prototype.hasOwnProperty.call(valueKeyMap, value)) return undefined;
    return value;
  }

  function fromKey(key: EnumKey, options?: FromKeyOptions) {
    const { keyValueMap, lcKeyValueMap } = cache;
    if (options?.ignoreCase && typeof key === 'string') {
      return lcKeyValueMap[key.toLowerCase()];
    }
    return keyValueMap[`${key}`];
  }

  function keyFromValue(value: EnumValue, options?: KeyFromValueOptions) {
    const { valueKeyMap, lcValueKeyMap } = cache;
    if (options?.ignoreCase && typeof value === 'string') {
      return lcValueKeyMap[value.toLowerCase()];
    }
    return valueKeyMap[value];
  }

  function hasKey(key: EnumKey, options?: HasKeyOptions) {
    return fromKey(key, options) != null;
  }

  function hasValue(value: EnumValue, options?: HasValueOptions) {
    return fromValue(value, options) != null;
  }

  function* valueIterator() {
    for (const v of cache.values) {
      yield v;
    }
  }

  return {
    fromValue,
    fromKey,
    keyFromValue,
    hasKey,
    hasValue,
    keys: () => cache.keys,
    values: () => cache.values,
    entries: () => cache.entries,
    [Symbol.iterator]: valueIterator,
  } as unknown as EnumExtensions<K, V, T>;
}

export { superenum };
