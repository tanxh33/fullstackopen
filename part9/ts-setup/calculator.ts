// Union type of string literal types
// `Operation` is a type alias
type Operation = 'multiply' | 'add' | 'divide';

export const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'add':
      return a + b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    default:
      throw new Error('Operation is not multiply, add, or divide!');
  }
};

try {
  calculator(1, 4, 'add');
  calculator(6, 4, 'multiply');
  calculator(1, 4, 'divide');
  calculator(1, 0, 'divide');
  // calculator(1, 2, 'yolo');
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error(`Something went wrong. Error message: ${e.message}`);
  }
}
