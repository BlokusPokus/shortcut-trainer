import { shuffleArray } from '../shortcutData';

describe('shuffleArray', () => {
  test('returns array of same length', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result.length).toBe(input.length);
  });

  test('contains all original elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    input.forEach(item => {
      expect(result).toContain(item);
    });
  });

  test('does not modify original array', () => {
    const input = [1, 2, 3, 4, 5];
    const originalInput = [...input];
    shuffleArray(input);
    expect(input).toEqual(originalInput);
  });
});
