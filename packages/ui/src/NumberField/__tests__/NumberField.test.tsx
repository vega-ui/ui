import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'
import { NumberField } from '../NumberField';
import { act } from 'react';
import { NumberFieldDecrementButton, NumberFieldIncrementButton, NumberFieldInput } from '../components';

describe('NumberField', () => {
  it('render numberField', () => {
    render(
      <NumberField>
        <NumberFieldInput />
      </NumberField>
    )
    expect(screen.getByRole('textbox')).toBeDefined()
  })

  it('placeholder', () => {
    render(
      <NumberField>
        <NumberFieldInput placeholder='Check' />
      </NumberField>
    )
    expect(screen.getByRole('textbox').getAttribute('placeholder')).toBe('Check')
  })

  it('change', () => {
    render(
      <NumberField>
        <NumberFieldInput />
      </NumberField>
    )
    const input: HTMLInputElement = screen.getByRole('textbox');
    act(() => {
      fireEvent.input(input, { target: { value: 1 } })
    })

    expect(input.value).toBe('1')
  })

  it('change with text value', () => {
    render(
      <NumberField>
        <NumberFieldInput />
      </NumberField>
    )
    const input: HTMLInputElement = screen.getByRole('textbox');
    act(() => {
      fireEvent.input(input, { target: { value: 'Hello' } })
    })

    expect(input.value).toBe('')
  })

  it('change with control button', () => {
    render(
      <NumberField>
        <NumberFieldDecrementButton />
        <NumberFieldInput />
        <NumberFieldIncrementButton />
      </NumberField>
    )
    const input: HTMLInputElement = screen.getByRole('textbox')
    const [stepDownButton, stepUpButton] = screen.getAllByRole('button')

    act(() => {
      stepUpButton.click()
    })
    expect(input.value).toBe('0')

    act(() => {
      stepUpButton.click()
    })
    expect(input.value).toBe('1')

    act(() => {
      stepDownButton.click()
    })
    expect(input.value).toBe('0')
  })

  it('disabled', () => {
    const onChange = vi.fn()
    render(
      <NumberField disabled>
        <NumberFieldInput onChange={onChange} />
      </NumberField>
    )

    const input: HTMLInputElement = screen.getByRole('textbox');
    input.click()

    expect(input.getAttribute('disabled')).toBeDefined()
    expect(onChange).toBeCalledTimes(0)
  })
})