import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Select } from '../Select.tsx';
import { Option } from '../../Option';
import { act } from 'react';

const component = (
  <Select>
    <Option value={1}>Москва</Option>
    <Option value={2}>Санкт-Петербург</Option>
    <Option value={3}>Новосибирск</Option>
  </Select>
)

describe('Select', () => {
  it('render combobox', () => {
    render(component)
    expect(screen.getByRole('combobox')).toBeDefined()
  })

  it('open', async () => {
    render(component)
    act(() => {
      screen.getByRole('combobox').click()
    })

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeDefined()
    })
  })

  it('render options', async () => {
    render(component)
    act(() => {
      screen.getByRole('combobox').click()
    })

    await waitFor(() => {
      expect(screen.getAllByRole('option').length).toBe(3)
    })
  })

  it('change value', async () => {
    const setValue = vi.fn()

    render(
      <Select onSelect={setValue}>
        <Option value={1}>Москва</Option>
        <Option value={2}>Санкт-Петербург</Option>
        <Option value={3}>Новосибирск</Option>
      </Select>
    )
    act(() => {
      screen.getByRole('combobox').click()
    })

    await waitFor(() => {
      screen.getAllByRole('option')[1].click()
      expect(setValue).toBeCalledWith(2)
    })
  })
})