import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { CheckboxCard } from '../CheckboxCard.tsx';

const TEXT = 'Hello, World!';

describe('CheckboxCard', () => {
  it('render', () => {
    render(<CheckboxCard>{TEXT}</CheckboxCard>)
    expect(screen.getByText(TEXT)).toBeDefined()
    expect(screen.getByRole('checkbox')).toBeDefined()
  })

  it('change', () => {
    render(<CheckboxCard />)
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')
    checkbox.click()

    expect(checkbox.checked).toBeTruthy()
  })

  it('indeterminate', () => {
    render(<CheckboxCard indeterminate />)
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')

    expect(checkbox.indeterminate).toBeTruthy()

    checkbox.click()

    expect(checkbox.checked).toBeTruthy()
  })

  it('disabled', () => {
    render(<CheckboxCard disabled />)
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')

    checkbox.click()
    expect(checkbox.checked).toBeFalsy()
  })
})