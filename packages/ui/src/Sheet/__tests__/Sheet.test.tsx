import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Sheet } from '../Sheet.tsx';
import { act } from 'react';
import { SheetContent, SheetTrigger } from '../components';

const TRIGGER_TEXT = 'Trigger'
const CONTENT_TEXT = 'Content'

describe('Sheet', () => {
  it('render', () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <button>{TRIGGER_TEXT}</button>
        </SheetTrigger>
        <SheetContent>
          {CONTENT_TEXT}
        </SheetContent>
      </Sheet>
    )

    const trigger: HTMLButtonElement = screen.getByText(TRIGGER_TEXT)

    expect(trigger).toBeDefined()
    expect(screen.queryByText(CONTENT_TEXT)).toBeNull()
  })

  it('open', () => {
    render(
      <Sheet>
        <SheetTrigger asChild>
          <button>{TRIGGER_TEXT}</button>
        </SheetTrigger>
        <SheetContent>
          {CONTENT_TEXT}
        </SheetContent>
      </Sheet>
    )

    act(() => {
      screen.getByText(TRIGGER_TEXT).click()
    })

    waitFor(() => expect(screen.getByText(CONTENT_TEXT)).toBeDefined())
  })
})