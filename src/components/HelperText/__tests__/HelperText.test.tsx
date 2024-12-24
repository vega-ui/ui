import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { HelperText } from '../HelperText.tsx';

describe('HelperText', () => {
  it('render', () => {
    render(<HelperText>Hello</HelperText>)
    expect(screen.getByText('Hello')).toBeDefined()
  })

  it('font-weight', () => {
    render(<HelperText fontWeight={500}>Hello</HelperText>)
    expect(screen.getByText('Hello').dataset.fontweight).toBe('500')
  })
})