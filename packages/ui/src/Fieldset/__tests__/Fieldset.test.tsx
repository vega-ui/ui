import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Fieldset } from '../Fieldset.tsx';

describe('Fieldset', () => {
  it('render', () => {
    render(<Fieldset legend='Hello'></Fieldset>)
    expect(screen.getByText('Hello')).toBeDefined()
  })
})