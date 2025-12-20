import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Drawer } from '../Drawer.tsx';
import { act } from 'react';
import { DrawerContent, DrawerOverlay, DrawerPortal, DrawerTrigger } from '../components';
import { Text } from '../../Text';

const TRIGGER_TEXT = 'Trigger'
const CONTENT_TEXT = 'Content'

describe('Drawer', () => {
  it('render', () => {
    render(
      <Drawer>
        <DrawerTrigger>{TRIGGER_TEXT}</DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay>
            <DrawerContent>
              <Text>{CONTENT_TEXT}</Text>
            </DrawerContent>
          </DrawerOverlay>
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
          <DrawerOverlay>
            <DrawerContent>
              <Text>{CONTENT_TEXT}</Text>
            </DrawerContent>
          </DrawerOverlay>
        </DrawerContent>
      </Drawer>
    )

    act(() => {
      screen.getByText(TRIGGER_TEXT).click()
    })
    
    expect(screen.getByText(CONTENT_TEXT)).toBeVisible()
  })
})