import { FormEvent, MouseEvent, SyntheticEvent, useLayoutEffect, useReducer, useRef, useState } from 'react'
import { inRange } from '@vega-ui/utils'

export type ModalDialogClosedBy = 'any' | 'closerequest' | 'none'

export interface UseModalDialogOptions {
  open: boolean
  onChangeOpen: (open: boolean) => void
  closedBy?: ModalDialogClosedBy
}

/**
 * Drives a native `<dialog>` as a modal from React state: shows it with
 * `showModal()`, keeps it mounted until its close transition ends, closes it
 * through `onChangeOpen` on a `<form method="dialog">` submit so it animates out,
 * and syncs other closes made by the browser. `rendered` turns true once the dialog is shown, so
 * children rendered after it get the dialog itself focused instead of the first
 * focusable child, and their `autoFocus` works. Like the native `closedby` attribute, `closedBy`
 * sets which user actions request a close: `any` a backdrop click or `Escape`,
 * `closerequest` only `Escape`, and `none` neither.
 */
export const useModalDialog = ({ open, onChangeOpen, closedBy = 'closerequest' }: UseModalDialogOptions) => {
  const ref = useRef<HTMLDialogElement>(null)
  const pressedBackdrop = useRef(false)
  const [mounted, setMounted] = useState(open)
  const [rendered, setRendered] = useState(false)
  const [syncKey, resync] = useReducer((key: number) => key + 1, 0)

  if (open && !mounted) setMounted(true)

  useLayoutEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) dialog.showModal()
      setRendered(true)
      return
    }

    let cancelled = false

    Promise.allSettled(dialog.getAnimations().map((animation) => animation.finished)).then(() => {
      if (cancelled) return
      if (dialog.open) dialog.close()
      else unmount()
    })

    return () => {
      cancelled = true
    }
  }, [open, mounted, syncKey])

  const unmount = () => {
    setMounted(false)
    setRendered(false)
  }

  const isBackdropEvent = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return false

    const rect = event.currentTarget.getBoundingClientRect()
    const inside = inRange(event.clientX, [rect.left, rect.right]) && inRange(event.clientY, [rect.top, rect.bottom])

    return !inside
  }

  const onPointerDown = (event: MouseEvent<HTMLDialogElement>) => {
    pressedBackdrop.current = isBackdropEvent(event)
  }

  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    const backdropClick = pressedBackdrop.current && isBackdropEvent(event)
    pressedBackdrop.current = false

    if (backdropClick && closedBy === 'any') onChangeOpen(false)
  }

  const onCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return

    event.preventDefault()
    if (closedBy !== 'none') onChangeOpen(false)
  }

  const onSubmit = (event: FormEvent<HTMLDialogElement>) => {
    const form = event.target as HTMLFormElement
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null
    const method = submitter?.formMethod || form.method

    if (method !== 'dialog' || form.closest('dialog') !== event.currentTarget) return

    event.preventDefault()
    if (submitter?.hasAttribute('value')) event.currentTarget.returnValue = submitter.value
    onChangeOpen(false)
  }

  const onClose = (event: SyntheticEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return

    if (!open) {
      unmount()
      return
    }

    onChangeOpen(false)
    resync()
  }

  const escapeClosedBy: ModalDialogClosedBy = closedBy === 'none' ? 'none' : 'closerequest'

  return { ref, mounted, rendered, escapeClosedBy, isBackdropEvent, onPointerDown, onClick, onCancel, onSubmit, onClose }
}
