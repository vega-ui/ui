import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Badge } from '../Badge.tsx';

const TEXT = 'Hello, World!';

describe('Badge', () => {
  it('render', () => {
    render(<Badge variant='info'>{TEXT}</Badge>)
    expect(screen.getByText(TEXT)).toBeDefined()
  })
})