import { act, browser, command, controlled, defineWidget, field, handled, internal, keep, KeyOfState, lifecycle, listening, matching, ownedField, pointer, state, Step } from '@vega-ui/core'

/**
 * Which user actions close a modal, like the native `closedby` attribute:
 * `any` a backdrop click or `Escape`, `closerequest` only `Escape`, `none` neither.
 */
export type ModalDialogClosedBy = 'any' | 'closerequest' | 'none'

type Stage = 'closed' | 'mounting' | 'open' | 'closedByBrowser'

export const DIALOG = 'dialog'

type DialogStep<State> = Step<State, KeyOfState<State>, typeof DIALOG>

export const OPEN_DIALOG = command('openDialog')
export const CLOSE_DIALOG = command('closeDialog')

export const modalDialogValues = {
  owns: { open: controlled(false) },
  internal: { stage: internal('closed' as Stage), returnValue: internal(undefined as string | undefined), pressedBackdrop: internal(false) },
  observes: { closedByAny: matching(DIALOG, '[closedby="any"]'), closedByNone: matching(DIALOG, '[closedby="none"]') },
}

export const modalDialogShape = state({ options: {}, ...modalDialogValues, parts: [DIALOG] })

export interface ModalDialogState {
  readonly options: object
  readonly open: boolean
  readonly stage: Stage
  readonly returnValue: string | undefined
  readonly pressedBackdrop: boolean
  readonly closedByAny: boolean
  readonly closedByNone: boolean
}

const fieldsOf = <State extends ModalDialogState>() => ({
  open: ownedField<State, boolean>('open'),
  stage: field<State, Stage>('stage'),
  returnValue: field<State, string | undefined>('returnValue'),
  pressedBackdrop: field<State, boolean>('pressedBackdrop'),
})

const SHOW = [act.showModal(DIALOG)]
const SETTLING = [act.awaitAnimations(DIALOG)]

export const isMounted = (state: ModalDialogState) => state.open || state.stage !== 'closed'

export const isRendered = (state: ModalDialogState) => state.stage === 'open' || state.stage === 'closedByBrowser'

export const closeModalDialog = <State extends ModalDialogState>(state: State, returnValue?: string) => {
  const fields = fieldsOf<State>()
  const next = fields.returnValue.set(fields.open.set(state, false), returnValue)
  if (fields.open.controlled(state)) return handled(next)
  if (state.stage === 'open') return handled(next, SETTLING)

  return handled(fields.stage.set(next, 'closed'))
}

export const modalDialogSteps = <State extends ModalDialogState>(): DialogStep<State>[] => {
  const fields = fieldsOf<State>()

  const open = (state: State) => {
    const next = fields.open.set(state, true)
    if (fields.open.controlled(state) || state.stage === 'open') return keep(next)

    return keep(fields.stage.set(next, 'mounting'), SHOW)
  }

  const commands: DialogStep<State> = (state, input) => {
    if (input.is(OPEN_DIALOG)) return open(state)
    if (input.is(CLOSE_DIALOG)) return closeModalDialog(state)

    return undefined
  }

  const following: DialogStep<State> = (state, input) => {
    if (!input.is(lifecycle.connect) && !input.is(lifecycle.options)) return undefined
    if (input.is(lifecycle.options) && !input.changed?.includes('open')) return keep(state)
    if (state.open) return keep(fields.stage.set(state, state.stage === 'open' ? 'open' : 'mounting'), state.stage === 'open' ? [] : SHOW)
    if (state.stage === 'open') return keep(state, SETTLING)
    if (state.stage === 'closedByBrowser') return keep(fields.stage.set(state, 'closed'))

    return keep(state)
  }

  const shown = listening<State, KeyOfState<State>, typeof DIALOG>([browser.toggle], (state, input) => {
    if (!input.is(browser.toggle) || input.part !== DIALOG || input.to !== true) return undefined
    if (!state.open) return keep(state)

    return keep(fields.stage.set(state, 'open'))
  })

  const requests = listening<State, KeyOfState<State>, typeof DIALOG>([browser.cancel, browser.submit, pointer.down, pointer.press], (state, input) => {
    if (input.is(browser.cancel) && input.part === DIALOG) {
      const reset = fields.pressedBackdrop.set(state, false)
      return state.closedByNone ? handled(reset) : closeModalDialog(reset)
    }

    if (input.is(browser.submit) && input.part === DIALOG && input.to === 'dialog') return closeModalDialog(state, input.value)

    if (input.is(pointer.down) && input.part === DIALOG) return keep(fields.pressedBackdrop.set(state, input.backdrop === true))

    if (input.is(pointer.press) && input.part === DIALOG) {
      const backdrop = state.pressedBackdrop && input.backdrop === true
      const reset = fields.pressedBackdrop.set(state, false)
      if (!backdrop || !state.closedByAny || !state.open) return keep(reset)

      return closeModalDialog(reset)
    }

    return undefined
  })

  const settled: DialogStep<State> = (state, input) => {
    if (!input.is(browser.animationEnd) || input.part !== DIALOG) return undefined
    if (state.open || state.stage !== 'open') return keep(state)

    return keep(state, [act.closeDialog(DIALOG, state.returnValue)])
  }

  const closed = listening<State, KeyOfState<State>, typeof DIALOG>([browser.close], (state, input) => {
    if (!input.is(browser.close) || input.part !== DIALOG) return undefined
    if (!state.open) return keep(fields.stage.set(state, 'closed'))

    const next = fields.open.set(state, false)
    return keep(fields.stage.set(next, fields.open.controlled(state) ? 'closedByBrowser' : 'closed'))
  })

  return [commands, following, shown, requests, settled, closed]
}

export const modalDialogStatus = (open: boolean) => ({ 'data-status': open ? 'open' : 'close' })

type ModalDialogSnapshot = typeof modalDialogShape.__snapshot

export const modalDialogWidget = defineWidget({
  state: modalDialogShape,

  step: modalDialogSteps<ModalDialogSnapshot>(),

  output: {
    dialog: {
      ...modalDialogShape.part(() => [] as const, () => ({})),
      live: modalDialogShape.part(
        (state) => [state.open] as const,
        ([open]) => modalDialogStatus(open),
      ),
    },
  },
})
