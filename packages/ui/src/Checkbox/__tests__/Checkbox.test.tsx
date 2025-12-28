import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Checkbox, CheckboxProps } from '../Checkbox';
import { CheckboxCheckedIcon, CheckboxHiddenInput, CheckboxIndeterminateIcon, CheckboxIndicator } from '../components';

const renderCheckbox = (props?: CheckboxProps) => {
  return render(
    <Checkbox {...(props ?? {})}>
      <CheckboxHiddenInput />
      <CheckboxIndicator>
        <CheckboxCheckedIcon />
        <CheckboxIndeterminateIcon />
      </CheckboxIndicator>
    </Checkbox>
  )
}

describe('Checkbox', () => {
  it('render', () => {
    renderCheckbox()
    expect(screen.getByRole('checkbox')).toBeDefined()
  })

  it('change', () => {
    renderCheckbox()
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')
    checkbox.click()

    expect(checkbox.checked).toBeTruthy()
  })

  it('indeterminate', () => {
    renderCheckbox({ indeterminate: true })
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')

    expect(checkbox.indeterminate).toBeTruthy()

    checkbox.click()

    expect(checkbox.checked).toBeTruthy()
  })

  it('disabled', () => {
    renderCheckbox({ disabled: true })
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')

    checkbox.click()
    expect(checkbox.checked).toBeFalsy()
  })
})