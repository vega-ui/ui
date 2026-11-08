import { FormEvent, SyntheticEvent, useEffect, useLayoutEffect, useState } from 'react'
import { useEventCallback } from '@vega-ui/hooks'
import { isBackdropPoint } from '@vega-ui/utils'

/**
 * Which user actions close a modal, like the native `closedby` attribute:
 * `any` a backdrop click or `Escape`, `closerequest` only `Escape`, `none` neither.
 */
export type ModalDialogClosedBy = 'any' | 'closerequest' | 'none'

export interface UseModalDialogOptions {
  open: boolean
  onChangeOpen: (open: boolean) => void
  closedBy: ModalDialogClosedBy
}

/**
 * Drives a native `<dialog>` as a modal from React state: shows it with
 * `showModal()`, keeps it mounted until its close transition ends, and routes
 * close requests through `onChangeOpen` so a controlled parent decides and the
 * dialog animates out: `cancel` (`Escape`, or a backdrop click with the native
 * `closedby="any"`) and a `<form method="dialog">` submit. Closes the browser
 * makes on its own are synced back and stay final until `open` changes. `rendered` turns true once the dialog is
 * shown, so children rendered after it get the dialog itself focused instead of
 * the first focusable child, and their `autoFocus` works. `closedBy` follows
 * the native `closedby` attribute and is enforced in browsers without it.
 */
export const useModalDialog = ({ open, onChangeOpen, closedBy }: UseModalDialogOptions) => {
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null)
  const [stage, setStage] = useState<'closed' | 'mounting' | 'open' | 'closedByBrowser'>(open ? 'mounting' : 'closed')

  if (open && stage === 'closed') setStage('mounting')

  useLayoutEffect(() => {
    if (!dialog) return

    if (open) {
      if (stage === 'closedByBrowser') return

      if (!dialog.open) dialog.showModal()
      setStage('open')
      return
    }

    if (!dialog.open) {
      setStage('closed')
      return
    }

    let cancelled = false

    const animations = dialog.getAnimations({ subtree: true }).filter((animation) => (animation.effect as KeyframeEffect).target === dialog)

    Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      if (!cancelled) dialog.close()
    })

    return () => {
      cancelled = true
    }
  }, [open, dialog, stage])

  const requestClose = useEventCallback(() => onChangeOpen(false))

  useEffect(() => {
    if (!dialog || closedBy !== 'any' || 'closedBy' in HTMLDialogElement.prototype) return

    let pressedBackdrop = false

    const onPointerDown = (event: PointerEvent) => {
      pressedBackdrop = isBackdropPoint(dialog, event)
    }

    const onClick = (event: MouseEvent) => {
      if (pressedBackdrop && isBackdropPoint(dialog, event)) requestClose()
      pressedBackdrop = false
    }

    dialog.addEventListener('pointerdown', onPointerDown)
    dialog.addEventListener('click', onClick)

    return () => {
      dialog.removeEventListener('pointerdown', onPointerDown)
      dialog.removeEventListener('click', onClick)
    }
  }, [dialog, closedBy, requestClose])

  const onCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return

    event.preventDefault()
    if (closedBy !== 'none') onChangeOpen(false)
  }

  const onSubmit = (event: FormEvent<HTMLDialogElement>) => {
    if (event.defaultPrevented) return

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
      setStage('closed')
      return
    }

    setStage('closedByBrowser')
    onChangeOpen(false)
  }

  return {
    ref: setDialog,
    dialog,
    mounted: stage !== 'closed',
    rendered: stage === 'open' || stage === 'closedByBrowser',
    onCancel,
    onSubmit,
    onClose
  }
}
