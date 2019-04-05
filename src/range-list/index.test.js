const RangeList = require('./');

let output = '';

const log = (input) => {
  output = input;
};

console.log = jest.fn(log);

describe('Basic tests', () => {
  let rangeList;

  beforeEach(() => {
    rangeList = new RangeList();
  });

  test('Should add [0, 1)', () => {
    rangeList.add([0, 1]);
    rangeList.print();

    expect(output).toBe('[0, 1)');
  });

  test('Should add [1, 2)', () => {
    rangeList.add([1,2]);
    rangeList.print();

    expect(output).toBe('[1, 2)');
  });

  test('Should add [1, 5)', () => {
    rangeList.add([1, 5]);
    rangeList.print();

    expect(output).toBe('[1, 5)');
  });

  test('Shouldn\'t add [0, 0)', () => {
    rangeList.add([0, 0]);
    rangeList.print();

    expect(output).toBe('');
  });

  test('Shouldn\'t add [10, 10)', () => {
    rangeList.add([10,10]);
    rangeList.print();

    expect(output).toBe('');
  });

  test('Shouldn\'t add [-5, 5)', () => {
    rangeList.add([-5, 5]);
    rangeList.print();

    expect(output).toBe('');
  });

  test('Shouldn\'t add [-10, -5)', () => {
    rangeList.add([-10,5]);
    rangeList.print();

    expect(output).toBe('');
  });

  test('Shouldn\'t add [10,5)', () => {
    rangeList.add([10,5]);
    rangeList.print();

    expect(output).toBe('');
  });

  test('Should add [0, 1) [4, 5)', () => {
    rangeList.add([0, 1]);
    rangeList.add([4, 5]);
    rangeList.print();

    expect(output).toBe('[0, 1) [4, 5)');
  });

  test('Should add [1, 5) [10, 20)', () => {
    rangeList.add([1, 5]);
    rangeList.add([10,20]);
    rangeList.print();

    expect(output).toBe('[1, 5) [10, 20)');
  });

  test('Should add [1, 5) [5, 10)', () => {
    rangeList.add([1, 5]);
    rangeList.add([5, 10]);
    rangeList.print();

    expect(output).toBe('[1, 10)');
  });

  test('Should add [1, 10) [3, 7)', () => {
    rangeList.add([1, 10]);
    rangeList.add([3, 7]);
    rangeList.print();

    expect(output).toBe('[1, 10)');
  });

  test('Should add [1, 5) [10, 20) [30, 40]', () => {
    rangeList.add([1, 5]);
    rangeList.add([10, 20]);
    rangeList.add([30, 40]);
    rangeList.print();

    expect(output).toBe('[1, 5) [10, 20) [30, 40)');
  });

  test('Should add [1, 5) [10, 20) [15, 40]', () => {
    rangeList.add([1, 5]);
    rangeList.add([10, 20]);
    rangeList.add([15, 40]);
    rangeList.print();

    expect(output).toBe('[1, 5) [10, 40)');
  });

  test('Should add [1, 5) [10, 20) [5, 30]', () => {
    rangeList.add([1, 5]);
    rangeList.add([10, 20]);
    rangeList.add([5, 30]);
    rangeList.print();

    expect(output).toBe('[1, 30)');
  });

  test('Should remove [1, 5) from [1, 5)', () => {
    rangeList.add([1, 5]);
    rangeList.remove([1, 5]);
    rangeList.print();

    expect(output).toBe('');
  });

  test('Should remove [2, 3) from [1, 5)', () => {
    rangeList.add([1, 5]);
    rangeList.remove([2, 3]);
    rangeList.print();

    expect(output).toBe('[1, 2) [3, 5)');
  });

  test('Should remove [3, 15) from [1,5) [10,20)', () => {
    rangeList.add([1, 5]);
    rangeList.add([10, 20]);
    rangeList.remove([3, 15]);
    rangeList.print();

    expect(output).toBe('[1, 3) [15, 20)');
  });

  test('Should remove [7, 35) from [1, 5) [10, 20) [30, 40)', () => {
    rangeList.add([1, 5]);
    rangeList.add([10, 20]);
    rangeList.add([30, 40]);
    rangeList.remove([7, 35]);
    rangeList.print();

    expect(output).toBe('[1, 5) [35, 40)');
  });

  test('Shouldn\'t remove [5, 10) from [1, 5) [10, 20)', () => {
    rangeList.add([1, 5]);
    rangeList.add([10, 20]);
    rangeList.remove([5, 10]);
    rangeList.print();

    expect(output).toBe('[1, 5) [10, 20)');
  });

  test('Should remove [4, 10) from [1, 5) [10, 20)', () => {
    rangeList.add([1, 5]);
    rangeList.add([10, 20]);
    rangeList.remove([4, 10]);
    rangeList.print();

    expect(output).toBe('[1, 4) [10, 20)');
  });

  test('Should remove [4, 11) from [1, 5) [10, 20)', () => {
    rangeList.add([1, 5]);
    rangeList.add([10, 20]);
    rangeList.remove([4, 11]);
    rangeList.print();

    expect(output).toBe('[1, 4) [11, 20)');
  });
});

describe('Task example tests', () => {
  const rangeList = new RangeList();

  test('Should add [1, 5)', () => {
    rangeList.add([1, 5]);
    rangeList.print();

    expect(output).toBe('[1, 5)');
  });

  test('Should add [10, 20)', () => {
    rangeList.add([10, 20]);
    rangeList.print();

    expect(output).toBe('[1, 5) [10, 20)');
  });

  test('Shouldn\'t add [20, 20)', () => {
    rangeList.add([20, 20]);
    rangeList.print();

    expect(output).toBe('[1, 5) [10, 20)');
  });

  test('Should add [20, 21)', () => {
    rangeList.add([20, 21]);
    rangeList.print();

    expect(output).toBe('[1, 5) [10, 21)');
  });

  test('Should skip [2, 4)', () => {
    rangeList.add([2, 4]);
    rangeList.print();

    expect(output).toBe('[1, 5) [10, 21)');
  });

  test('Should add [3,8)', () => {
    rangeList.add([3, 8]);
    rangeList.print();

    expect(output).toBe('[1, 8) [10, 21)');
  });

  test('Shouldn\'t remove [10, 10)', () => {
    rangeList.remove([10, 10]);
    rangeList.print();

    expect(output).toBe('[1, 8) [10, 21)');
  });

  test('Should remove [10,11)', () => {
    rangeList.remove([10,11]);
    rangeList.print();

    expect(output).toBe('[1, 8) [11, 21)');
  });

  test('Should remove [15, 17)', () => {
    rangeList.remove([15, 17]);
    rangeList.print();

    expect(output).toBe('[1, 8) [11, 15) [17, 21)');
  });

  test('Should remove [3, 19)', () => {
    rangeList.remove([3, 19]);
    rangeList.print();

    expect(output).toBe('[1, 3) [19, 21)');
  });
});
