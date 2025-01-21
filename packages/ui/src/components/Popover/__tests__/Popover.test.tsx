import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Popover } from '../Popover.tsx';
import { act } from 'react';

const TEXT = 'Hello, World!';

describe('Popover', () => {
  it('render', async () => {
    render(<Popover triggerSlot={(ref, props) => <button ref={ref} {...props}>Trigger</button>}>{TEXT}</Popover>)
    act(() => {
      screen.getByRole('button').click()
    })

    await waitFor(() => {
      expect(screen.getByText(TEXT)).toBeDefined()
    })
  })

  it('has role', async () => {
    render(<Popover triggerSlot={(ref, props) => <button ref={ref} {...props}>Trigger</button>}>{TEXT}</Popover>)
    act(() => {
      screen.getByRole('button').click()
    })

    await waitFor(() => {
      expect(document.activeElement?.role).toBe('dialog')
    })
  })
})