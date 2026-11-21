import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { useId } from 'react';

import { Dialog, DialogContent } from '../../Dialog';
import { createToastQueue, Toast, ToastClose, ToastQueue, ToastRegion, useToastContext } from '..';

afterEach(cleanup);

interface Notice {
  title: string
  undo?: () => void
}

const Notification = ({ onDismiss }: { onDismiss?: (event: React.MouseEvent) => void }) => {
  const { content } = useToastContext<Notice>()
  const titleId = useId()

  return (
    <Toast aria-labelledby={titleId}>
      <p id={titleId}>{content.title}</p>
      {content.undo && <ToastClose onClick={content.undo}>Undo</ToastClose>}
      <ToastClose aria-label='Dismiss' onClick={onDismiss}>×</ToastClose>
    </Toast>
  )
}

const Toasts = ({ queue, onDismiss }: { queue: ToastQueue<Notice>, onDismiss?: (event: React.MouseEvent) => void }) => (
  <ToastRegion queue={queue} aria-label='Notifications'>
    <Notification onDismiss={onDismiss} />
  </ToastRegion>
)

const toasts = () => [...document.querySelectorAll('[role="status"]')]

const region = () => document.querySelector('section')!

const add = (queue: ToastQueue<Notice>, notice: Notice, timeout?: number) => act(() => void queue.add(notice, { timeout }))

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const pointer = { pointerId: 7, isPrimary: true, button: 0, buttons: 1, clientY: 40 }

const swipe = async (target: Element, distance: number) => {
  const x = 200
  fireEvent.pointerDown(target, { ...pointer, clientX: x })

  for (let step = 1; step <= 6; step++) {
    await wait(16)
    fireEvent.pointerMove(target, { ...pointer, clientX: x + (distance * step) / 6 })
  }

  fireEvent.pointerUp(target, { ...pointer, clientX: x + distance })
}

describe('Critical User Paths', () => {
  it('shows each toast of the queue in a named live region above the page, newest first', async () => {
    const queue = createToastQueue<Notice>()
    render(<Toasts queue={queue} />)

    await vi.waitFor(() => expect(region()).not.toBeNull())
    expect(region().getAttribute('role')).toBe('region')
    expect(region().getAttribute('aria-label')).toBe('Notifications')
    expect(region().getAttribute('aria-live')).toBe('polite')
    expect(region().matches(':popover-open')).toBe(true)

    add(queue, { title: 'Saved' })
    add(queue, { title: 'Copied' })

    expect(toasts().map((toast) => toast.textContent)).toEqual(['Copied×', 'Saved×'])
    expect(toasts()[0].getAttribute('aria-labelledby')).toBe(toasts()[0].querySelector('p')!.id)
  })

  it('closes a toast with a close button after the handler of the user, and keeps it when the handler prevents it', async () => {
    const queue = createToastQueue<Notice>()
    const undo = vi.fn()
    const onDismiss = vi.fn((event: React.MouseEvent) => event.preventDefault())
    render(<Toasts queue={queue} onDismiss={onDismiss} />)
    await vi.waitFor(() => expect(region()).not.toBeNull())
    add(queue, { title: 'Archived', undo })

    await userEvent.click(document.querySelector<HTMLElement>('[aria-label="Dismiss"]')!)
    expect(onDismiss).toHaveBeenCalledOnce()
    expect(queue.toasts).toHaveLength(1)

    await userEvent.click([...document.querySelectorAll('button')].find((button) => button.textContent === 'Undo')!)
    expect(undo).toHaveBeenCalledOnce()
    expect(queue.toasts).toHaveLength(0)
    await vi.waitFor(() => expect(toasts()).toHaveLength(0))
  })

  it('closes a toast once its time runs out and keeps a toast without a timeout', async () => {
    vi.spyOn(document, 'hasFocus').mockReturnValue(true)
    const queue = createToastQueue<Notice>()
    render(<><button type='button'>Elsewhere</button><Toasts queue={queue} /></>)
    await vi.waitFor(() => expect(region()).not.toBeNull())
    await userEvent.hover([...document.querySelectorAll('button')].find((button) => button.textContent === 'Elsewhere')!)

    add(queue, { title: 'Stays' })
    add(queue, { title: 'Goes' }, 50)

    await vi.waitFor(() => expect(toasts().map((toast) => toast.textContent)).toEqual(['Stays×']))
    expect(queue.toasts.map((toast) => toast.content.title)).toEqual(['Stays'])
    vi.restoreAllMocks()
  })
})

