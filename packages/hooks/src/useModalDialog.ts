import { FormEvent, SyntheticEvent, useLayoutEffect, useState } from 'react'

export type ModalDialogClosedBy = 'any' | 'closerequest' | 'none'

export interface UseModalDialogOptions {
  open: boolean
  onChangeOpen: (open: boolean) => void
}

/**
 * Drives a native `<dialog>` as a modal from React state: shows it with
 * `showModal()`, keeps it mounted until its close transition ends, and routes
 * close requests through `onChangeOpen` so a controlled parent decides and the
 * dialog animates out: `cancel` (`Escape`, or a backdrop click with the native
 * `closedby="any"`) and a `<form method="dialog">` submit. Closes the browser
 * makes on its own are synced back. `rendered` turns true once the dialog is
 * shown, so children rendered after it get the dialog itself focused instead of
 * the first focusable child, and their `autoFocus` works.
 */
export const useModalDialog = ({ open, onChangeOpen }: UseModalDialogOptions) => {
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null)
  const [stage, setStage] = useState<'closed' | 'mounted' | 'shown' | 'dismissed'>(open ? 'mounted' : 'closed')

  if (open && stage === 'closed') setStage('mounted')

  useLayoutEffect(() => {
    if (!dialog) return

    if (open) {
      if (!dialog.open) dialog.showModal()
      setStage('shown')
      return
    }

    if (!dialog.open) {
      setStage('closed')
      return
    }

    let cancelled = false

    Promise.allSettled(dialog.getAnimations().map((animation) => animation.finished)).then(() => {
      if (!cancelled) dialog.close()
    })

    return () => {
      cancelled = true
    }
  }, [open, dialog, stage])

  const onCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return

    event.preventDefault()
    onChangeOpen(false)
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

    setStage('dismissed')
    if (open) onChangeOpen(false)
  }

  return {
    ref: setDialog,
    dialog,
    mounted: stage !== 'closed',
    rendered: stage === 'shown' || stage === 'dismissed',
    onCancel,
    onSubmit,
    onClose
  }
}
