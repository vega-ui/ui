import { InputSpec, Payload } from '../input'

export type FocusInsideAt = 'first' | 'next' | 'previous'

export interface MeasureRequest<K = unknown> {
  readonly name: string
  readonly parts?: readonly string[]
  readonly items?: readonly K[] | 'all'
  readonly rect?: boolean
  readonly scroll?: boolean
  readonly styles?: readonly string[]
  readonly viewport?: boolean
}

export interface Scrub {
  readonly keyframes: Keyframe[] | PropertyIndexedKeyframes
  readonly pseudoElement?: string
  readonly progress: number
}

export type Action<K = unknown> =
  | { readonly type: 'focus'; readonly key: K; readonly preventScroll?: boolean }
  | { readonly type: 'focusInside'; readonly key: K; readonly at: FocusInsideAt }
  | { readonly type: 'focusPart'; readonly part: string }
  | { readonly type: 'reveal'; readonly key: K }
  | { readonly type: 'click'; readonly key: K }
  | { readonly type: 'timer'; readonly name: string; readonly ms: number }
  | { readonly type: 'cancelTimer'; readonly name: string }
  | { readonly type: 'showPopover'; readonly part: string }
  | { readonly type: 'hidePopover'; readonly part: string }
  | { readonly type: 'send'; readonly part: string; readonly input: InputSpec; readonly payload: Payload }
  | { readonly type: 'measure'; readonly request: MeasureRequest<K> }
  | { readonly type: 'awaitAnimations'; readonly part: string }
  | { readonly type: 'showModal'; readonly part: string }
  | { readonly type: 'closeDialog'; readonly part: string; readonly returnValue?: string }
  | { readonly type: 'watchKeys' }
  | { readonly type: 'claimPointer' }
  | { readonly type: 'scrub'; readonly part: string; readonly scrub: Scrub }
  | { readonly type: 'stopScrub'; readonly part: string }
  | { readonly type: 'flushStyles'; readonly part: string }
  | { readonly type: 'animateHeight'; readonly part: string; readonly open: boolean }
  | { readonly type: 'unwatchKeys' }
  | { readonly type: 'scrollTo'; readonly part: string; readonly to: ScrollToOptions }
  | { readonly type: 'setText'; readonly part: string; readonly value: string; readonly selection?: readonly [number, number]; readonly commit?: boolean }
  | { readonly type: 'commit'; readonly part: string }
  | { readonly type: 'emit'; readonly name: string; readonly value: unknown }

export const act = {
  focus: <K>(key: K, preventScroll?: boolean): Action<K> => (preventScroll ? { type: 'focus', key, preventScroll } : { type: 'focus', key }),
  focusInside: <K>(key: K, at: FocusInsideAt): Action<K> => ({ type: 'focusInside', key, at }),
  focusPart: (part: string): Action<never> => ({ type: 'focusPart', part }),
  reveal: <K>(key: K): Action<K> => ({ type: 'reveal', key }),
  click: <K>(key: K): Action<K> => ({ type: 'click', key }),
  timer: (name: string, ms: number): Action<never> => ({ type: 'timer', name, ms }),
  cancelTimer: (name: string): Action<never> => ({ type: 'cancelTimer', name }),
  showPopover: (part: string): Action<never> => ({ type: 'showPopover', part }),
  hidePopover: (part: string): Action<never> => ({ type: 'hidePopover', part }),
  send: (part: string, input: InputSpec, payload: Payload = {}): Action<never> => ({ type: 'send', part, input, payload }),
  measure: <K>(request: MeasureRequest<K>): Action<K> => ({ type: 'measure', request }),
  awaitAnimations: (part: string): Action<never> => ({ type: 'awaitAnimations', part }),
  showModal: (part: string): Action<never> => ({ type: 'showModal', part }),
  closeDialog: (part: string, returnValue?: string): Action<never> => (returnValue === undefined ? { type: 'closeDialog', part } : { type: 'closeDialog', part, returnValue }),
  watchKeys: (): Action<never> => ({ type: 'watchKeys' }),
  claimPointer: (): Action<never> => ({ type: 'claimPointer' }),
  scrub: (part: string, scrub: Scrub): Action<never> => ({ type: 'scrub', part, scrub }),
  stopScrub: (part: string): Action<never> => ({ type: 'stopScrub', part }),
  flushStyles: (part: string): Action<never> => ({ type: 'flushStyles', part }),
  animateHeight: (part: string, open: boolean): Action<never> => ({ type: 'animateHeight', part, open }),
  unwatchKeys: (): Action<never> => ({ type: 'unwatchKeys' }),
  scrollTo: (part: string, to: ScrollToOptions): Action<never> => ({ type: 'scrollTo', part, to }),
  setText: (part: string, value: string, selection?: readonly [number, number]): Action<never> => ({ type: 'setText', part, value, selection }),
  commitText: (part: string, value: string): Action<never> => ({ type: 'setText', part, value, commit: true }),
  commit: (part: string): Action<never> => ({ type: 'commit', part }),
  emit: (name: string, value: unknown): Action<never> => ({ type: 'emit', name, value }),
}

export type FocusStrategy = 'focus' | 'activedescendant'

export const show = <K>(strategy: FocusStrategy, key: K): Action<K> => (strategy === 'activedescendant' ? act.reveal(key) : act.focus(key))

const TARGETED = new Set(['focus', 'focusInside', 'reveal', 'click'])

export const targets = (action: Action<unknown>): action is Extract<Action<unknown>, { key: unknown }> => TARGETED.has(action.type)
