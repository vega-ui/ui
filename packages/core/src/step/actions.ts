import { InputSpec, Payload } from '../input'

export type FocusInsideAt = 'first' | 'next' | 'previous'

export interface MeasureRequest<Key = unknown, PartName extends string = string> {
  readonly name: string
  readonly parts?: readonly PartName[]
  readonly items?: readonly Key[] | 'all'
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

export type Action<Key = unknown, PartName extends string = string> =
  | { readonly type: 'focus'; readonly key: Key; readonly preventScroll?: boolean }
  | { readonly type: 'focusInside'; readonly key: Key; readonly at: FocusInsideAt }
  | { readonly type: 'focusPart'; readonly part: PartName }
  | { readonly type: 'reveal'; readonly key: Key }
  | { readonly type: 'click'; readonly key: Key }
  | { readonly type: 'timer'; readonly name: string; readonly ms: number }
  | { readonly type: 'cancelTimer'; readonly name: string }
  | { readonly type: 'showPopover'; readonly part: PartName }
  | { readonly type: 'hidePopover'; readonly part: PartName }
  | { readonly type: 'send'; readonly part: PartName; readonly input: InputSpec; readonly payload: Payload }
  | { readonly type: 'sendAt'; readonly key: Key; readonly input: InputSpec; readonly payload: Payload }
  | { readonly type: 'sendUp'; readonly part: PartName; readonly input: InputSpec; readonly payload: Payload }
  | { readonly type: 'measure'; readonly request: MeasureRequest<Key, PartName> }
  | { readonly type: 'awaitAnimations'; readonly part: PartName }
  | { readonly type: 'showModal'; readonly part: PartName }
  | { readonly type: 'closeDialog'; readonly part: PartName; readonly returnValue?: string }
  | { readonly type: 'watchKeys' }
  | { readonly type: 'claimPointer' }
  | { readonly type: 'scrub'; readonly part: PartName; readonly scrub: Scrub }
  | { readonly type: 'stopScrub'; readonly part: PartName }
  | { readonly type: 'flushStyles'; readonly part: PartName }
  | { readonly type: 'animateHeight'; readonly part: PartName; readonly open: boolean }
  | { readonly type: 'unwatchKeys' }
  | { readonly type: 'scrollTo'; readonly part: PartName; readonly to: ScrollToOptions }
  | { readonly type: 'setText'; readonly part: PartName; readonly value: string; readonly selection?: readonly [number, number]; readonly commit?: boolean }
  | { readonly type: 'commit'; readonly part: PartName }
  | { readonly type: 'emit'; readonly name: string; readonly value: unknown }

export const act = {
  focus: <Key>(key: Key, preventScroll?: boolean): Action<Key, never> => (preventScroll ? { type: 'focus', key, preventScroll } : { type: 'focus', key }),
  focusInside: <Key>(key: Key, at: FocusInsideAt): Action<Key, never> => ({ type: 'focusInside', key, at }),
  focusPart: <PartName extends string>(part: PartName): Action<never, PartName> => ({ type: 'focusPart', part }),
  reveal: <Key>(key: Key): Action<Key, never> => ({ type: 'reveal', key }),
  click: <Key>(key: Key): Action<Key, never> => ({ type: 'click', key }),
  timer: (name: string, ms: number): Action<never, never> => ({ type: 'timer', name, ms }),
  cancelTimer: (name: string): Action<never, never> => ({ type: 'cancelTimer', name }),
  showPopover: <PartName extends string>(part: PartName): Action<never, PartName> => ({ type: 'showPopover', part }),
  hidePopover: <PartName extends string>(part: PartName): Action<never, PartName> => ({ type: 'hidePopover', part }),
  send: <PartName extends string>(part: PartName, input: InputSpec, payload: Payload = {}): Action<never, PartName> => ({ type: 'send', part, input, payload }),
  sendAt: <Key>(key: Key, input: InputSpec, payload: Payload = {}): Action<Key, never> => ({ type: 'sendAt', key, input, payload }),
  sendUp: <PartName extends string>(part: PartName, input: InputSpec, payload: Payload = {}): Action<never, PartName> => ({ type: 'sendUp', part, input, payload }),
  measure: <Key, PartName extends string = never>(request: MeasureRequest<Key, PartName>): Action<Key, PartName> => ({ type: 'measure', request }),
  awaitAnimations: <PartName extends string>(part: PartName): Action<never, PartName> => ({ type: 'awaitAnimations', part }),
  showModal: <PartName extends string>(part: PartName): Action<never, PartName> => ({ type: 'showModal', part }),
  closeDialog: <PartName extends string>(part: PartName, returnValue?: string): Action<never, PartName> => (returnValue === undefined ? { type: 'closeDialog', part } : { type: 'closeDialog', part, returnValue }),
  watchKeys: (): Action<never, never> => ({ type: 'watchKeys' }),
  claimPointer: (): Action<never, never> => ({ type: 'claimPointer' }),
  scrub: <PartName extends string>(part: PartName, scrub: Scrub): Action<never, PartName> => ({ type: 'scrub', part, scrub }),
  stopScrub: <PartName extends string>(part: PartName): Action<never, PartName> => ({ type: 'stopScrub', part }),
  flushStyles: <PartName extends string>(part: PartName): Action<never, PartName> => ({ type: 'flushStyles', part }),
  animateHeight: <PartName extends string>(part: PartName, open: boolean): Action<never, PartName> => ({ type: 'animateHeight', part, open }),
  unwatchKeys: (): Action<never, never> => ({ type: 'unwatchKeys' }),
  scrollTo: <PartName extends string>(part: PartName, to: ScrollToOptions): Action<never, PartName> => ({ type: 'scrollTo', part, to }),
  setText: <PartName extends string>(part: PartName, value: string, selection?: readonly [number, number]): Action<never, PartName> => ({ type: 'setText', part, value, selection }),
  commitText: <PartName extends string>(part: PartName, value: string): Action<never, PartName> => ({ type: 'setText', part, value, commit: true }),
  commit: <PartName extends string>(part: PartName): Action<never, PartName> => ({ type: 'commit', part }),
  emit: (name: string, value: unknown): Action<never, never> => ({ type: 'emit', name, value }),
}

export type FocusStrategy = 'focus' | 'activedescendant'

export const show = <Key>(strategy: FocusStrategy, key: Key): Action<Key, never> => (strategy === 'activedescendant' ? act.reveal(key) : act.focus(key))

const TARGETED = new Set(['focus', 'focusInside', 'reveal', 'click', 'sendAt'])

export const targets = (action: Action<unknown>): action is Extract<Action<unknown>, { key: unknown }> => TARGETED.has(action.type)
