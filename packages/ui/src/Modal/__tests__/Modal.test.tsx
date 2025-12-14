import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react'
import { Modal } from '../Modal.tsx';
import { act } from 'react';
import { ModalContent, ModalTrigger } from '../components';

const TEXT = 'Hello, World!';

describe('Modal', () => {
  it('render', async () => {
    render(
      <Modal>
        <ModalTrigger asChild>
          <button>Trigger</button>
        </ModalTrigger>
        <ModalContent>
          {TEXT}
        </ModalContent>
      </Modal>
    )
    act(() => {
      screen.getByRole('button').click()
    })

    await waitFor(() => {
      expect(screen.getByText(TEXT)).toBeDefined()
    })
  })
})