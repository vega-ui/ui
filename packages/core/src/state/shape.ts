import { Collection, emptyCollection } from '../collection'
import { Attrs, Part } from '../output'
import { Field, field, optionReader, OwnedField, ownedField, Reader } from './field'
import { Identified } from './ids'
import { Controlled, Internal, Observed, ValueOf, Values } from './values'

export interface Browser {
  readonly focused: boolean
}

type Capitalized<N> = N extends string ? Capitalize<N> : never

export type ControlledOptions<W> = { readonly [N in keyof W]?: ValueOf<W[N]> } & {
  readonly [N in keyof W as `default${Capitalized<N>}`]?: ValueOf<W[N]>
} & {
  readonly [N in keyof W as `onChange${Capitalized<N>}`]?: (value: ValueOf<W[N]>) => void
}

export type Options<O, W> = O & ControlledOptions<W>

export type Snapshot<O, W, I, K, B = Record<never, never>> = {
  readonly options: Options<O, W>
  readonly collection: Collection<K>
  readonly timers: ReadonlyMap<string, number>
} & Identified & Browser & Values<W> & Values<I> & Values<B>

type Fields<S, V> = { readonly [N in keyof V]: Field<S, V[N]> }
type OwnedFields<S, V> = { readonly [N in keyof V]: OwnedField<S, V[N]> }
type Readers<S, V> = { readonly [N in keyof V]: Reader<S, V[N]> }

export interface StateDefinition<O, W, I, K, B> {
  readonly options: O
  readonly owns: W
  readonly follows?: readonly (keyof O & string)[]
  readonly internal?: I
  readonly observes?: B
  readonly collection?: (options: O) => Collection<K>
}

export type ObservedValues = Readonly<Record<string, unknown>>

export interface ShapeMethods<O, W, I, K, B> {
  readonly options: Readers<Snapshot<O, W, I, K, B>, O>
  readonly owned: readonly string[]
  readonly followed: readonly string[]
  readonly observed: Readonly<Record<string, Observed<unknown>>>
  part<const T extends readonly unknown[]>(select: (state: Snapshot<O, W, I, K, B>, key: K) => T, render: (selected: T) => Attrs): Part<Snapshot<O, W, I, K, B>, K>
  create(options: Options<O, W>, id: string): Snapshot<O, W, I, K, B>
  sync(state: Snapshot<O, W, I, K, B>, options: Options<O, W>): Snapshot<O, W, I, K, B>
  observe(state: Snapshot<O, W, I, K, B>, values: ObservedValues): Snapshot<O, W, I, K, B>
  restore(repaired: Snapshot<O, W, I, K, B>, before: Snapshot<O, W, I, K, B>): Snapshot<O, W, I, K, B>
  readonly __snapshot: Snapshot<O, W, I, K, B>
  readonly __key: K
}

export type Shape<O, W, I, K, B> = OwnedFields<Snapshot<O, W, I, K, B>, Values<W>> &
  Fields<Snapshot<O, W, I, K, B>, Values<I>> &
  Readers<Snapshot<O, W, I, K, B>, Values<B>> &
  ShapeMethods<O, W, I, K, B>

export type AnySnapshot = Snapshot<object, Record<never, never>, Record<never, never>, unknown>

export interface AnyShape {
  readonly owned: readonly string[]
  readonly followed: readonly string[]
  readonly observed: Readonly<Record<string, Observed<unknown>>>
  part(select: unknown, render: unknown): Part<AnySnapshot, unknown>
  create(options: unknown, id: string): AnySnapshot
  sync(state: unknown, options: unknown): AnySnapshot
  observe(state: unknown, values: ObservedValues): AnySnapshot
  restore(repaired: unknown, before: unknown): AnySnapshot
  readonly __snapshot: AnySnapshot
  readonly __key: unknown
}

export type SnapshotOf<Sh> = Sh extends { __snapshot: infer S } ? S : never
export type KeyOf<Sh> = Sh extends { __key: infer K } ? K : never
export type OptionsOf<Sh> = Sh extends { __snapshot: { options: infer O } } ? O : never

