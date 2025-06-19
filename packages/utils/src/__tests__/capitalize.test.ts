import { describe, it, expect } from 'vitest'
import { capitalize } from '../capitalize'

describe('capitalize', () => {
  it('capitalizes first letter of a lowercase word', () => {
    expect(capitalize('word')).toBe('Word')
  })
  
  it('leaves already-capitalized word unchanged (except first letter)', () => {
    expect(capitalize('React')).toBe('React')
    expect(capitalize('rEACT')).toBe('REACT')
  })
  
  it('works with single-letter strings', () => {
    expect(capitalize('a')).toBe('A')
    expect(capitalize('Z')).toBe('Z')
  })
  
  it('returns empty string as is', () => {
    expect(capitalize('')).toBe('')
  })
  
  it('handles strings starting with space or symbol', () => {
    expect(capitalize(' hello')).toBe(' hello')
    expect(capitalize('!test')).toBe('!test')
  })
  
  it('works with unicode characters', () => {
    expect(capitalize('функция')).toBe('Функция')
    expect(capitalize('österreich')).toBe('Österreich')
  })
})
