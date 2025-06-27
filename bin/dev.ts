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
