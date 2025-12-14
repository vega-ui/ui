import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Code } from '../Code.tsx';

const TEXT = 'console.log()';

describe('Code', () => {
  it('render', () => {
    render(<Code>{TEXT}</Code>)
    expect(screen.getByText(TEXT)).toBeDefined()
  })
})