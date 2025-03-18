import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { PinField } from '../PinField.tsx';
import { fireEvent } from '@storybook/test';
import { act } from 'react';


describe('PinField', () => {
  it('render textField', () => {
    render(<PinField data-testid='input' />)
    expect(screen.getByTestId('input')).toBeDefined()
  })

  it('placeholder', () => {
    render(<PinField data-testid='input' placeholder='Check' />)
    expect(screen.getByTestId('input').getAttribute('placeholder')).toBe('Check')
  })

  it('change', () => {
    render(<PinField data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      fireEvent.input(input, { target: { value: '1' } })
    })

    expect(input.value).toBe('1')
  })

  it('disabled', () => {
    const onChange = vi.fn()
    render(<PinField onChange={onChange} disabled data-testid='input' />)

    const input: HTMLInputElement = screen.getByTestId('input');
    input.click()

    expect(input.getAttribute('disabled')).toBeDefined()
    expect(onChange).toBeCalledTimes(0)
  })
})