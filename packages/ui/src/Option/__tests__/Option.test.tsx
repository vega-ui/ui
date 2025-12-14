import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Option } from '../Option.tsx';

const TEXT = 'Hello, World!';

describe('Option', () => {
  it('render', () => {
    render(<Option value={1}>{TEXT}</Option>)
    expect(screen.getByRole('option')).toBeDefined()
  })

  it('selected', () => {
    render(<Option selected value={1}>{TEXT}</Option>)
    expect(screen.getByRole('option').ariaSelected).toBeDefined()
  })

  it('focusable', () => {
    render(<Option focusable value={1}>{TEXT}</Option>)
    expect(screen.getByRole('option').tabIndex).toBe(0)
  })
})