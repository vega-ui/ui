import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { PasswordField } from '../PasswordField.tsx';
import { fireEvent } from '@storybook/test';
import { act } from 'react';


describe('PasswordField', () => {
  it('render field', () => {
    render(<PasswordField data-testid='input' />)
    expect(screen.getByTestId('input')).toBeDefined()
  })

  it('placeholder', () => {
    render(<PasswordField data-testid='input' placeholder='Check' />)
    expect(screen.getByTestId('input').getAttribute('placeholder')).toBe('Check')
  })

  it('change', () => {
    render(<PasswordField data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    act(() => {
      fireEvent.input(input, { target: { value: 1 } })
    })

    expect(input.value).toBe('1')
  })

  it('default type', () => {
    render(<PasswordField data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');

    expect(input.type).toBe('password')
  })

  it('change password visibility', () => {
    render(<PasswordField data-testid='input' />)
    const button: HTMLButtonElement = screen.getByRole('button');
    const input: HTMLInputElement = screen.getByTestId('input');

    act(() => {
      button.click()
    })

    expect(input.type).toBe('text')
  })

  it('disabled', () => {
    const onChange = vi.fn()
    render(<PasswordField onChange={onChange} disabled data-testid='input' />)

    const input: HTMLInputElement = screen.getByTestId('input');
    const button: HTMLButtonElement = screen.getByRole('button');

    input.click()

    expect(input.getAttribute('disabled')).toBeDefined()
    expect(button.getAttribute('disabled')).toBeDefined()
    expect(onChange).toBeCalledTimes(0)
  })
})