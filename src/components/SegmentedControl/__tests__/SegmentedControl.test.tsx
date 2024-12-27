import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { SegmentedControl } from '../SegmentedControl.tsx';

const TEXT = 'Hello, World!';

describe('Button', () => {
  it('render', () => {
    render(<SegmentedControl>{TEXT}</SegmentedControl>)
    expect(screen.getByText(TEXT)).toBeDefined()
  })
})