describe('Edge Cases', () => {
  it('stays above an open modal dialog, where the user can still press its buttons', async () => {
    const queue = createToastQueue<Notice>()
    render(
      <>
        <Dialog defaultOpen>
          <DialogContent aria-label='Settings'>
            <input aria-label='Name' />
          </DialogContent>
        </Dialog>
        <Toasts queue={queue} />
      </>,
    )
    await vi.waitFor(() => expect(region()?.closest('dialog')).not.toBeNull())
    add(queue, { title: 'Saved' })

    const dismiss = document.querySelector<HTMLElement>('[aria-label="Dismiss"]')!
    await vi.waitFor(() => {
      const { left, top, width, height } = dismiss.getBoundingClientRect()
      expect(document.elementFromPoint(left + width / 2, top + height / 2)).toBe(dismiss)
    })

    await userEvent.click(dismiss)
    expect(queue.toasts).toHaveLength(0)
    expect(document.querySelector('dialog')!.open).toBe(true)
  })

  it('swipes a toast off toward the nearer side edge, the start edge at the start and the left edge at the end in RTL', async () => {
    const queue = createToastQueue<Notice>()
    render(<ToastRegion queue={queue} aria-label='Notifications' placement='top-start'><Notification /></ToastRegion>)
    await vi.waitFor(() => expect(region()).not.toBeNull())
    add(queue, { title: 'Saved' })

    await swipe(toasts()[0], 300)
    expect(queue.toasts).toHaveLength(1)

    await swipe(toasts()[0], -300)
    await vi.waitFor(() => expect(queue.toasts).toHaveLength(0))

    cleanup()
    document.documentElement.dir = 'rtl'
    render(<ToastRegion queue={queue} aria-label='Notifications'><Notification /></ToastRegion>)
    await vi.waitFor(() => expect(region()).not.toBeNull())
    add(queue, { title: 'Copied' })

    await swipe(toasts()[0], -300)
    document.documentElement.dir = ''
    await vi.waitFor(() => expect(queue.toasts).toHaveLength(0))
  })


})

describe('Accessibility', () => {
  it('closes the focused toast on Escape without closing the dialog around it', async () => {
    const queue = createToastQueue<Notice>()
    render(
      <>
        <Dialog defaultOpen>
          <DialogContent aria-label='Settings' />
        </Dialog>
        <Toasts queue={queue} />
      </>,
    )
    await vi.waitFor(() => expect(region()?.closest('dialog')).not.toBeNull())
    add(queue, { title: 'Saved' })

    document.querySelector<HTMLElement>('[aria-label="Dismiss"]')!.focus()
    await userEvent.keyboard('{Escape}')

    expect(queue.toasts).toHaveLength(0)
    expect(document.querySelector('dialog')!.open).toBe(true)
  })

  it('moves the focus into the next toast when the focused one closes', async () => {
    const queue = createToastQueue<Notice>()
    render(<Toasts queue={queue} />)
    await vi.waitFor(() => expect(region()).not.toBeNull())
    add(queue, { title: 'First' })
    add(queue, { title: 'Second' })

    const [newest, older] = [...document.querySelectorAll<HTMLElement>('[aria-label="Dismiss"]')]
    newest.focus()
    await userEvent.keyboard('{Enter}')

    expect(document.activeElement).toBe(older)
  })

  it('gives the focus back to where it was before the toasts once the last focused toast closes', async () => {
    const queue = createToastQueue<Notice>()
    render(<><button type='button'>Compose</button><Toasts queue={queue} /></>)
    await vi.waitFor(() => expect(region()).not.toBeNull())
    add(queue, { title: 'Sent' })

    const compose = [...document.querySelectorAll<HTMLElement>('button')].find((button) => button.textContent === 'Compose')!
    compose.focus()
    document.querySelector<HTMLElement>('[aria-label="Dismiss"]')!.focus()
    await userEvent.keyboard('{Enter}')

    expect(document.activeElement).toBe(compose)
  })
})
