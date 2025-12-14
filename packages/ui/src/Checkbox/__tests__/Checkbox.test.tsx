import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Checkbox } from '../Checkbox.tsx';

describe('Checkbox', () => {
  it('render', () => {
    render(<Checkbox />)
    expect(screen.getByRole('checkbox')).toBeDefined()
  })

  it('change', () => {
    render(<Checkbox />)
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')
    checkbox.click()

    expect(checkbox.checked).toBeTruthy()
  })

  it('indeterminate', () => {
    render(<Checkbox indeterminate />)
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')

    expect(checkbox.indeterminate).toBeTruthy()

    checkbox.click()

    expect(checkbox.checked).toBeTruthy()
  })

  it('disabled', () => {
    render(<Checkbox disabled />)
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')

    checkbox.click()
    expect(checkbox.checked).toBeFalsy()
  })
})