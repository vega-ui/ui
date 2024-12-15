import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Popover } from '../Popover.tsx';

const TEXT = 'Hello, World!';

describe('Popover', () => {
  it('render', async () => {
    render(<Popover triggerSlot={(ref, props) => <button ref={ref} {...props}>Trigger</button>}>{TEXT}</Popover>)
    screen.getByRole('button').click()

    await waitFor(() => {
      expect(screen.getByText(TEXT)).toBeTruthy()
    })
  })

  it('has role', async () => {
    render(<Popover triggerSlot={(ref, props) => <button ref={ref} {...props}>Trigger</button>}>{TEXT}</Popover>)
    screen.getByRole('button').click()

    await waitFor(() => {
      expect(document.activeElement?.role).toBe('dialog')
    })
  })
})