/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, test } from '@jest/globals';

import { Superenum } from '../src/superenum';

const superenumTests = (superenum: Superenum) => {
  const ENUM_OBJ1 = {
    thing: 'thing',
    other: 'other',
    something: 'somethingOther',
    99: 1,
  };
  const ENUM_OBJ1_IT_KEYS = ['thing', 'other', 'something', 99];

  const ENUM_ARR1 = ['thing', 'other', 'somethingOther', 1];

  const EnumObj1 = superenum(ENUM_OBJ1, {
    iterationKeys: ENUM_OBJ1_IT_KEYS,
  });
  // type EnumObj1Type = EnumType<typeof EnumObj1>;

  const EnumArr1 = superenum.fromArray(ENUM_ARR1);
  // type EnumArr1Type = EnumType<typeof EnumObj1>;

  describe('superenum', () => {
    describe('initialisation', () => {
      // test1Checks
      const test1Checks = (Enum: any) => {
        // Expected cases
        expect(Enum.thing).toBe('thing');
        expect(Enum.other).toBe('other');
        expect(Enum.something).toBe('somethingOther');
        expect(Enum[99]).toBe(1);
        expect(Enum.fromValue).toBeDefined();
        expect(Enum.fromKey).toBeDefined();
        expect(Enum.keyFromValue).toBeDefined();
        expect(Enum.setMetadata).toBeDefined();
        expect(Enum.getMetadata).toBeDefined();
        expect(Enum.values).toBeDefined();
        expect(Enum.keys).toBeDefined();
        expect(Enum.entries).toBeDefined();
        expect(Enum[Symbol.iterator]).toBeDefined();

        // Error cases
        expect(Enum[98]).toBe(undefined);
        expect(Enum['somethingOther']).toBe(undefined);
      };

      test('initialising enum from object (superenum() alias)', async () => {
        const Enum = superenum(ENUM_OBJ1);

        test1Checks(Enum);
      });

      test('initialising enum from object (superenum.fromObject())', async () => {
        const Enum = superenum.fromObject(ENUM_OBJ1);

        test1Checks(Enum);
      });

      test('initialising enum from array (superenum.fromArray())', async () => {
        const Enum = superenum.fromArray(ENUM_ARR1);

        // Expected cases
        expect(Enum.thing).toBe('thing');
        expect(Enum.other).toBe('other');
        expect(Enum.somethingOther).toBe('somethingOther');
        expect(Enum[1]).toBe(1);
        expect(Enum.fromValue).toBeDefined();
        expect(Enum.fromKey).toBeDefined();
        expect(Enum.keyFromValue).toBeDefined();
        expect(Enum.setMetadata).toBeDefined();
        expect(Enum.getMetadata).toBeDefined();
        expect(Enum.values).toBeDefined();
        expect(Enum.keys).toBeDefined();
        expect(Enum.entries).toBeDefined();
        expect(Enum[Symbol.iterator]).toBeDefined();

        // Error cases
        expect(Enum[98]).toBeUndefined();
        expect(Enum['something']).toBeUndefined();
      });

      test('initialising enum from array (superenum.fromArray()) with non-array input', async () => {
        const Enum = superenum.fromArray(undefined as any);

        // Expected cases
        expect(Enum[0]).toBeUndefined();
        expect(Enum.fromValue).toBeDefined();
        expect(Enum.fromKey).toBeDefined();
        expect(Enum.keyFromValue).toBeDefined();
        expect(Enum.setMetadata).toBeDefined();
        expect(Enum.getMetadata).toBeDefined();
        expect(Enum.values).toBeDefined();
        expect(Enum.keys).toBeDefined();
        expect(Enum.entries).toBeDefined();
        expect(Enum[Symbol.iterator]).toBeDefined();

        // Error cases
      });
    });

    describe('<enum>.fromValue()', () => {
      test('should be able to validate external data enum value as enum value', async () => {
        const Enum = EnumObj1;

        // Expected cases
        expect(Enum.fromValue(Enum[99])).toBe(1);
        expect(
          Enum.fromValue(1, {
            ignoreCase: true,
          }),
        ).toBe(1);
        expect(Enum.fromValue(Enum['99'])).toBe(1);
        expect(Enum.fromValue(1)).toBe(1);
        expect(Enum.fromValue(Enum.something)).toBe('somethingOther');
        expect(Enum.fromValue('somethingOther')).toBe('somethingOther');
        expect(
          Enum.fromValue('someThingother', {
            ignoreCase: true,
          }),
        ).toBe('somethingOther');

        // Error cases
        expect(Enum.fromValue('1')).toBeUndefined();
        expect(Enum.fromValue('something')).toBeUndefined();
        expect(Enum.fromValue(5)).toBeUndefined();
        expect(
          Enum.fromValue(5, {
            ignoreCase: true,
          }),
        ).toBeUndefined();
        expect(Enum.fromValue('someThingother')).toBeUndefined();
      });
    });

    describe('<enum>.fromKey()', () => {
      test('should be able to convert external data enum key to the enum value', async () => {
        const Enum = EnumObj1;

        // Expected cases
        // debugger;
        expect(Enum.fromKey(99)).toBe(1);
        expect(Enum.fromKey('99')).toBe(1);
        expect(
          Enum.fromKey(99, {
            ignoreCase: true,
          }),
        ).toBe(1);
        expect(Enum.fromKey('something')).toBe('somethingOther');
        expect(Enum.fromKey('thing')).toBe('thing');
        expect(
          Enum.fromKey('tHiNg', {
            ignoreCase: true,
          }),
        ).toBe('thing');

        // Error cases
        expect(Enum.fromKey('98')).toBeUndefined();
        expect(Enum.fromKey('somethingOther')).toBeUndefined();
        expect(Enum.fromKey(5)).toBeUndefined();
        expect(Enum.fromKey('tHiNg')).toBeUndefined();
      });
    });

    describe('<enum>.keyFromValue()', () => {
      test('should be able to convert external data enum value to the enum key', async () => {
        const Enum = EnumObj1;

        // Expected cases
        expect(Enum.keyFromValue(Enum[99])).toBe('99');
        expect(
          Enum.keyFromValue(1, {
            ignoreCase: true,
          }),
        ).toBe('99');
        expect(Enum.keyFromValue(Enum['99'])).toBe('99');
        expect(Enum.keyFromValue(1)).toBe('99');
        expect(Enum.keyFromValue(Enum.something)).toBe('something');
        expect(Enum.keyFromValue('somethingOther')).toBe('something');
        expect(
          Enum.keyFromValue('someThingother', {
            ignoreCase: true,
          }),
        ).toBe('something');

        // Error cases
        expect(Enum.keyFromValue(Enum[99])).not.toBe(99);
        expect(Enum.keyFromValue('1')).toBeUndefined();
        expect(Enum.keyFromValue('something')).toBeUndefined();
        expect(Enum.keyFromValue(5)).toBeUndefined();
        expect(
          Enum.keyFromValue(5, {
            ignoreCase: true,
          }),
        ).toBeUndefined();
        expect(Enum.keyFromValue('someThingother')).toBeUndefined();
      });
    });

    describe('<enum>.setMetadata(), <enum>.getMetadata()', () => {
      test('should be able to store and retrieve metadata against an enum value', async () => {
        const Enum = superenum(ENUM_OBJ1);

        Enum.setMetadata(Enum[99], 'meta99');
        Enum.setMetadata(Enum.other, 'metaOther');
        Enum.setMetadata(Enum.something, 'metaSomething');

        // Expected cases
        expect(Enum.getMetadata(Enum[99])).toBe('meta99');
        expect(Enum.getMetadata(Enum.other)).toBe('metaOther');
        expect(Enum.getMetadata(Enum.something)).toBe('metaSomething');

        // Error cases
        expect(Enum.getMetadata(Enum.thing)).toBeUndefined();
        expect(Enum.getMetadata('badKey')).toBeUndefined();
      });
    });

    describe('should be able to iterate the enum values (directly on object)', () => {
      test('in the correct order (using EnumOptions.iterationKeys)', async () => {
        const Enum = EnumObj1;

        // Expected cases
        let i = 0;
        for (const value of Enum) {
          switch (i) {
            case 0:
              expect(value).toBe(Enum.thing);
              break;
            case 1:
              expect(value).toBe(Enum.other);
              break;
            case 2:
              expect(value).toBe(Enum.something);
              break;
            case 3:
              expect(value).toBe(Enum[99]);
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });

      test('in the correct order (using Superenum.fromArray)', async () => {
        const Enum = EnumArr1;

        // Expected cases
        let i = 0;
        for (const value of Enum) {
          switch (i) {
            case 0:
              expect(value).toBe(Enum.thing);
              break;
            case 1:
              expect(value).toBe(Enum.other);
              break;
            case 2:
              expect(value).toBe(Enum.somethingOther);
              break;
            case 3:
              expect(value).toBe(Enum[1]);
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });

      test('in a specific order (using Superenum.fromArray / EnumOptions.iterationKeys)', async () => {
        const Enum = superenum.fromArray(ENUM_ARR1, {
          iterationKeys: ['other', 1, 'thing', 'somethingOther'],
        });

        // Expected cases
        let i = 0;
        for (const value of Enum) {
          switch (i) {
            case 0:
              expect(value).toBe(Enum.other);
              break;
            case 1:
              expect(value).toBe(Enum[1]);
              break;
            case 2:
              expect(value).toBe(Enum.thing);
              break;
            case 3:
              expect(value).toBe(Enum.somethingOther);
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });

      test('in EnumOptions.iterationKeys returning undefined (using Superenum.fromArray / EnumOptions.iterationKeys)', async () => {
        const Enum = superenum.fromArray(ENUM_ARR1, {
          iterationKeys: ['other', 'invalid', 99, 'thing', 'somethingOther', 'anotherinvalid'],
        });

        // Expected cases
        let i = 0;
        for (const value of Enum) {
          switch (i) {
            case 0:
              expect(value).toBe(Enum.other);
              break;
            case 1:
              expect(value).toBeUndefined();
              break;
            case 2:
              expect(value).toBe(Enum[99]);
              break;
            case 3:
              expect(value).toBe(Enum.thing);
              break;
            case 4:
              expect(value).toBe(Enum.somethingOther);
              break;
            case 5:
              expect(value).toBeUndefined();
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });
    });

    describe('should be able to iterate the enum values (using <enum>.values())', () => {
      test('in the correct order (using EnumOptions.iterationKeys)', async () => {
        const Enum = EnumObj1;

        // Expected cases
        let i = 0;
        for (const value of Enum.values()) {
          switch (i) {
            case 0:
              expect(value).toBe(Enum.thing);
              break;
            case 1:
              expect(value).toBe(Enum.other);
              break;
            case 2:
              expect(value).toBe(Enum.something);
              break;
            case 3:
              expect(value).toBe(Enum[99]);
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });

      test('in the correct order (using Superenum.fromArray)', async () => {
        const Enum = EnumArr1;

        // Expected cases
        let i = 0;
        for (const value of Enum.values()) {
          switch (i) {
            case 0:
              expect(value).toBe(Enum.thing);
              break;
            case 1:
              expect(value).toBe(Enum.other);
              break;
            case 2:
              expect(value).toBe(Enum.somethingOther);
              break;
            case 3:
              expect(value).toBe(Enum[1]);
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });

      test('in a specific order (using Superenum.fromArray / EnumOptions.iterationKeys)', async () => {
        const Enum = superenum.fromArray(ENUM_ARR1, {
          iterationKeys: ['other', 1, 'thing', 'somethingOther'],
        });

        // Expected cases
        let i = 0;
        for (const value of Enum.values()) {
          switch (i) {
            case 0:
              expect(value).toBe(Enum.other);
              break;
            case 1:
              expect(value).toBe(Enum[1]);
              break;
            case 2:
              expect(value).toBe(Enum.thing);
              break;
            case 3:
              expect(value).toBe(Enum.somethingOther);
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });

      test('in EnumOptions.iterationKeys returning undefined (using Superenum.fromArray / EnumOptions.iterationKeys)', async () => {
        const Enum = superenum.fromArray(ENUM_ARR1, {
          iterationKeys: ['other', 'invalid', 99, 'thing', 'somethingOther', 'anotherinvalid'],
        });

        // Expected cases
        let i = 0;
        for (const value of Enum.values()) {
          switch (i) {
            case 0:
              expect(value).toBe(Enum.other);
              break;
            case 1:
              expect(value).toBeUndefined();
              break;
            case 2:
              expect(value).toBe(Enum[99]);
              break;
            case 3:
              expect(value).toBe(Enum.thing);
              break;
            case 4:
              expect(value).toBe(Enum.somethingOther);
              break;
            case 5:
              expect(value).toBeUndefined();
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });
    });

    describe('should be able to iterate the enum keys (using <enum>.keys())', () => {
      test('in the correct order (using EnumOptions.iterationKeys)', async () => {
        const Enum = EnumObj1;

        // Expected cases
        let i = 0;
        for (const key of Enum.keys()) {
          switch (i) {
            case 0:
              expect(key).toBe('thing');
              break;
            case 1:
              expect(key).toBe('other');
              break;
            case 2:
              expect(key).toBe('something');
              break;
            case 3:
              expect(key).toBe('99');
              break;
            default:
              throw new Error(`Unexpected key: ${key}`);
          }
          i++;
        }
      });

      test('in the correct order (using Superenum.fromArray())', async () => {
        const Enum = EnumArr1;

        // Expected cases
        let i = 0;
        for (const value of Enum.keys()) {
          switch (i) {
            case 0:
              expect(value).toBe('thing');
              break;
            case 1:
              expect(value).toBe('other');
              break;
            case 2:
              expect(value).toBe('somethingOther');
              break;
            case 3:
              expect(value).toBe('1');
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });

      test('in a specific order (using Superenum.fromArray / EnumOptions.iterationKeys)', async () => {
        const Enum = superenum.fromArray(ENUM_ARR1, {
          iterationKeys: ['other', 1, 'thing', 'somethingOther'],
        });

        // Expected cases
        let i = 0;
        for (const value of Enum.keys()) {
          switch (i) {
            case 0:
              expect(value).toBe('other');
              break;
            case 1:
              expect(value).toBe('1');
              break;
            case 2:
              expect(value).toBe('thing');
              break;
            case 3:
              expect(value).toBe('somethingOther');
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });

      test('in EnumOptions.iterationKeys returning undefined (using Superenum.fromArray / EnumOptions.iterationKeys)', async () => {
        const Enum = superenum.fromArray(ENUM_ARR1, {
          iterationKeys: ['other', 'invalid', 99, 'thing', 'somethingOther', 'anotherinvalid'],
        });

        // Expected cases
        let i = 0;
        for (const value of Enum.keys()) {
          switch (i) {
            case 0:
              expect(value).toBe('other');
              break;
            case 1:
              expect(value).toBe('invalid');
              break;
            case 2:
              expect(value).toBe('99');
              break;
            case 3:
              expect(value).toBe('thing');
              break;
            case 4:
              expect(value).toBe('somethingOther');
              break;
            case 5:
              expect(value).toBe('anotherinvalid');
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });
    });

    describe('should be able to iterate the enum entries (using <enum>.entries())', () => {
      test('in the correct order (using EnumOptions.iterationKeys)', async () => {
        const Enum = EnumObj1;

        // Expected cases
        let i = 0;
        for (const [key, value] of Enum.entries()) {
          switch (i) {
            case 0:
              expect(key).toBe('thing');
              expect(value).toBe(Enum.thing);
              break;
            case 1:
              expect(key).toBe('other');
              expect(value).toBe(Enum.other);
              break;
            case 2:
              expect(key).toBe('something');
              expect(value).toBe(Enum.something);
              break;
            case 3:
              expect(key).toBe('99');
              expect(value).toBe(Enum[99]);
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });

      test('in the correct order (using Superenum.fromArray)', async () => {
        const Enum = EnumArr1;

        // Expected cases
        let i = 0;
        for (const [key, value] of Enum.entries()) {
          switch (i) {
            case 0:
              expect(key).toBe('thing');
              expect(value).toBe(Enum.thing);
              break;
            case 1:
              expect(key).toBe('other');
              expect(value).toBe(Enum.other);
              break;
            case 2:
              expect(key).toBe('somethingOther');
              expect(value).toBe(Enum.somethingOther);
              break;
            case 3:
              expect(key).toBe('1');
              expect(value).toBe(Enum[1]);
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });

      test('in a specific order (using Superenum.fromArray / EnumOptions.iterationKeys)', async () => {
        const Enum = superenum.fromArray(ENUM_ARR1, {
          iterationKeys: ['other', 1, 'thing', 'somethingOther'],
        });

        // Expected cases
        let i = 0;
        for (const [key, value] of Enum.entries()) {
          switch (i) {
            case 0:
              expect(key).toBe('other');
              expect(value).toBe(Enum.other);
              break;
            case 1:
              expect(key).toBe('1');
              expect(value).toBe(Enum[1]);
              break;
            case 2:
              expect(key).toBe('thing');
              expect(value).toBe(Enum.thing);
              break;
            case 3:
              expect(key).toBe('somethingOther');
              expect(value).toBe(Enum.somethingOther);
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });

      test('in EnumOptions.iterationKeys returning undefined (using Superenum.fromArray / EnumOptions.iterationKeys)', async () => {
        const Enum = superenum.fromArray(ENUM_ARR1, {
          iterationKeys: ['other', 'invalid', 99, 'thing', 'somethingOther', 'anotherinvalid'],
        });

        // Expected cases
        let i = 0;
        for (const [key, value] of Enum.entries()) {
          switch (i) {
            case 0:
              expect(key).toBe('other');
              expect(value).toBe(Enum.other);
              break;
            case 1:
              expect(key).toBe('invalid');
              expect(value).toBeUndefined();
              break;
            case 2:
              expect(key).toBe('99');
              expect(value).toBeUndefined();
              break;
            case 3:
              expect(key).toBe('thing');
              expect(value).toBe(Enum.thing);
              break;
            case 4:
              expect(key).toBe('somethingOther');
              expect(value).toBe(Enum.somethingOther);
              break;
            case 5:
              expect(key).toBe('anotherinvalid');
              expect(value).toBeUndefined();
              break;
            default:
              throw new Error(`Unexpected value: ${value}`);
          }
          i++;
        }
      });
    });
  });
};

export { superenumTests };
