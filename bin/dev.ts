import { type EnumType, superenum } from '../src';

const TestEnumObj = superenum({
  ONE: 'one',
  TWO: 'two',
  THREE: 'three',
  FOUR: 'four',
  FIVE: 'five',
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
});
type TestEnumObjType = EnumType<typeof TestEnumObj>;

const one = TestEnumObj.ONE;
const two = TestEnumObj.TWO;
const three = TestEnumObj.THREE;
const four = TestEnumObj.FOUR;
const five = TestEnumObj.FIVE;
const six = TestEnumObj.SIX;
const seven = TestEnumObj.SEVEN;
const eight = TestEnumObj.EIGHT;
const nine = TestEnumObj.NINE;
const ten = TestEnumObj.TEN;

const TestEnumArr = superenum(['one', 'two', 'three', 'four', 'five', 6, 7, 8, 9, 10]);
type TestEnumArrType = EnumType<typeof TestEnumArr>;

const oneArr = TestEnumObj.ONE;
const twoArr = TestEnumObj.TWO;
const threeArr = TestEnumObj.THREE;
const fourArr = TestEnumObj.FOUR;
const fiveArr = TestEnumObj.FIVE;
const sixArr = TestEnumObj.SIX;
const sevenArr = TestEnumObj.SEVEN;
const eightArr = TestEnumObj.EIGHT;
const nineArr = TestEnumObj.NINE;
const tenArr = TestEnumObj.TEN;

function logTestEnumObj(
  obj: typeof TestEnumObj,
  one: TestEnumObjType,
  two: TestEnumObjType,
  three: TestEnumObjType,
  four: TestEnumObjType,
  five: TestEnumObjType,
  six: TestEnumObjType,
  seven: TestEnumObjType,
  eight: TestEnumObjType,
  nine: TestEnumObjType,
  ten: TestEnumObjType,
) {
  console.log('--- TestEnumObj ---');
  console.log('TestEnumObj:', obj);
  console.log('One:', one);
  console.log('Two:', two);
  console.log('Three:', three);
  console.log('Four:', four);
  console.log('Five:', five);
  console.log('Six:', six);
  console.log('Seven:', seven);
  console.log('Eight:', eight);
  console.log('Nine:', nine);
  console.log('Ten:', ten);
  console.log('Keys:', obj.keys());
  console.log('Values:', obj.values());
  console.log('Entries:', obj.entries());
  console.log('Symbol.iterator:', obj[Symbol.iterator]);
}

function logTestEnumArr(
  arr: typeof TestEnumArr,
  one: TestEnumArrType,
  two: TestEnumArrType,
  three: TestEnumArrType,
  four: TestEnumArrType,
  five: TestEnumArrType,
  six: TestEnumArrType,
  seven: TestEnumArrType,
  eight: TestEnumArrType,
  nine: TestEnumArrType,
  ten: TestEnumArrType,
) {
  console.log('--- TestEnumArr ---');
  console.log('TestEnumArr:', arr);
  console.log('One:', one);
  console.log('Two:', two);
  console.log('Three:', three);
  console.log('Four:', four);
  console.log('Five:', five);
  console.log('Six:', six);
  console.log('Seven:', seven);
  console.log('Eight:', eight);
  console.log('Nine:', nine);
  console.log('Ten:', ten);
  console.log('Keys:', arr.keys());
  console.log('Values:', arr.values());
  console.log('Entries:', arr.entries());
  console.log('Symbol.iterator:', arr[Symbol.iterator]);
}

logTestEnumObj(TestEnumObj, one, two, three, four, five, six, seven, eight, nine, ten);
console.log(''); // Add a blank line for better readability
logTestEnumArr(
  TestEnumArr,
  oneArr,
  twoArr,
  threeArr,
  fourArr,
  fiveArr,
  sixArr,
  sevenArr,
  eightArr,
  nineArr,
  tenArr,
);

enum TestEnum {
  ONE = 'one',
  TWO = 'two',
  THREE = 'three',
  FOUR = 'four',
  FIVE = 'five',
  SIX = NaN,
  SEVEN = 7,
  EIGHT = 8,
  NINE = 9,
  TEN = '10',
}

