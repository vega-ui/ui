import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { SheetPhoneSelectField, PhoneFieldCountry } from '../SheetPhoneSelectField.tsx';
import { fireEvent } from '@storybook/test';
import { act } from 'react';

const list: PhoneFieldCountry[] = [
  {
    'iso': 'RU',
    'label': 'Россия (+7)'
  },
  {
    'iso': 'KZ',
    'label': 'Казахстан (+7)'
  },
]

describe('SheetPhoneField', () => {
  it('render numberField', () => {
    render(<SheetPhoneSelectField countries={list} data-testid='input' />)
    expect(screen.getByTestId('input')).toBeDefined()
  })

  it('type tel', () => {
    render(<SheetPhoneSelectField countries={list} data-testid='input' />)
    expect(screen.getByTestId('input').getAttribute('type')).toBe('tel')
  })

  it('placeholder', () => {
    render(<SheetPhoneSelectField countries={list} data-testid='input' placeholder='Phone' />)
    expect(screen.getByTestId('input').getAttribute('placeholder')).toBe('Phone')
  })

  it('change', () => {
    render(<SheetPhoneSelectField countries={list} data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      fireEvent.input(input, { target: { value: '79000000000' } })
    })

    expect(input.value).toBe('+7 900 000-00-00')
  })

  it('change with text value', () => {
    render(<SheetPhoneSelectField countries={list} data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      fireEvent.input(input, { target: { value: 'Hello' } })
    })

    expect(input.value).toBe('')
  })

  it('disabled', () => {
    const onChange = vi.fn()
    render(<SheetPhoneSelectField countries={list} onChange={onChange} disabled data-testid='input' />)

    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      input.click()
    })

    expect(input.getAttribute('disabled')).toBeDefined()
    expect(onChange).toBeCalledTimes(0)
  })
})