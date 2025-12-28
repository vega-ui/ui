import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'
import { TextField } from '../TextField';
import { TextFieldInput } from '../components';

describe('TextField', () => {
  it('render textField', () => {
    render(
      <TextField>
        <TextFieldInput />
      </TextField>
    )
    expect(screen.getByRole('textbox')).toBeDefined()
  })

  it('placeholder', () => {
    render(
      <TextField>
        <TextFieldInput placeholder='Check' />
      </TextField>
    )
    
    const input = screen.getByRole('textbox')
    
    expect(input.getAttribute('placeholder')).toBe('Check')
  })

  it('change', () => {
    render(
      <TextField>
        <TextFieldInput />
      </TextField>
    )
    const input: HTMLInputElement = screen.getByRole('textbox')
    fireEvent.input(input, { target: { value: '1' } })

    expect(input.value).toBe('1')
  })

  it('disabled', () => {
    const onChange = vi.fn()
    render(
      <TextField>
        <TextFieldInput disabled onChange={onChange} />
      </TextField>
    )

    const input: HTMLInputElement = screen.getByRole('textbox')
    input.click()

    expect(input.getAttribute('disabled')).toBeDefined()
    expect(onChange).toBeCalledTimes(0)
  })
})