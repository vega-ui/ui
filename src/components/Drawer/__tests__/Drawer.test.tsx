import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Drawer } from '../Drawer.tsx';
import { act } from 'react';

const TRIGGER_TEXT = 'Trigger'
const CONTENT_TEXT = 'Content'

describe('Drawer', () => {
  it('render', () => {
    render(
      <Drawer triggerSlot={(ref, props) => <button ref={ref} {...props}>{TRIGGER_TEXT}</button>}>
        {CONTENT_TEXT}
      </Drawer>
    )

    const trigger: HTMLButtonElement = screen.getByText(TRIGGER_TEXT)

    expect(trigger).toBeDefined()
    expect(screen.queryByText(CONTENT_TEXT)).toBeNull()
  })

  it('open', () => {
    render(
      <Drawer triggerSlot={(ref, props) => <button ref={ref} {...props}>{TRIGGER_TEXT}</button>}>
        {CONTENT_TEXT}
      </Drawer>
    )

    act(() => {
      screen.getByText(TRIGGER_TEXT).click()
    })

    waitFor(() => expect(screen.getByText(CONTENT_TEXT)).toBeDefined())
  })
})