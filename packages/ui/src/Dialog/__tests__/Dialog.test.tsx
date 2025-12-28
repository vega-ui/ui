import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Dialog } from '../Dialog';
import { act } from 'react';
import { DialogContent, DialogTrigger } from '../components';

const TEXT = 'Hello, World!';

describe('Dialog', () => {
  it('render', async () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button>Trigger</button>
        </DialogTrigger>
        <DialogContent>
          {TEXT}
        </DialogContent>
      </Dialog>
    )
    act(() => {
      screen.getByRole('button').click()
    })
    
    expect(screen.getByText(TEXT)).toBeVisible()
  })
})