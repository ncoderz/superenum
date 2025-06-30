/**
 * Create an enum type from an enum like object or array.
 */
export type EnumType<T> = T[keyof T];

/**
 * Options for the {@link Superenum.fromValue} function
 */
export interface FromValueOptions {
  /**
   * Ignore case when validating the enum value
   */
  ignoreCase?: boolean;
}

/**
 * Options for the {@link Superenum.fromKey} function
 */
export interface FromKeyOptions {
  /**
   * Ignore case when getting the enum value from the key
   */
  ignoreCase?: boolean;
}

/**
 * Options for the {@link Superenum.keyFromValue} function
 */
export interface KeyFromValueOptions {
  /**
   * Ignore case when getting the enum key from the value
   */
  ignoreCase?: boolean;
}

/**
 * Options for the {@link Superenum.hasKey} function
 */
export interface HasKeyOptions {
  /**
   * Ignore case when getting the enum key from the value
   */
  ignoreCase?: boolean;
}

/**
 * Options for the {@link Superenum.hasValue} function
 */
export interface HasValueOptions {
  /**
   * Ignore case when getting the enum key from the value
   */
  ignoreCase?: boolean;
}

/**
 * i18n labels for enum values.
 */
export interface Labels {
  [key: string]: string;
}

/**
 * Array Enum declaration
 */
export type ArrayEnum<KV extends EnumKey> = ReadonlyArray<KV>;

/**
 * Convert an ArrayEnum type to an ObjectEnum
 */
export type ArrayEnumToObjectEnum<T extends ReadonlyArray<string>> = {
  [K in T[number]]: K;
};

export interface Superenum<
  K extends EnumKey = EnumKey,
  V extends EnumValue = EnumValue,
  T extends ObjectEnum<K, V> = ObjectEnum<K, V>,
> {
  /**
   * Validate a possible enum value, returning the enum value if valid, otherwise undefined.
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
   * @returns iterator over the enum values
   */
  values(): readonly EnumType<T>[];

  /**
   * Get an array of the enum keys.
   *
   * @returns iterator over the enum values
   */
  keys(): readonly ExtractEnumKey<K, V, T>[];

  /**
   * Get an array of the enum entries.
   *
   * @returns iterator over the enum values
   */
  entries(): readonly [ExtractEnumKey<K, V, T>, EnumType<T>][];

  /**
   * An iterator that iterates the enum values.
   *
   * @returns iterator over the enum values
   */
  [Symbol.iterator](): IterableIterator<EnumType<T>>;

  /**
   * Set i18n labels for all enum values.
   *
   * @param allLabels - an object containing i18n labels for each enum value
   */
  setAllLabels(allLabels: { [key: EnumValue]: Labels }): void;

  /**
   * Set i18n labels for a specific enum value.
   *
   * @param value - the enum value to set i18n labels for
   * @param labels - an object containing i18n labels for the enum value
   */
  setLabels(value: EnumType<T>, labels: Labels): void;

  /**
   * Get i18n labels for a specific enum value.
   *
   * @param value - the enum value to get i18n labels for
   * @returns an object containing i18n labels for the enum value
   */
  getLabels(value: EnumType<T>): Labels;

  /**
   * Get a label for a specific enum value in a specific locale.
   *
   * If no locale is provided, it will return the first label that was set.
   * If no label is found for the value, it will return the value as a string.
   *
   * @param value - the enum value to get the label for
   * @param locale - the locale to get the label for
   * @returns the label for the enum value in the specified locale
   */
  getLabel(value: EnumType<T>, locale?: string): string;
}

type EnumKey = string;
type EnumValue = string | number;
type ExtractEnumKey<K extends EnumKey, V extends EnumValue, T extends ObjectEnum<K, V>> = keyof T;

type GenericEnum = Readonly<Record<EnumKey, EnumValue>>;

type ObjectEnum<K extends EnumKey, V extends EnumValue> = { [key in K]: V };

interface Cache {
  _keys: EnumKey[];
  _valueKeyMap: Map<EnumValue, EnumKey>;
  _keyValueMap?: Map<EnumKey, EnumValue>;
  _lcValueKeyMap?: Map<EnumValue, EnumKey>;
  _lcKeyValueMap?: Map<EnumKey, EnumValue>;
  _valueLabelMap?: Map<EnumValue, Labels>;
  _values?: EnumValue[];
  _entries?: [EnumKey, EnumValue][];
}

const CACHED_ENUMS = new WeakMap<GenericEnum, Cache>();

