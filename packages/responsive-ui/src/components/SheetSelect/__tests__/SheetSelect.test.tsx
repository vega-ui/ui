import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { SheetSelect } from '../SheetSelect.tsx';
import { act } from 'react';
import { SheetSelectOption } from '../components';

const component = (
  <SheetSelect>
    <SheetSelectOption value={1}>Москва</SheetSelectOption>
    <SheetSelectOption value={2}>Санкт-Петербург</SheetSelectOption>
    <SheetSelectOption value={3}>Новосибирск</SheetSelectOption>
  </SheetSelect>
)

describe('SheetSelect', () => {
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
      <SheetSelect onSelect={setValue}>
        <SheetSelectOption value={1}>Москва</SheetSelectOption>
        <SheetSelectOption value={2}>Санкт-Петербург</SheetSelectOption>
        <SheetSelectOption value={3}>Новосибирск</SheetSelectOption>
      </SheetSelect>
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