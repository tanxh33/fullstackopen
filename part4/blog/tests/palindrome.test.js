const { palindrome } = require('../utils/example_tests');

test('Palindrome of a', () => {
  const result = palindrome('a');
  expect(result).toBe('a');
});

test('Palindrome of react', () => {
  const result = palindrome('react');
  expect(result).toBe('tcaer');
});

test('Palindrome of releveler', () => {
  const result = palindrome('releveler');
  expect(result).toBe('releveler');
});

test('Palindrome of <empty string>', () => {
  const result = palindrome('');
  expect(result).toBe('');
});
