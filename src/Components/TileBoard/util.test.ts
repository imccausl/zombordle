import {getVariant} from "./util";


describe("util", () => {
  describe("getVariant", () => {
    const correctWord = 'something'

    it("returns 'default' if letter is a space", () => {
      const variant = getVariant({correctWord, letter: ' ', index: 0})

      expect(variant).toBe('default')
    });

    it("returns 'default' if no letter is provided", () => {
      const variant = getVariant({correctWord, letter: '', index: 3})

      expect(variant).toBe('default')
    });

    it("returns 'correct-place' if letter is in the correct position relative to the correct word", () => {
      const variant = getVariant({correctWord, letter: 'e', index: 3})

      expect(variant).toBe('correct-place')
    });

    it("returns 'contains-letter' if letter is in the correct word", () => {
      const variant = getVariant({correctWord, letter: 'g', index: 4})

      expect(variant).toBe('contains-letter')
    });

    it("returns 'no-letter' if letter is not in the correct word", () => {
      const variant = getVariant({correctWord, letter: 'w', index: 5})

      expect(variant).toBe('no-letter')
    });
  })
});
