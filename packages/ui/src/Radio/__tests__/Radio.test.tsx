import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Radio } from '../Radio.tsx'

describe('Radio', () => {
  it('render', () => {
    render(<Radio />)
    expect(screen.getByRole('radio')).toBeDefined()
  })

  it('change', () => {
    render(<Radio />)
    const radio: HTMLInputElement = screen.getByRole('radio')
    radio.click()

    expect(radio.checked).toBeTruthy()
  })

  it('disabled', () => {
    render(<Radio disabled />)
    const radio: HTMLInputElement = screen.getByRole('radio')

    radio.click()
    expect(radio.checked).toBeFalsy()
  })
})
