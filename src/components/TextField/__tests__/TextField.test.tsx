import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { TextField } from '../TextField.tsx';
import { fireEvent } from '@storybook/test';


describe('TextField', () => {
  it('render textField', () => {
    render(<TextField data-testid='input' />)
    expect(screen.getByTestId('input')).toBeDefined()
  })

  it('placeholder', () => {
    render(<TextField data-testid='input' placeholder='Check' />)
    expect(screen.getByTestId('input').getAttribute('placeholder')).toBe('Check')
  })

  it('value', () => {
    render(<TextField value='1' data-testid='input' placeholder='Check' />)
    expect(screen.getByTestId('input').getAttribute('value')).toBe('1')
  })

  it('change', () => {
    render(<TextField data-testid='input' />)
    const input: HTMLInputElement = screen.getByTestId('input');
    fireEvent.input(input, { target: { value: '1' } })

    expect(input.value).toBe('1')
  })

  it('disabled', () => {
    const onChange = vi.fn()
    render(<TextField onChange={onChange} disabled data-testid='input' />)

    const input: HTMLInputElement = screen.getByTestId('input');
    input.click()

    expect(input.getAttribute('disabled')).toBeDefined()
    expect(onChange).toBeCalledTimes(0)
  })
})