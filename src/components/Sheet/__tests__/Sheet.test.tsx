import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Sheet } from '../Sheet.tsx';
import { act } from 'react';

const TRIGGER_TEXT = 'Trigger'
const CONTENT_TEXT = 'Content'

describe('Sheet', () => {
  it('render', () => {
    render(
      <Sheet triggerSlot={(ref, props) => <button ref={ref} {...props}>{TRIGGER_TEXT}</button>}>
        {CONTENT_TEXT}
      </Sheet>
    )

    const trigger: HTMLButtonElement = screen.getByText(TRIGGER_TEXT)

    expect(trigger).toBeDefined()
    expect(screen.queryByText(CONTENT_TEXT)).toBeNull()
  })

  it('open', () => {
    render(
      <Sheet triggerSlot={(ref, props) => <button ref={ref} {...props}>{TRIGGER_TEXT}</button>}>
        {CONTENT_TEXT}
      </Sheet>
    )

    act(() => {
      screen.getByText(TRIGGER_TEXT).click()
    })

    waitFor(() => expect(screen.getByText(CONTENT_TEXT)).toBeDefined())
  })
})