// Implementation of superenum
function Enum<K extends string, V extends string | number, T extends ObjectEnum<K, V>>(
  enm: T,
): Superenum<K, V, T> {
  let _cache: Cache = CACHED_ENUMS.get(enm) as Cache;

  // Get the enum as a generic object
  const enmAny = enm as unknown as Record<string, EnumValue>;

  if (!_cache) {
    // Get iteration keys from the enum object (ignore reverse mapped integers)
    const enmKeys: EnumKey[] = [];
    for (const key in enm) {
      const nkey = Number(key);
      const isReverseKey = !isNaN(nkey) && enmAny[enmAny[nkey]] === nkey;

      if (!isReverseKey) {
        enmKeys.push(key);
      }
    }

    const newCache: Cache = {
      _keys: enmKeys,
      _valueKeyMap: new Map(),
    } as Cache;

    // Fill keyValueMap and lcKeyValueMap, valueKeyMap and lcValueKeyMap
    for (const key of newCache._keys) {
      const value = enmAny[key];
      newCache._valueKeyMap.set(value, key);
    }

    CACHED_ENUMS.set(enm, newCache);
    _cache = newCache;
  }

  function createKeyValueMap(): Map<EnumKey, EnumValue> {
    const newMap = new Map<EnumKey, EnumValue>();
    for (const key of _cache._keys) {
      const value = enmAny[key] as EnumValue;
      newMap.set(key, value);
    }
    _cache._keyValueMap = newMap;
    return newMap;
  }

  function createLowerCaseValueKeyMap(): Map<EnumValue, EnumKey> {
    const newMap = new Map<EnumValue, EnumKey>();
    for (const key of _cache._keys) {
      const value = enmAny[key];
      const lcValue = typeof value === 'string' ? value.toLowerCase() : value;
      newMap.set(lcValue, key);
    }
    _cache._lcValueKeyMap = newMap;

    return newMap;
  }

  function createLowerCaseKeyValueMap(): Map<EnumKey, EnumValue> {
    const newMap = new Map<EnumKey, EnumValue>();
    for (const key of _cache._keys) {
      const value = enmAny[key];
      newMap.set(key.toLowerCase(), value as EnumValue);
    }
    _cache._lcKeyValueMap = newMap;
    return newMap;
  }

  function createValueLabelMap(): Map<EnumValue, Labels> {
    const newMap = new Map<EnumValue, Labels>();
    _cache._valueLabelMap = newMap;
    return newMap;
  }

  function createValues() {
    const keyValueMap = _cache._keyValueMap ?? createKeyValueMap();
    _cache._values = _cache._keys.map((k) => keyValueMap.get(k)!);
    return _cache._values;
  }

  function createEntries() {
    const keyValueMap = _cache._keyValueMap ?? createKeyValueMap();
    _cache._entries = _cache._keys.map((k) => [k, keyValueMap.get(k)!]);
    return _cache._entries;
  }

  function fromValue(value: EnumValue, options?: FromValueOptions) {
    if (options?.ignoreCase && typeof value === 'string') {
      const keyValueMap = _cache._keyValueMap ?? createKeyValueMap();
      const lcValueKeyMap = _cache._lcValueKeyMap ?? createLowerCaseValueKeyMap();
      const key = lcValueKeyMap.get(value.toLowerCase());
      if (!key) return undefined;
      return keyValueMap.get(key);
    }
    if (!_cache._valueKeyMap.has(value)) return undefined;
    return value;
  }

  function fromKey(key: EnumKey, options?: FromKeyOptions) {
    const keyValueMap = _cache._keyValueMap ?? createKeyValueMap();
    if (options?.ignoreCase && typeof key === 'string') {
      const lcKeyValueMap = _cache._lcKeyValueMap ?? createLowerCaseKeyValueMap();
      return lcKeyValueMap.get(key.toLowerCase());
    }
    return keyValueMap.get(`${key}`);
  }

  function keyFromValue(value: EnumValue, options?: KeyFromValueOptions) {
    if (options?.ignoreCase && typeof value === 'string') {
      const lcValueKeyMap = _cache._lcValueKeyMap ?? createLowerCaseValueKeyMap();
      return lcValueKeyMap.get(value.toLowerCase());
    }
    return _cache._valueKeyMap.get(value);
  }

  function hasKey(key: EnumKey, options?: HasKeyOptions) {
    return fromKey(key, options) != null;
  }

  function hasValue(value: EnumValue, options?: HasValueOptions) {
    return fromValue(value, options) != null;
  }

  function keys() {
    return _cache._keys;
  }

  function values() {
    return _cache._values ?? createValues();
  }

  function entries() {
    return _cache._entries ?? createEntries();
  }

  function* valueIterator() {
    for (const v of values()) {
      yield v;
    }
  }

  function setAllLabels(allLabels: { [key: EnumValue]: Labels }): void {
    const valueLabelMap = _cache._valueLabelMap ?? createValueLabelMap();
    for (const [v, labels] of Object.entries(allLabels)) {
      const value = fromValue(v);
      if (value != null) {
        valueLabelMap.set(value, labels);
      }
    }
  }

  function setLabels(value: EnumValue, labels: Labels): void {
    const valueLabelMap = _cache._valueLabelMap ?? createValueLabelMap();
    valueLabelMap.set(value, labels);
  }

  function getLabels(value: EnumValue): Labels {
    const valueLabelMap = _cache._valueLabelMap ?? createValueLabelMap();
    return valueLabelMap.get(value) ?? {};
  }

  function getLabel(value: EnumValue, locale?: string): string {
    const valueLabelMap = _cache._valueLabelMap ?? createValueLabelMap();
    const labels = valueLabelMap.get(value) ?? {};
    if (!locale) {
      for (const label of Object.values(labels)) {
        return label ?? `${value}`;
      }
    }
    return labels[locale as string] ?? `${value}`;
  }

  return {
    fromValue,
    fromKey,
    keyFromValue,
    hasKey,
    hasValue,
    keys: () => keys(),
    values: () => values(),
    entries: () => entries(),
    [Symbol.iterator]: valueIterator,
    setAllLabels,
    setLabels,
    getLabels,
    getLabel,
  } as unknown as Superenum<K, V, T>;
}

Enum.fromArray = <KV extends Readonly<EnumKey>, T extends ArrayEnum<KV>>(
  enumeration: T,
): ArrayEnumToObjectEnum<T> => {
  let arr: ArrayEnum<KV> = enumeration;
  if (!Array.isArray(arr)) arr = [];

  const enm = arr.reduce((acc, v) => {
    acc[v] = v;
    return acc;
  }, {});

  return enm as ArrayEnumToObjectEnum<T>;
};

export type EnumFunc = typeof Enum;

export { Enum };
