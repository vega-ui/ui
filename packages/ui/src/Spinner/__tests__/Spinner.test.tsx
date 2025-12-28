import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  it('render', () => {
    render(<Spinner data-testid='spinner' />)
    expect(screen.getByTestId('spinner')).toBeDefined()
  })
})