import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Separator } from '../Separator';

describe('Text', () => {
  it('render', () => {
    render(<Separator />)
    expect(screen.getByRole('separator')).toBeDefined()
  })
})