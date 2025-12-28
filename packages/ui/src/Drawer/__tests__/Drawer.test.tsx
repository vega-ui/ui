import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Drawer } from '../Drawer';
import { act } from 'react';
import { DrawerContent, DrawerBackdrop, DrawerPortal, DrawerTrigger } from '../components';
import { Text } from '../../Text';

const TRIGGER_TEXT = 'Trigger'
const CONTENT_TEXT = 'Content'

describe('Drawer', () => {
  it('render', () => {
    render(
      <Drawer>
        <DrawerTrigger>{TRIGGER_TEXT}</DrawerTrigger>
        <DrawerPortal>
          <DrawerBackdrop>
            <DrawerContent>
              <Text>{CONTENT_TEXT}</Text>
            </DrawerContent>
          </DrawerBackdrop>
        </DrawerPortal>
      </Drawer>
    )

    const trigger: HTMLButtonElement = screen.getByText(TRIGGER_TEXT)

    expect(trigger).toBeInTheDocument()
    expect(screen.queryByText(CONTENT_TEXT)).not.toBeInTheDocument()
  })

  it('open', () => {
    render(
      <Drawer>
        <DrawerTrigger>{TRIGGER_TEXT}</DrawerTrigger>
        <DrawerContent>
          <DrawerBackdrop>
            <DrawerContent>
              <Text>{CONTENT_TEXT}</Text>
            </DrawerContent>
          </DrawerBackdrop>
        </DrawerContent>
      </Drawer>
    )

    act(() => {
      screen.getByText(TRIGGER_TEXT).click()
    })
    
    expect(screen.getByText(CONTENT_TEXT)).toBeVisible()
  })
})