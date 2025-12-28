import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { CheckboxCard, CheckboxCardProps } from '../CheckboxCard';
import {
  CheckboxCardContent, CheckboxCardControl, CheckboxCardControlCheckedIcon,
  CheckboxCardControlHiddenInput,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlIndicator,
  CheckboxCardDescription,
  CheckboxCardTitle
} from '../components';

const TITLE = 'Title';
const TEXT = 'Description';

const renderCheckboxCard = (props?: CheckboxCardProps) => {
  render(
    <CheckboxCard {...(props ?? {})}>
      <CheckboxCardContent>
        <CheckboxCardTitle>{TITLE}</CheckboxCardTitle>
        <CheckboxCardDescription>{TEXT}</CheckboxCardDescription>
      </CheckboxCardContent>
      <CheckboxCardControl>
        <CheckboxCardControlHiddenInput />
        <CheckboxCardControlIndicator>
          <CheckboxCardControlCheckedIcon />
          <CheckboxCardControlIndeterminateIcon />
        </CheckboxCardControlIndicator>
      </CheckboxCardControl>
    </CheckboxCard>
  )
}

describe('CheckboxCard', () => {
  it('render', () => {
    renderCheckboxCard()
    expect(screen.getByText(TITLE)).toBeDefined()
    expect(screen.getByText(TEXT)).toBeDefined()
    expect(screen.getByRole('checkbox')).toBeDefined()
  })

  it('change', () => {
    renderCheckboxCard()
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')
    checkbox.click()

    expect(checkbox.checked).toBeTruthy()
  })

  it('indeterminate', () => {
    renderCheckboxCard({ indeterminate: true })
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')

    expect(checkbox.indeterminate).toBeTruthy()

    checkbox.click()

    expect(checkbox.checked).toBeTruthy()
  })

  it('disabled', () => {
    renderCheckboxCard({ disabled: true })
    const checkbox: HTMLInputElement = screen.getByRole('checkbox')

    checkbox.click()
    expect(checkbox.checked).toBeFalsy()
  })
})