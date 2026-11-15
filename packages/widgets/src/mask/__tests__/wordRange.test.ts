import { describe, expect, it } from 'vitest'
import { wordEndAfter, wordStartBefore } from '../wordRange'

describe('Edge Cases', () => {
  it('finds the words by the Unicode rules the browser deletes them by, so a number with dots stays one word and a hyphen splits one', () => {
    expect(wordStartBefore('+1 201 555-0123', 15)).toBe(11)
    expect(wordStartBefore('12.03.2024', 10)).toBe(0)
    expect(wordStartBefore('12:30 ', 6)).toBe(3)
    expect(wordStartBefore('  ', 2)).toBe(0)

    expect(wordEndAfter('+1 201 555-0123', 2)).toBe(6)
    expect(wordEndAfter('12:30', 2)).toBe(5)
    expect(wordEndAfter('12: ', 3)).toBe(4)
  })
})
