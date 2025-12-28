import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Switch } from '../Switch.tsx'
import { SwitchHiddenInput, SwitchIndicator } from '../components';

describe('Switch', () => {
  it('render', () => {
    render(
      <Switch>
        <SwitchIndicator />
        <SwitchHiddenInput />
      </Switch>
    )
    expect(screen.getByRole('switch')).toBeDefined()
  })

  it('change', () => {
    render(
      <Switch>
        <SwitchIndicator />
        <SwitchHiddenInput />
      </Switch>
    )
    const switchInput: HTMLInputElement = screen.getByRole('switch')
    switchInput.click()

    expect(switchInput.checked).toBeTruthy()
  })

  it('disabled', () => {
    render(
      <Switch>
        <SwitchIndicator />
        <SwitchHiddenInput disabled />
      </Switch>
    )
    const switchInput: HTMLInputElement = screen.getByRole('switch')

    switchInput.click()
    expect(switchInput.checked).toBeFalsy()
  })
})
