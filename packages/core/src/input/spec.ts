export type ModName = 'shift' | 'ctrl' | 'alt' | 'meta' | 'mod'

export interface Mod {
  readonly mod: ModName
}

export interface InputSpec {
  readonly type: string
  readonly name: string
  readonly mods: ReadonlySet<ModName>
}

export interface Point {
  readonly x: number
  readonly y: number
}

export interface Rect {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

export interface ScrollBox {
  readonly top: number
  readonly left: number
  readonly width: number
  readonly height: number
  readonly clientWidth: number
  readonly clientHeight: number
}

export interface TextState {
  readonly value: string
  readonly selection: readonly [start: number, end: number]
}

export interface TextEdit {
  readonly type: string
  readonly data: string
}

export interface Metrics {
  readonly rect?: Rect
  readonly scroll?: ScrollBox
  readonly styles?: Readonly<Record<string, string>>
}

export interface Viewport {
  readonly width: number
  readonly height: number
  readonly keyboardInset: number
}

export interface Measured<K = unknown> {
  readonly name: string
  readonly parts: Readonly<Record<string, Metrics>>
  readonly items: readonly (readonly [K, Metrics])[]
  readonly viewport?: Viewport
}

export interface Payload<K = unknown> {
  readonly char?: string
  readonly key?: K
  readonly part?: string
  readonly inside?: boolean
  readonly content?: boolean
  readonly keys?: readonly K[]
  readonly value?: string
  readonly point?: Point
  readonly to?: unknown
  readonly backdrop?: boolean
  readonly measured?: Measured<K>
  readonly pointerType?: string
  readonly time?: number
  readonly primary?: boolean
  readonly text?: boolean
  readonly scroller?: ScrollBox
  readonly delta?: Point
  readonly field?: TextState
  readonly edit?: TextEdit
}

export interface Input<K = unknown> extends InputSpec, Payload<K> {
  is(spec: InputSpec): boolean
}

const NONE: ReadonlySet<ModName> = new Set()
const SHIFT_ONLY: ReadonlySet<ModName> = new Set(['shift'])

const sameMods = (first: ReadonlySet<ModName>, second: ReadonlySet<ModName>) => first.size === second.size && [...first].every((mod) => second.has(mod))

export const defineInput = (type: string, name: string, mods: ReadonlySet<ModName> = NONE): InputSpec => ({ type, name, mods })

export const PRINTABLE = 'printable'

const matches = (input: Input<unknown>, target: InputSpec) => {
  if (target.type !== input.type) return false

  if (target.name === PRINTABLE) {
    return input.char !== undefined && [...input.char].length === 1 && (input.mods.size === 0 || sameMods(input.mods, SHIFT_ONLY))
  }

  return target.name === input.name && sameMods(target.mods, input.mods)
}

export const createInput = <K = unknown>(base: InputSpec, payload: Payload<K> = {}): Input<K> => {
  const input: Input<K> = {
    type: base.type,
    name: base.name,
    mods: base.mods,
    char: payload.char,
    key: payload.key,
    part: payload.part,
    inside: payload.inside,
    content: payload.content,
    keys: payload.keys,
    value: payload.value,
    point: payload.point,
    to: payload.to,
    backdrop: payload.backdrop,
    measured: payload.measured,
    pointerType: payload.pointerType,
    time: payload.time,
    primary: payload.primary,
    text: payload.text,
    scroller: payload.scroller,
    delta: payload.delta,
    field: payload.field,
    edit: payload.edit,
    is: (target) => matches(input, target),
  }

  return input
}

export const payloadOf = <K>({ char, key, part, inside, content, keys, value, point, to, backdrop, measured, pointerType, time, primary, text, scroller, delta, field, edit }: Payload<K>): Payload<K> => ({ char, key, part, inside, content, keys, value, point, to, backdrop, measured, pointerType, time, primary, text, scroller, delta, field, edit })

export const mod: Record<ModName, Mod> = {
  shift: { mod: 'shift' },
  ctrl: { mod: 'ctrl' },
  alt: { mod: 'alt' },
  meta: { mod: 'meta' },
  mod: { mod: 'mod' },
}

const withMods = (target: InputSpec, ...mods: Mod[]): InputSpec => defineInput(target.type, target.name, new Set([...target.mods, ...mods.map((modifier) => modifier.mod)]))

export const key = {
  arrowUp: defineInput('key', 'ArrowUp'),
  arrowDown: defineInput('key', 'ArrowDown'),
  arrowLeft: defineInput('key', 'ArrowLeft'),
  arrowRight: defineInput('key', 'ArrowRight'),
  home: defineInput('key', 'Home'),
  end: defineInput('key', 'End'),
  pageUp: defineInput('key', 'PageUp'),
  pageDown: defineInput('key', 'PageDown'),
  enter: defineInput('key', 'Enter'),
  space: defineInput('key', ' '),
  escape: defineInput('key', 'Escape'),
  tab: defineInput('key', 'Tab'),
  backspace: defineInput('key', 'Backspace'),
  delete: defineInput('key', 'Delete'),
  f2: defineInput('key', 'F2'),
  a: defineInput('key', 'a'),
  asterisk: defineInput('key', '*'),
  printable: defineInput('key', PRINTABLE),
  of: (name: string) => defineInput('key', name),
  with: withMods,
}

export const nav = {
  forward: defineInput('nav', 'forward'),
  backward: defineInput('nav', 'backward'),
  up: defineInput('nav', 'up'),
  down: defineInput('nav', 'down'),
  first: defineInput('nav', 'first'),
  last: defineInput('nav', 'last'),
  pageForward: defineInput('nav', 'pageForward'),
  pageBackward: defineInput('nav', 'pageBackward'),
}

export const pointer = {
  down: defineInput('pointer', 'down'),
  press: defineInput('pointer', 'press'),
  drag: defineInput('pointer', 'drag'),
  dragOver: defineInput('pointer', 'dragOver'),
  release: defineInput('pointer', 'release'),
  cancel: defineInput('pointer', 'cancel'),
  hover: defineInput('pointer', 'hover'),
  enter: defineInput('pointer', 'enter'),
  leave: defineInput('pointer', 'leave'),
  wheel: defineInput('pointer', 'wheel'),
  spin: defineInput('pointer', 'spin'),
}

export const scroll = {
  move: defineInput('scroll', 'move'),
  end: defineInput('scroll', 'end'),
}

export const layout = {
  resize: defineInput('layout', 'resize'),
  viewport: defineInput('layout', 'viewport'),
}

export const focus = {
  enter: defineInput('focus', 'enter'),
  move: defineInput('focus', 'move'),
  leave: defineInput('focus', 'leave'),
}

export const text = {
  edit: defineInput('text', 'edit'),
  change: defineInput('text', 'change'),
  select: defineInput('text', 'select'),
}

export const measure = {
  done: defineInput('measure', 'done'),
}

export const browser = {
  toggle: defineInput('browser', 'toggle'),
  load: defineInput('browser', 'load'),
  error: defineInput('browser', 'error'),
  cancel: defineInput('browser', 'cancel'),
  close: defineInput('browser', 'close'),
  submit: defineInput('browser', 'submit'),
  reset: defineInput('browser', 'reset'),
  animationEnd: defineInput('browser', 'animationEnd'),
  flushed: defineInput('browser', 'flushed'),
}

export const lifecycle = {
  connect: defineInput('lifecycle', 'connect'),
  options: defineInput('lifecycle', 'options'),
}

export const timer = (name: string) => defineInput('timer', name)

export const command = (name: string) => defineInput('command', name)
