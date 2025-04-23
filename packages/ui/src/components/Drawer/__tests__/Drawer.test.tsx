import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Drawer } from '../Drawer.tsx';
import { act } from 'react';
import { DrawerContent, DrawerTrigger } from '../components';

const TRIGGER_TEXT = 'Trigger'
const CONTENT_TEXT = 'Content'

describe('Drawer', () => {
  it('render', () => {
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <button>{TRIGGER_TEXT}</button>
        </DrawerTrigger>
        <DrawerContent>
          {CONTENT_TEXT}
        </DrawerContent>
      </Drawer>
    )

    const trigger: HTMLButtonElement = screen.getByText(TRIGGER_TEXT)

    expect(trigger).toBeDefined()
    expect(screen.queryByText(CONTENT_TEXT)).toBeNull()
  })

  it('open', () => {
    render(
      <Drawer>
        <DrawerTrigger asChild>
          <button>{TRIGGER_TEXT}</button>
        </DrawerTrigger>
        <DrawerContent>
          {CONTENT_TEXT}
        </DrawerContent>
      </Drawer>
    )

    act(() => {
      screen.getByText(TRIGGER_TEXT).click()
    })

    waitFor(() => expect(screen.getByText(CONTENT_TEXT)).toBeDefined())
  })
})