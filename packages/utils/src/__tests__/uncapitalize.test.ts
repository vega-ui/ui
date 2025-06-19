import { describe, it, expect } from 'vitest'
import { uncapitalize } from '../uncapitalize'

describe('uncapitalize', () => {
  it('converts first uppercase letter to lowercase', () => {
    expect(uncapitalize('Word')).toBe('word')
    expect(uncapitalize('React')).toBe('react')
  })
  
  it('leaves first letter lowercase if already lowercase', () => {
    expect(uncapitalize('word')).toBe('word')
    expect(uncapitalize('rEACT')).toBe('rEACT')
  })
  
  it('handles single-letter strings', () => {
    expect(uncapitalize('A')).toBe('a')
    expect(uncapitalize('z')).toBe('z')
  })
  
  it('returns empty string as is', () => {
    expect(uncapitalize('')).toBe('')
  })
  
  it('handles special characters at the start', () => {
    expect(uncapitalize('-Test')).toBe('-Test')
    expect(uncapitalize(' Test')).toBe(' Test')
  })
  
  it('works with unicode', () => {
    expect(uncapitalize('Österreich')).toBe('österreich')
    expect(uncapitalize('Функция')).toBe('функция')
  })
})