const oneRawTs = TestEnum.ONE;
const twoRawTs = TestEnum.TWO;
const threeRawTs = TestEnum.THREE;
const fourRawTs = TestEnum.FOUR;
const fiveRawTs = TestEnum.FIVE;
const sixRawTs = TestEnum.SIX;
const sevenRawTs = TestEnum.SEVEN;
const eightRawTs = TestEnum.EIGHT;
const nineRawTs = TestEnum.NINE;
const tenRawTs = TestEnum.TEN;

const TestEnumTs = superenum(TestEnum);

type TestEnumTsType = EnumType<typeof TestEnumTs>;

const oneTs = TestEnumTs.ONE;
const twoTs = TestEnumTs.fromValue('two') ?? TestEnumTs.ONE;
const threeTs = TestEnumTs.THREE;
const fourTs = TestEnumTs.FOUR;
const fiveTs = TestEnumTs.FIVE;
const sixTs = TestEnumTs.SIX;
const sevenTs = TestEnumTs.SEVEN;
const eightTs = TestEnumTs.EIGHT;
const nineTs = TestEnumTs.NINE;
const tenTs = TestEnumTs.TEN;

function logTestEnumRawTs(
  rawEnum: typeof TestEnum,
  one: TestEnumTsType,
  two: TestEnumTsType,
  three: TestEnumTsType,
  four: TestEnumTsType,
  five: TestEnumTsType,
  six: TestEnumTsType,
  seven: TestEnumTsType,
  eight: TestEnumTsType,
  nine: TestEnumTsType,
  ten: TestEnumTsType,
) {
  console.log('--- TestEnumRawTs ---');

  console.log('TestEnumRawTs:', rawEnum);
  console.log('One:', one);
  console.log('Two:', two);
  console.log('Three:', three);
  console.log('Four:', four);
  console.log('Five:', five);
  console.log('Six:', six);
  console.log('Seven:', seven);
  console.log('Eight:', eight);
  console.log('Nine:', nine);
  console.log('Ten:', ten);
  for (const key in TestEnum) {
    console.log(
      `Key: ${key}, Value: ${TestEnum[key]}, KeyType: ${typeof key}, ValueType: ${typeof TestEnum[key]}`,
    );
  }
  console.log('Symbol.iterator:', rawEnum[Symbol.iterator]);

  console.log('TestEnum[7]', TestEnum[7]);
}
logTestEnumRawTs(
  TestEnum,
  oneRawTs,
  twoRawTs,
  threeRawTs,
  fourRawTs,
  fiveRawTs,
  sixRawTs,
  sevenRawTs,
  eightRawTs,
  nineRawTs,
  tenRawTs,
);

function logTestEnumTs(
  obj: typeof TestEnumTs,
  one: TestEnumTsType,
  two: TestEnumTsType,
  three: TestEnumTsType,
  four: TestEnumTsType,
  five: TestEnumTsType,
  six: TestEnumTsType,
  seven: TestEnumTsType,
  eight: TestEnumTsType,
  nine: TestEnumTsType,
  ten: TestEnumTsType,
) {
  console.log('--- TestEnumTs ---');
  console.log('TestEnumTs:', obj);
  console.log('One:', one);
  console.log('Two:', two);
  console.log('Three:', three);
  console.log('Four:', four);
  console.log('Five:', five);
  console.log('Six:', six);
  console.log('Seven:', seven);
  console.log('Eight:', eight);
  console.log('Nine:', nine);
  console.log('Ten:', ten);
  console.log('Keys:', obj.keys());
  console.log('Values:', obj.values());
  console.log('Entries:', obj.entries());
  console.log('Symbol.iterator:', obj[Symbol.iterator]);
  console.log('obj[7]', obj[7]);
}
logTestEnumTs(
  TestEnumTs,
  oneTs,
  twoTs,
  threeTs,
  fourTs,
  fiveTs,
  sixTs,
  sevenTs,
  eightTs,
  nineTs,
  tenTs,
);
