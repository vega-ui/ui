import { describe, expect, test } from 'vitest'
import { csx } from '../csx';

describe('csx', () => {
  test('undefined and non-undefined class name', () => {
    expect(csx(undefined, 'button')).eq('button')
  })

  test('two equal class names', () => {
    expect(csx('button', 'button')).eq('button')
  })

  test('non-undefined class names', () => {
    expect(csx('button', 'button-primary')).eq('button button-primary')
  })

  test('undefined class name', () => {
    expect(csx(undefined)).eq('')
  })
})