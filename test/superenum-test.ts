/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, expect, test } from 'vitest';

import { type EnumFunc } from '../src';

const superenumTests = (Enum: EnumFunc) => {
  enum Enum1 {
    thing = 'thing',
    other = 'other',
    something = 'somethingOther',
    ninetynine = 1,
  }

  const EnumObj1 = {
    thing: 'thing',
    other: 'other',
    something: 'somethingOther',
    '99': 1,
  };
  // type EnumObj1Type = EnumType<typeof EnumObj1>;

  const EnumArr1 = Enum.fromArray(['thing', 'other', 'somethingOther', '1']);
  // type EnumArr1Type = EnumType<typeof EnumObj1>;

  describe('superenum', () => {
    describe('initialisation', () => {
      describe('from TS enum', () => {
        test('should initialise correctly', async () => {
          expect(Enum1.thing).toBe('thing');
          expect(Enum1.other).toBe('other');
          expect(Enum1.something).toBe('somethingOther');
          expect(Enum1.ninetynine).toBe(1);
          expect(Enum1[1]).toBe('ninetynine');
          expect(Enum1[98]).toBeUndefined();
          expect(Enum1['somethingOther']).toBeUndefined();
        });
      });
      describe('from object', () => {
        test('should initialise correctly', async () => {
          expect(EnumObj1.thing).toBe('thing');
          expect(EnumObj1.other).toBe('other');
          expect(EnumObj1.something).toBe('somethingOther');
          expect(EnumObj1['99']).toBe(1);
          expect(EnumObj1[1]).toBeUndefined();
          expect(EnumObj1[98]).toBeUndefined();
          expect(EnumObj1['somethingOther']).toBeUndefined();
        });
      });
      describe('from array (Enum.fromArray())', () => {
        test('should initialise correctly', async () => {
          expect(EnumArr1.thing).toBe('thing');
          expect(EnumArr1.other).toBe('other');
          expect(EnumArr1.somethingOther).toBe('somethingOther');
          expect(EnumArr1['1']).toBe('1');
          expect(EnumArr1[98]).toBeUndefined();
          expect(EnumArr1['something']).toBeUndefined();
        });
      });
    });

    describe('read-only behaviour', () => {
      test.fails('<enum> assignment', async () => {
        (Enum(Enum1) as any)[99] = 'Should Fail';
      });
      test.fails('<enum>.values() mutation', async () => {
        (Enum(Enum1).values() as any[]).push('Should fail');
      });
      test.fails('<enum>.keys() mutation', async () => {
        (Enum(Enum1).keys() as any[]).push('Should fail');
      });
      test.fails('<enum>.entries() mutation', async () => {
        (Enum(Enum1).entries() as any[]).push('Should fail');
      });
    });

    describe('enum value validation', () => {
      test('fromValue', async () => {
        expect(Enum(Enum1).fromValue(Enum[99])).toBe(1);
        expect(Enum(Enum1).fromValue(1, { ignoreCase: true })).toBe(1);
        expect(Enum(Enum1).fromValue(Enum1['99'])).toBe(1);
        expect(Enum(Enum1).fromValue(1)).toBe(1);
        expect(Enum(Enum1).fromValue(Enum1.something)).toBe('somethingOther');
        expect(Enum(Enum1).fromValue('somethingOther')).toBe('somethingOther');
        expect(Enum(Enum1).fromValue('someThingother', { ignoreCase: true })).toBe(
          'somethingOther',
        );
        expect(Enum(Enum1).fromValue('')).toBeUndefined();
        expect(Enum(Enum1).fromValue('1')).toBeUndefined();
        expect(Enum(Enum1).fromValue('something')).toBeUndefined();
        expect(Enum(Enum1).fromValue(5)).toBeUndefined();
        expect(Enum(Enum1).fromValue(0)).toBeUndefined();
        expect(Enum(Enum1).fromValue(null)).toBeUndefined();
        expect(Enum(Enum1).fromValue(undefined)).toBeUndefined();
        expect(Enum(Enum1).fromValue(5, { ignoreCase: true })).toBeUndefined();
        expect(Enum(Enum1).fromValue('someThingother')).toBeUndefined();
      });
      test('fromKey', async () => {
        expect(Enum(Enum1).fromKey(99)).toBe(1);
        expect(Enum(Enum1).fromKey('99')).toBe(1);
        expect(Enum(Enum1).fromKey(99, { ignoreCase: true })).toBe(1);
        expect(Enum(Enum1).fromKey('something')).toBe('somethingOther');
        expect(Enum(Enum1).fromKey('thing')).toBe('thing');
        expect(Enum(Enum1).fromKey('tHiNg', { ignoreCase: true })).toBe('thing');
        expect(Enum(Enum1).fromKey('')).toBeUndefined();
        expect(Enum(Enum1).fromKey('98')).toBeUndefined();
        expect(Enum(Enum1).fromKey('somethingOther')).toBeUndefined();
        expect(Enum(Enum1).fromKey(5)).toBeUndefined();
        expect(Enum(Enum1).fromKey(0)).toBeUndefined();
        expect(Enum(Enum1).fromKey(null)).toBeUndefined();
        expect(Enum(Enum1).fromKey(undefined)).toBeUndefined();
        expect(Enum(Enum1).fromKey('tHiNg')).toBeUndefined();
      });
      test('keyFromValue', async () => {
        expect(Enum(Enum1).keyFromValue(Enum1[99])).toBe('ninetynine');
        expect(Enum(Enum1).keyFromValue(1, { ignoreCase: true })).toBe('ninetynine');
        expect(Enum(Enum1).keyFromValue(Enum1['99'])).toBe('ninetynine');
        expect(Enum(Enum1).keyFromValue(1)).toBe('ninetynine');
        expect(Enum(Enum1).keyFromValue(Enum1.something)).toBe('something');
        expect(Enum(Enum1).keyFromValue('somethingOther')).toBe('something');
        expect(Enum(Enum1).keyFromValue('someThingother', { ignoreCase: true })).toBe('something');
        expect(Enum(Enum1).keyFromValue(Enum1[99])).not.toBe(99);
        expect(Enum(Enum1).keyFromValue('1')).toBeUndefined();
        expect(Enum(Enum1).keyFromValue('something')).toBeUndefined();
        expect(Enum(Enum1).keyFromValue(5)).toBeUndefined();
        expect(Enum(Enum1).keyFromValue(5, { ignoreCase: true })).toBeUndefined();
        expect(Enum(Enum1).keyFromValue('someThingother')).toBeUndefined();
      });
    });

    describe('labels', () => {
      describe('setAllLabels/getLabels', () => {
        test('should store and retrieve', async () => {
          Enum(Enum1).setAllLabels({
            [Enum1.ninetynine]: { en: 'Ninety Nine', es: 'Noventa y Nueve' },
            [Enum1.other]: { en: 'Other', es: 'Otro' },
            [Enum1.something]: { en: 'Something Other', es: 'Algo Más' },
          });
          expect(Enum(Enum1).getLabels(Enum1.other)).toEqual({ en: 'Other', es: 'Otro' });
          expect(Enum(Enum1).getLabel(Enum1.other)).toBe('Other');
          expect(Enum(Enum1).getLabel(Enum1.other, 'es')).toBe('Otro');
          expect(Enum(Enum1).getLabel(Enum1.something, 'en')).toBe('Something Other');
          expect(Enum(Enum1).getLabel(Enum1.thing)).toBeUndefined();
          expect(Enum(Enum1).getLabel('badKey' as Enum1)).toBeUndefined();
        });
      });
      describe('setLabels/getLabels', () => {
        test('should store and retrieve labels', async () => {
          Enum(Enum1).setLabels(Enum1.ninetynine, { en: 'Ninety Nine', es: 'Noventa y Nueve' });
          Enum(Enum1).setLabels(Enum1.other, { en: 'Other', es: 'Otro' });
          Enum(Enum1).setLabels(Enum1.something, { en: 'Something Other', es: 'Algo Más' });
          expect(Enum(Enum1).getLabels(Enum1.other)).toEqual({ en: 'Other', es: 'Otro' });
          expect(Enum(Enum1).getLabel(Enum1.other)).toBe('Other');
          expect(Enum(Enum1).getLabel(Enum1.other, 'en')).toBe('Other');
          expect(Enum(Enum1).getLabel(Enum1.something, 'es')).toBe('Algo Más');
          expect(Enum(Enum1).getLabel(Enum1.thing)).toBeUndefined();
          expect(Enum(Enum1).getLabel('badKey' as Enum1)).toBeUndefined();
        });
      });
    });

    describe('iteration', () => {
      describe('directly on object', () => {
        test('Enum(Enum1) order', async () => {
          let i = 0;
          for (const value of Enum(Enum1)) {
            switch (i) {
              case 0:
                expect(value).toBe(Enum1.thing);
                break;
              case 1:
                expect(value).toBe(Enum1.other);
                break;
              case 2:
                expect(value).toBe(Enum1.something);
                break;
              case 3:
                expect(value).toBe(Enum1.ninetynine);
                break;
              default:
                throw new Error(`Unexpected value: ${value}`);
            }
            i++;
          }
        });
        test('Enum.fromArray order', async () => {
          let i = 0;
          for (const value of Enum(EnumArr1)) {
            switch (i) {
              case 0:
                expect(value).toBe(EnumArr1.thing);
                break;
              case 1:
                expect(value).toBe(EnumArr1.other);
                break;
              case 2:
                expect(value).toBe(EnumArr1.somethingOther);
                break;
              case 3:
                expect(value).toBe(EnumArr1['1']);
                break;
              default:
                throw new Error(`Unexpected value: ${value}`);
            }
            i++;
          }
        });
      });
      describe('using .values()', () => {
        test('EnumObj1 order', async () => {
          let i = 0;
          for (const value of Enum(EnumObj1).values()) {
            switch (i) {
              case 0:
                expect(value).toBe(Enum1.thing);
                break;
              case 1:
                expect(value).toBe(Enum1.other);
                break;
              case 2:
                expect(value).toBe(Enum1.something);
                break;
              case 3:
                expect(value).toBe(Enum1.ninetynine);
                break;
              default:
                throw new Error(`Unexpected value: ${value}`);
            }
            i++;
          }
        });
        test('EnumArr1 order', async () => {
          let i = 0;
          for (const value of Enum(EnumArr1).values()) {
            switch (i) {
              case 0:
                expect(value).toBe(EnumArr1.thing);
                break;
              case 1:
                expect(value).toBe(EnumArr1.other);
                break;
              case 2:
                expect(value).toBe(EnumArr1.somethingOther);
                break;
              case 3:
                expect(value).toBe(EnumArr1['1']);
                break;
              default:
                throw new Error(`Unexpected value: ${value}`);
            }
            i++;
          }
        });
      });
      describe('using .keys()', () => {
        test('Enum1 order', async () => {
          let i = 0;
          for (const key of Enum(Enum1).keys()) {
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
                expect(key).toBe('ninetynine');
                break;
              default:
                throw new Error(`Unexpected key: ${key}`);
            }
            i++;
          }
        });
        test('EnumArr1 order', async () => {
          let i = 0;
          for (const value of Enum(EnumArr1).keys()) {
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
      });
      describe('using .entries()', () => {
        test('Enum1 order', async () => {
          let i = 0;
          for (const [key, value] of Enum(Enum1).entries()) {
            switch (i) {
              case 0:
                expect(key).toBe('thing');
                expect(value).toBe(Enum1.thing);
                break;
              case 1:
                expect(key).toBe('other');
                expect(value).toBe(Enum1.other);
                break;
              case 2:
                expect(key).toBe('something');
                expect(value).toBe(Enum1.something);
                break;
              case 3:
                expect(key).toBe('ninetynine');
                expect(value).toBe(Enum1.ninetynine);
                break;
              default:
                throw new Error(`Unexpected value: ${value}`);
            }
            i++;
          }
        });
        test('EnumArr1 order', async () => {
          let i = 0;
          for (const [key, value] of Enum(EnumArr1).entries()) {
            switch (i) {
              case 0:
                expect(key).toBe('thing');
                expect(value).toBe(EnumArr1.thing);
                break;
              case 1:
                expect(key).toBe('other');
                expect(value).toBe(EnumArr1.other);
                break;
              case 2:
                expect(key).toBe('somethingOther');
                expect(value).toBe(EnumArr1.somethingOther);
                break;
              case 3:
                expect(key).toBe('1');
                expect(value).toBe(EnumArr1['1']);
                break;
              default:
                throw new Error(`Unexpected value: ${value}`);
            }
            i++;
          }
        });
      });
    });

    describe('TypeScript native enum initialisation', () => {
      enum StringEnum {
        Red = 'red',
        Green = 'green',
        Blue = 'blue',
      }
      test('string enum values and helpers', () => {
        expect(StringEnum.Red).toBe('red');
        expect(StringEnum.Green).toBe('green');
        expect(StringEnum.Blue).toBe('blue');
        expect(Enum(StringEnum).fromValue('green')).toBe('green');
        expect(Enum(StringEnum).fromValue('GREEN', { ignoreCase: true })).toBe('green');
        expect(Enum(StringEnum).fromKey('Blue')).toBe('blue');
        expect(Enum(StringEnum).keyFromValue('red')).toBe('Red');
        expect(Enum(StringEnum).values()).toEqual(['red', 'green', 'blue']);
        expect(Enum(StringEnum).keys()).toEqual(['Red', 'Green', 'Blue']);
        expect(Enum(StringEnum).entries()).toEqual([
          ['Red', 'red'],
          ['Green', 'green'],
          ['Blue', 'blue'],
        ]);
      });
      enum NumericEnum {
        One = 1,
        Two = 2,
        Three = 3,
      }
      test('numeric enum values and reverse lookup', () => {
        expect(NumericEnum.One).toBe(1);
        expect(NumericEnum.Two).toBe(2);
        expect(NumericEnum.Three).toBe(3);
        expect(NumericEnum[1]).toBe('One');
        expect(NumericEnum[2]).toBe('Two');
        expect(Enum(NumericEnum).fromValue(2)).toBe(2);
        expect(Enum(NumericEnum).keyFromValue(3)).toBe('Three');
        expect(Enum(NumericEnum).fromKey('One')).toBe(1);
        expect(Enum(NumericEnum).values()).toEqual([1, 2, 3]);
      });
    });

    describe('<enum> (object)', () => {
      test('should be able to validate external data enum value as enum value', async () => {
        expect(Enum(EnumObj1).fromValue(EnumObj1['99'])).toBe(1);
        expect(Enum(EnumObj1).fromValue(1)).toBe(1);
        expect(Enum(EnumObj1).fromValue(EnumObj1.something)).toBe('somethingOther');
        expect(Enum(EnumObj1).fromValue('somethingOther')).toBe('somethingOther');
        expect(Enum(EnumObj1).fromValue('thing')).toBe('thing');
        expect(Enum(EnumObj1).fromValue('other')).toBe('other');
        // Error cases
        expect(Enum(EnumObj1).fromValue('')).toBeUndefined();
        expect(Enum(EnumObj1).fromValue('1')).toBeUndefined();
        expect(Enum(EnumObj1).fromValue('something')).toBeUndefined();
        expect(Enum(EnumObj1).fromValue(5)).toBeUndefined();
        expect(Enum(EnumObj1).fromValue(0)).toBeUndefined();
        expect(Enum(EnumObj1).fromValue(null)).toBeUndefined();
        expect(Enum(EnumObj1).fromValue(undefined)).toBeUndefined();
      });
      test('should be able to convert external data enum key to the enum value', async () => {
        expect(Enum(EnumObj1).fromKey('99')).toBe(1);
        expect(Enum(EnumObj1).fromKey('something')).toBe('somethingOther');
        expect(Enum(EnumObj1).fromKey('thing')).toBe('thing');
        expect(Enum(EnumObj1).fromKey('other')).toBe('other');
        // Error cases
        expect(Enum(EnumObj1).fromKey('')).toBeUndefined();
        expect(Enum(EnumObj1).fromKey('98')).toBeUndefined();
        expect(Enum(EnumObj1).fromKey('somethingOther')).toBeUndefined();
        expect(Enum(EnumObj1).fromKey(5)).toBeUndefined();
        expect(Enum(EnumObj1).fromKey(0)).toBeUndefined();
        expect(Enum(EnumObj1).fromKey(null)).toBeUndefined();
        expect(Enum(EnumObj1).fromKey(undefined)).toBeUndefined();
      });
      test('should be able to convert external data enum value to the enum key', async () => {
        expect(Enum(EnumObj1).keyFromValue(EnumObj1['99'])).toBe('99');
        expect(Enum(EnumObj1).keyFromValue(1)).toBe('99');
        expect(Enum(EnumObj1).keyFromValue(EnumObj1.something)).toBe('something');
        expect(Enum(EnumObj1).keyFromValue('somethingOther')).toBe('something');
        expect(Enum(EnumObj1).keyFromValue('thing')).toBe('thing');
        expect(Enum(EnumObj1).keyFromValue('other')).toBe('other');
        // Error cases
        expect(Enum(EnumObj1).keyFromValue('1')).toBeUndefined();
        expect(Enum(EnumObj1).keyFromValue('something')).toBeUndefined();
        expect(Enum(EnumObj1).keyFromValue(5)).toBeUndefined();
        expect(Enum(EnumObj1).keyFromValue(null)).toBeUndefined();
        expect(Enum(EnumObj1).keyFromValue(undefined)).toBeUndefined();
      });
    });
    describe('<enum> (fromArray)', () => {
      test('should be able to validate external data enum value as enum value', async () => {
        expect(Enum(EnumArr1).fromValue(EnumArr1['1'])).toBe('1');
        expect(Enum(EnumArr1).fromValue('1')).toBe('1');
        expect(Enum(EnumArr1).fromValue(EnumArr1.somethingOther)).toBe('somethingOther');
        expect(Enum(EnumArr1).fromValue('somethingOther')).toBe('somethingOther');
        expect(Enum(EnumArr1).fromValue('thing')).toBe('thing');
        expect(Enum(EnumArr1).fromValue('other')).toBe('other');
        // Error cases
        expect(Enum(EnumArr1).fromValue('')).toBeUndefined();
        expect(Enum(EnumArr1).fromValue(1)).toBeUndefined();
        expect(Enum(EnumArr1).fromValue('something')).toBeUndefined();
        expect(Enum(EnumArr1).fromValue(5)).toBeUndefined();
        expect(Enum(EnumArr1).fromValue(0)).toBeUndefined();
        expect(Enum(EnumArr1).fromValue(null)).toBeUndefined();
        expect(Enum(EnumArr1).fromValue(undefined)).toBeUndefined();
      });
      test('should be able to convert external data enum key to the enum value', async () => {
        expect(Enum(EnumArr1).fromKey('1')).toBe('1');
        expect(Enum(EnumArr1).fromKey('somethingOther')).toBe('somethingOther');
        expect(Enum(EnumArr1).fromKey('thing')).toBe('thing');
        expect(Enum(EnumArr1).fromKey('other')).toBe('other');
        // Error cases
        expect(Enum(EnumArr1).fromKey('')).toBeUndefined();
        expect(Enum(EnumArr1).fromKey('98')).toBeUndefined();
        expect(Enum(EnumArr1).fromKey('something')).toBeUndefined();
        expect(Enum(EnumArr1).fromKey(5)).toBeUndefined();
        expect(Enum(EnumArr1).fromKey(0)).toBeUndefined();
        expect(Enum(EnumArr1).fromKey(null)).toBeUndefined();
        expect(Enum(EnumArr1).fromKey(undefined)).toBeUndefined();
      });
      test('should be able to convert external data enum value to the enum key', async () => {
        expect(Enum(EnumArr1).keyFromValue(EnumArr1['1'])).toBe('1');
        expect(Enum(EnumArr1).keyFromValue('1')).toBe('1');
        expect(Enum(EnumArr1).keyFromValue(EnumArr1.somethingOther)).toBe('somethingOther');
        expect(Enum(EnumArr1).keyFromValue('somethingOther')).toBe('somethingOther');
        expect(Enum(EnumArr1).keyFromValue('thing')).toBe('thing');
        expect(Enum(EnumArr1).keyFromValue('other')).toBe('other');
        // Error cases
        expect(Enum(EnumArr1).keyFromValue(1)).toBeUndefined();
        expect(Enum(EnumArr1).keyFromValue('something')).toBeUndefined();
        expect(Enum(EnumArr1).keyFromValue(5)).toBeUndefined();
        expect(Enum(EnumArr1).keyFromValue(null)).toBeUndefined();
        expect(Enum(EnumArr1).keyFromValue(undefined)).toBeUndefined();
      });
    });
  });
};

export { superenumTests };
