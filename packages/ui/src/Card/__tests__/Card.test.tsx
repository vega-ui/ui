import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Card } from '../Card.tsx';

const TEXT = 'Hello, World!';

describe('Card', () => {
  it('render', () => {
    render(<Card>{TEXT}</Card>)
    expect(screen.getByText(TEXT)).toBeDefined()
  })
})