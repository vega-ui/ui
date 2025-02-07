import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { PhoneField } from '../PhoneField.tsx';
import { fireEvent } from '@storybook/test';
import { act } from 'react';

describe('PhoneField', () => {
  it('render field', () => {
    render(<PhoneField country='RU' data-testid='input' />)
    expect(screen.getByTestId('input')).toBeDefined()
  })

  it('type tel', () => {
    render(<PhoneField country='RU' data-testid='input' />)
    expect(screen.getByTestId('input').getAttribute('type')).toBe('tel')
  })

  it('placeholder', () => {
    render(<PhoneField country='RU' data-testid='input' placeholder='Phone' />)
    expect(screen.getByTestId('input').getAttribute('placeholder')).toBe('Phone')
  })

  it('change', () => {
    render(<PhoneField country='RU' data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      fireEvent.input(input, { target: { value: '79000000000' } })
    })

    expect(input.value).toBe('+7 900 000-00-00')
  })

  it('change with text value', () => {
    render(<PhoneField country='RU' data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      fireEvent.input(input, { target: { value: 'Hello' } })
    })

    expect(input.value).toBe('')
  })

  it('disabled', () => {
    const onChange = vi.fn()
    render(<PhoneField country='RU' onChange={onChange} disabled data-testid='input' />)

    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      fireEvent.input(input, { target: { value: 'Hello' } })
    })

    expect(input.getAttribute('disabled')).toBeDefined()
    expect(onChange).toBeCalledTimes(0)
  })
})