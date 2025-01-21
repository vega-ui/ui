import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Modal } from '../Modal.tsx';
import { act } from 'react';

const TEXT = 'Hello, World!';

describe('Modal', () => {
  it('render', async () => {
    render(<Modal triggerSlot={(ref, props) => <button ref={ref} {...props}>Trigger</button>}>{TEXT}</Modal>)
    act(() => {
      screen.getByRole('button').click()
    })

    await waitFor(() => {
      expect(screen.getByText(TEXT)).toBeDefined()
    })
  })
})