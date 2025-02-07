import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { PhoneSelectField, PhoneFieldCountry } from '../PhoneSelectField.tsx';
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

describe('PhoneField', () => {
  it('render field', () => {
    render(<PhoneSelectField countries={list} data-testid='input' />)
    expect(screen.getByTestId('input')).toBeDefined()
  })

  it('type tel', () => {
    render(<PhoneSelectField countries={list} data-testid='input' />)
    expect(screen.getByTestId('input').getAttribute('type')).toBe('tel')
  })

  it('placeholder', () => {
    render(<PhoneSelectField countries={list} data-testid='input' placeholder='Phone' />)
    expect(screen.getByTestId('input').getAttribute('placeholder')).toBe('Phone')
  })

  it('change', () => {
    render(<PhoneSelectField countries={list} data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      fireEvent.input(input, { target: { value: '79000000000' } })
    })

    expect(input.value).toBe('+7 900 000-00-00')
  })

  it('change with text value', () => {
    render(<PhoneSelectField countries={list} data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      fireEvent.input(input, { target: { value: 'Hello' } })
    })

    expect(input.value).toBe('')
  })

  it('disabled', () => {
    const onChange = vi.fn()
    render(<PhoneSelectField countries={list} onChange={onChange} disabled data-testid='input' />)

    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      input.click()
    })

    expect(input.getAttribute('disabled')).toBeDefined()
    expect(onChange).toBeCalledTimes(0)
  })
})