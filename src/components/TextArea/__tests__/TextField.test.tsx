import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { TextArea } from '../TextArea.tsx';
import { fireEvent } from '@storybook/test';


describe('TextField', () => {
  it('render textField', () => {
    render(<TextArea data-testid='input' />)
    expect(screen.getByTestId('input')).toBeDefined()
  })

  it('placeholder', () => {
    render(<TextArea data-testid='input' placeholder='Check' />)
    expect(screen.getByTestId('input').getAttribute('placeholder')).toBe('Check')
  })

  it('change', () => {
    render(<TextArea data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    fireEvent.input(input, { target: { value: '1' } })

    expect(input.value).toBe('1')
  })

  it('disabled', () => {
    const onChange = vi.fn()
    render(<TextArea onChange={onChange} disabled data-testid='input' />)

    const input: HTMLInputElement = screen.getByTestId('input');
    input.click()

    expect(input.getAttribute('disabled')).toBeDefined()
    expect(onChange).toBeCalledTimes(0)
  })
})