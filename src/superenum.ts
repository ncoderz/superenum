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
  fromValue(value: unknown | null | undefined, options?: FromValueOptions): EnumType<T> | undefined;

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
  fromKey(
    key: EnumKey | number | null | undefined,
    options?: FromKeyOptions,
  ): EnumType<T> | undefined;

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
  setMetadata<M>(
    value: EnumType<T> | null | undefined,
    metadata: M,
    options?: SetMetadataOptions,
  ): boolean;

  /**
   * Retrieve metadata that was stored against an enum value.
   *
   * If no metadata is found, or the value is invalid, undefined will be returned.
   *
   * @param value - the value for which to retrieve metadata
   * @param options - options for the function
   * @returns the metadata associated with the enum value
   */
  getMetadata<M>(
    value: EnumType<T> | null | undefined,
    options?: GetMetadataOptions,
  ): M | undefined;

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
  keyValueMap: Map<EnumKey, EnumValue>;
  valueKeyMap: Map<EnumValue, EnumKey>;
  lcKeyValueMap: Map<EnumKey, EnumValue>;
  lcValueKeyMap: Map<EnumValue, EnumKey>;
  metadataMap: Map<EnumValue, unknown>;
  keys: EnumKey[];
  values: (EnumValue | undefined)[];
  entries: [EnumKey, EnumValue | undefined][];
}

const CACHED_ENUMS = new WeakMap<GenericEnum, Cache>();

// Implementation of superenum
function superenum<K extends EnumKey, V extends EnumValue, T extends ObjectEnum<K, V>>(
  enm: T,
): EnumExtensions<K, V, T> {
  let cache: Cache = CACHED_ENUMS.get(enm) as Cache;
  if (!cache) {
    const newCache: Cache = {
      keyValueMap: new Map<EnumKey, EnumValue>(),
      valueKeyMap: new Map<EnumValue, EnumKey>(),
      lcKeyValueMap: new Map<EnumKey, EnumValue>(),
      lcValueKeyMap: new Map<EnumValue, EnumKey>(),
      metadataMap: new Map<EnumValue, unknown>(),
      keys: [],
      values: [],
      entries: [],
    };

    // Get iteration keys from the enum object (ignore reverse mapped integers)
    const enmKeys: EnumKey[] = [];
    for (const key in enm) {
      const nkey = Number(key);
      const isMaybeReverseKey = !isNaN(nkey);
      let isReverseKey = false;
      if (isMaybeReverseKey) {
        const enmAny = enm as unknown as Record<string, EnumValue>;
        isReverseKey = enmAny[enmAny[nkey]] === nkey;
      }
      if (!isReverseKey) {
        enmKeys.push(key);
      }
    }
    newCache.keys = enmKeys;

    // Fill keyValueMap and lcKeyValueMap
    for (const [key, value] of Object.entries(enm)) {
      // key must be a string since it's an object property
      newCache.keyValueMap.set(key, value as EnumValue);
      newCache.lcKeyValueMap.set(key.toLowerCase(), value as EnumValue);
    }

    // Fill valueKeyMap and lcValueKeyMap
    for (const [key, value] of newCache.keyValueMap) {
      // value might be a number, so much check
      const lcValue = typeof value === 'string' ? value.toLowerCase() : value;

      newCache.valueKeyMap.set(value, key);
      newCache.lcValueKeyMap.set(lcValue, key);
    }

    newCache.values = newCache.keys.map((k) => newCache.keyValueMap.get(k));
    newCache.entries = newCache.keys.map((k) => [k, newCache.keyValueMap.get(k)]);
    //Array.from(cache.keyValueMap.entries())

    CACHED_ENUMS.set(enm, newCache);
    cache = newCache;
  }

  function fromValue(value: EnumValue, options?: FromValueOptions) {
    const { keyValueMap, valueKeyMap, lcValueKeyMap } = cache;
    if (options?.ignoreCase && typeof value === 'string') {
      return keyValueMap.get(lcValueKeyMap.get(value.toLowerCase()) as EnumKey);
    }
    if (!valueKeyMap.has(value)) return undefined;
    return value;
  }

  function fromKey(key: EnumKey | number, options?: FromKeyOptions) {
    const { keyValueMap, lcKeyValueMap } = cache;
    if (options?.ignoreCase && typeof key === 'string') {
      return lcKeyValueMap.get(key.toLowerCase());
    }
    return keyValueMap.get(`${key}`);
  }

  function keyFromValue(value: EnumValue, options?: KeyFromValueOptions) {
    const { valueKeyMap, lcValueKeyMap } = cache;
    if (options?.ignoreCase && typeof value === 'string') {
      return lcValueKeyMap.get(value.toLowerCase());
    }
    return valueKeyMap.get(value);
  }

  function setMetadata(value: EnumValue, metadata: unknown, options?: SetMetadataOptions) {
    const { metadataMap } = cache;
    options;
    const v = fromValue(value);
    if (v != null) metadataMap.set(v, metadata);
  }

  function getMetadata(value: EnumValue, options?: GetMetadataOptions) {
    const { metadataMap } = cache;
    options;
    return metadataMap.get(value);
  }

  function* valueIterator() {
    // const { keys, keyValueMap } = cache;
    // for (const k of keys) {
    //   yield keyValueMap.get(k);
    // }
    for (const v of cache.values) {
      yield v;
    }
  }

  return {
    fromValue,
    fromKey,
    keyFromValue,
    setMetadata,
    getMetadata,
    keys: () => cache.keys,
    values: () => cache.values,
    entries: () => cache.entries,
    [Symbol.iterator]: valueIterator,
  } as unknown as EnumExtensions<K, V, T>;
}

export { superenum };
