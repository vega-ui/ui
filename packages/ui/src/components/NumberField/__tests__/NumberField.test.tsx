import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { NumberField } from '../NumberField.tsx';
import { fireEvent } from '@storybook/test';
import { act } from 'react';


describe('NumberField', () => {
  it('render numberField', () => {
    render(<NumberField data-testid='input' />)
    expect(screen.getByTestId('input')).toBeDefined()
  })

  it('placeholder', () => {
    render(<NumberField data-testid='input' placeholder='Check' />)
    expect(screen.getByTestId('input').getAttribute('placeholder')).toBe('Check')
  })

  it('change', () => {
    render(<NumberField data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      fireEvent.input(input, { target: { value: 1 } })
    })

    expect(input.value).toBe('1')
  })

  it('change with text value', () => {
    render(<NumberField data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      fireEvent.input(input, { target: { value: 'Hello' } })
    })

    expect(input.value).toBe('')
  })

  it('change with control button', () => {
    render(<NumberField data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input')
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
    render(<NumberField onChange={onChange} disabled data-testid='input' />)

    const input: HTMLInputElement = screen.getByTestId('input');
    input.click()

    expect(input.getAttribute('disabled')).toBeDefined()
    expect(onChange).toBeCalledTimes(0)
  })
})