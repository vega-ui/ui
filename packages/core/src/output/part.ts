export type Attrs = Readonly<Record<string, unknown>>

export interface ValidationAttributes {
  readonly type?: string
  readonly value?: string
  readonly min?: string
  readonly max?: string
  readonly pattern?: string
  readonly required?: boolean
}

export type Properties = Readonly<Record<string, unknown>> & {
  readonly value?: never
  readonly checked?: never
  readonly open?: never
  readonly selected?: never
}

export type LiveValues = Readonly<Record<string, string | number | boolean | undefined>>

export interface Channel<State, Key, Value> {
  select(state: State, key: Key): readonly unknown[]
  render(selected: readonly unknown[]): Value
}

export interface Part<State, Key> {
  select(state: State, key: Key): readonly unknown[]
  render(selected: readonly unknown[]): Attrs
  readonly props?: Channel<State, Key, Properties>
  readonly live?: Channel<State, Key, LiveValues>
}

export interface Rendered {
  readonly selected: readonly unknown[]
  readonly attrs: Attrs
}

export const sameSelection = (previous: readonly unknown[], next: readonly unknown[]) => previous.length === next.length && previous.every((item, position) => Object.is(item, next[position]))

export const renderPart = <State, Key>(part: Part<State, Key>, state: State, key: Key, previous?: Rendered): Rendered => {
  const selected = part.select(state, key)
  if (previous && sameSelection(previous.selected, selected)) return previous

  return { selected, attrs: part.render(selected) }
}
