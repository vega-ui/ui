import { browser, focus, Input, InputSpec, layout, normalizationsOf, Orientation, pointer, readsCrossAxis, scroll, text } from '../input'

export type DomEvent = 'keydown' | 'click' | 'pointerdown' | 'pointermove' | 'pointerover' | 'pointerout' | 'touchmove' | 'wheel' | 'scroll' | 'scrollend' | 'focusin' | 'focusout' | 'beforeinput' | 'input' | 'toggle' | 'load' | 'error' | 'cancel' | 'close' | 'submit'

interface Source {
  readonly event: DomEvent
  readonly cancelable: boolean
  readonly always: boolean
  gives(spec: InputSpec): boolean
}

const among = (...specs: readonly InputSpec[]) => (spec: InputSpec) => specs.some((known) => known.type === spec.type && known.name === spec.name)

const SOURCES: readonly Source[] = [
  { event: 'keydown', cancelable: true, always: false, gives: (spec) => spec.type === 'key' || spec.type === 'nav' },
  { event: 'click', cancelable: true, always: false, gives: among(pointer.press) },
  { event: 'pointerdown', cancelable: false, always: false, gives: among(pointer.down, pointer.release, pointer.cancel) },
  { event: 'pointerdown', cancelable: false, always: false, gives: among(pointer.drag) },
  { event: 'touchmove', cancelable: true, always: false, gives: among(pointer.drag) },
  { event: 'wheel', cancelable: false, always: false, gives: among(pointer.wheel) },
  { event: 'wheel', cancelable: true, always: false, gives: among(pointer.spin) },
  { event: 'scroll', cancelable: false, always: false, gives: among(scroll.move, scroll.end) },
  { event: 'scrollend', cancelable: false, always: false, gives: among(scroll.end) },
  { event: 'pointerdown', cancelable: false, always: false, gives: among(pointer.dragOver) },
  { event: 'pointermove', cancelable: false, always: false, gives: among(pointer.hover) },
  { event: 'pointerover', cancelable: false, always: false, gives: among(pointer.enter) },
  { event: 'pointerout', cancelable: false, always: false, gives: among(pointer.leave) },
  { event: 'focusin', cancelable: false, always: true, gives: among(focus.enter, focus.move) },
  { event: 'focusout', cancelable: false, always: true, gives: among(focus.leave) },
  { event: 'keydown', cancelable: false, always: false, gives: among(text.key) },
  { event: 'beforeinput', cancelable: true, always: false, gives: among(text.edit) },
  { event: 'input', cancelable: false, always: false, gives: among(text.change) },
  { event: 'toggle', cancelable: false, always: false, gives: among(browser.toggle) },
  { event: 'load', cancelable: false, always: false, gives: among(browser.load) },
  { event: 'error', cancelable: false, always: false, gives: among(browser.error) },
  { event: 'cancel', cancelable: true, always: false, gives: among(browser.cancel) },
  { event: 'close', cancelable: false, always: false, gives: among(browser.close) },
  { event: 'submit', cancelable: true, always: false, gives: among(browser.submit) },
]

export const cancels = (event: Event, input: InputSpec) => SOURCES.some((source) => source.cancelable && source.event === event.type && source.gives(input))

export const eventsFor = (listens: readonly InputSpec[]): readonly DomEvent[] => [
  ...new Set(SOURCES.filter((source) => source.always || listens.some((spec) => source.gives(spec))).map((source) => source.event)),
]

export const spins = (listens: readonly InputSpec[]) => listens.some(among(pointer.spin))

const fromPage = among(browser.reset, browser.reveal, layout.resize, layout.viewport, text.select)

export const delivers = (listens: readonly InputSpec[], spec: InputSpec) => {
  if (fromPage(spec)) return listens.some(among(spec))

  const source = SOURCES.find((candidate) => candidate.gives(spec))
  if (!source) return true

  return source.always || listens.some((declared) => source.gives(declared))
}

export const hears = (listens: readonly InputSpec[], input: Input<unknown>, orientation?: Orientation) => {
  if (input.type !== 'key') return delivers(listens, input)

  const candidates = orientation === undefined ? [input] : normalizationsOf(input, orientation, readsCrossAxis(listens))

  return candidates.some((candidate) => listens.some((declared) => candidate.is(declared)))
}
