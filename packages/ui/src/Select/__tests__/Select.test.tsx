import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Select } from '../Select.tsx';
import { act } from 'react';
import { SelectOption } from '../components';

const component = (
  <Select>
    <SelectOption value={1}>Москва</SelectOption>
    <SelectOption value={2}>Санкт-Петербург</SelectOption>
    <SelectOption value={3}>Новосибирск</SelectOption>
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
        <SelectOption value={1}>Москва</SelectOption>
        <SelectOption value={2}>Санкт-Петербург</SelectOption>
        <SelectOption value={3}>Новосибирск</SelectOption>
      </Select>
    )

    act(() => {
      screen.getByRole('combobox').click()
    })

    act(() => {
      screen.getAllByRole('option')[1].click()
    })

    expect(setValue).toBeCalled()
  })
})