import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Switch } from '../Switch.tsx'

describe('Switch', () => {
  it('render', () => {
    render(<Switch />)
    expect(screen.getByRole('switch')).toBeDefined()
  })

  it('change', () => {
    render(<Switch />)
    const switchInput: HTMLInputElement = screen.getByRole('switch')
    switchInput.click()

    expect(switchInput.checked).toBeTruthy()
  })

  it('disabled', () => {
    render(<Switch disabled />)
    const switchInput: HTMLInputElement = screen.getByRole('switch')

    switchInput.click()
    expect(switchInput.checked).toBeFalsy()
  })
})
