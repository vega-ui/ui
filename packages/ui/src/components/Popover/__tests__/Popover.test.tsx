import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Popover } from '../Popover.tsx';
import { act } from 'react';
import { PopoverContent, PopoverTrigger } from '../components';

const TEXT = 'Hello, World!';

describe('Popover', () => {
  it('render', async () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverContent>
          {TEXT}
        </PopoverContent>
      </Popover>
    )
    act(() => {
      screen.getByRole('button').click()
    })

    await waitFor(() => {
      expect(screen.getByText(TEXT)).toBeDefined()
    })
  })

  it('has role', async () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Trigger</button>
        </PopoverTrigger>
        <PopoverContent>
          {TEXT}
        </PopoverContent>
      </Popover>
    )
    act(() => {
      screen.getByRole('button').click()
    })

    await waitFor(() => {
      expect(document.activeElement?.role).toBe('dialog')
    })
  })
})