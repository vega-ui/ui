import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Select, SelectProps } from '../Select.tsx';
import { act } from 'react';
import { SelectCombobox, SelectHiddenSelect, SelectIcon, SelectListbox, SelectOption, SelectValue } from '../components';

const renderSelect = (props?: SelectProps) => {
  render(
    <Select {...props}>
      <SelectHiddenSelect />
      <SelectCombobox>
        <SelectValue />
        <SelectIcon />
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value={1}>One</SelectOption>
        <SelectOption value={2}>Two</SelectOption>
        <SelectOption value={3}>Three</SelectOption>
      </SelectListbox>
    </Select>
  )
}

describe('Select', () => {
  it('render combobox', () => {
    renderSelect()
    expect(screen.getByRole('combobox')).toBeDefined()
  })

  it('open', async () => {
    renderSelect()
    act(() => {
      screen.getByRole('combobox').click()
    })
    
    expect(screen.getByRole('listbox')).toBeDefined()
  })

  it('render options', async () => {
    renderSelect()
    act(() => {
      screen.getByRole('combobox').click()
    })
    
    expect(screen.getAllByRole('option').length).toBe(3)
  })

  it('change value', async () => {
    const setValue = vi.fn()
    
    renderSelect({ onSelectValue: setValue })

    act(() => {
      screen.getByRole('combobox').click()
    })

    act(() => {
      screen.getAllByRole('option')[1].click() // Two
    })

    expect(setValue).toBeCalledWith(2)
  })
})