export const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

type Mutable = Record<string, unknown>

type Reserved = keyof AnySnapshot | keyof ShapeMethods<object, object, object, unknown, object>
type Free<Taken> = { readonly [N in Taken & string]?: never }

export const state = <
  O extends object,
  W extends Record<string, Controlled<unknown>> & Free<Reserved | keyof O>,
  I extends Record<string, Internal<unknown>> & Free<Reserved | keyof W> = Record<never, never>,
  K = never,
  B extends Record<string, Observed<unknown>> & Free<Reserved | keyof W | keyof I> = Record<never, never>,
>(definition: StateDefinition<O, W, I, K, B>): Shape<O, W, I, K, B> => {
  type S = Snapshot<O, W, I, K, B>

  const owns = definition.owns
  const internal: Readonly<Record<string, Internal<unknown>>> = definition.internal ?? {}
  const observes: Readonly<Record<string, Observed<unknown>>> = definition.observes ?? {}
  const empty = emptyCollection<K>()
  const collectionOf = definition.collection ?? (() => empty)

  const read = (options: Options<O, W>, name: string) => (options as Mutable)[name]

  const controlledValue = (options: Options<O, W>, name: string) => {
    const value = read(options, name)
    if (value !== undefined) return value

    const { initial, fallback } = owns[name]
    const start = initial ? initial(options as never) : read(options, `default${capitalize(name)}`)
    if (start !== undefined) return start

    return fallback
  }

  const sameEntries = (previous: object, next: object) => {
    const names = Object.keys(next)
    if (names.length !== Object.keys(previous).length) return false

    return names.every((name) => Object.is((previous as Mutable)[name], (next as Mutable)[name]))
  }

  const patched = (current: S, patch: Mutable): S => {
    const same = Object.keys(patch).every((name) => Object.is((current as Mutable)[name], patch[name]))
    if (same) return current

    return { ...current, ...patch }
  }

  const shape = {} as Mutable

  for (const name in owns) shape[name] = ownedField<S, unknown>(name)
  for (const name in internal) shape[name] = field<S, unknown>(name)
  for (const name in observes) shape[name] = field<S, unknown>(name)

  const options = {} as Record<string, Reader<S, unknown>>
  for (const name in definition.options) options[name] = optionReader<S, unknown>(name)

  const methods: ShapeMethods<O, W, I, K, B> = {
    options: options as Readers<S, O>,
    owned: Object.keys(owns),
    followed: definition.follows ?? [],
    observed: observes,

    part: (select, render) => ({ select, render: render as (selected: readonly unknown[]) => Attrs }),

    create(initial, id) {
      const created = { options: initial, collection: collectionOf(initial), id, timers: new Map<string, number>(), focused: false } as Mutable

      for (const name in owns) created[name] = controlledValue(initial, name)
      for (const name in internal) created[name] = internal[name].fallback
      for (const name in observes) created[name] = observes[name].fallback

      return created as S
    },

    sync(current, next) {
      const options = sameEntries(current.options, next) ? current.options : next
      const patch: Mutable = { options, collection: collectionOf(options) }

      for (const name in owns) {
        const value = read(options, name)
        if (value !== undefined) patch[name] = value
      }

      return patched(current, patch)
    },

    observe(current, values) {
      const patch: Mutable = {}

      for (const name in values) {
        if (name === 'focused' || name in observes) patch[name] = values[name]
      }

      return patched(current, patch)
    },

    restore(repaired, before) {
      const patch: Mutable = {}

      for (const name in owns) {
        if (read(before.options, name) !== undefined) patch[name] = (before as Mutable)[name]
      }

      return patched(repaired, patch)
    },

    __snapshot: undefined as unknown as S,
    __key: undefined as unknown as K,
  }

  return Object.assign(shape, methods) as Shape<O, W, I, K, B>
}
