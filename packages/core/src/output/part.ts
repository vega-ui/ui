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

export interface Channel<S, K, V> {
  select(state: S, key: K): readonly unknown[]
  render(selected: readonly unknown[]): V
}

export interface Part<S, K> {
  select(state: S, key: K): readonly unknown[]
  render(selected: readonly unknown[]): Attrs
  readonly props?: Channel<S, K, Properties>
  readonly live?: Channel<S, K, LiveValues>
}

export interface Rendered {
  readonly selected: readonly unknown[]
  readonly attrs: Attrs
}

export const sameSelection = (previous: readonly unknown[], next: readonly unknown[]) => previous.length === next.length && previous.every((item, position) => Object.is(item, next[position]))

export const renderPart = <S, K>(part: Part<S, K>, state: S, key: K, previous?: Rendered): Rendered => {
  const selected = part.select(state, key)
  if (previous && sameSelection(previous.selected, selected)) return previous

  return { selected, attrs: part.render(selected) }
}
