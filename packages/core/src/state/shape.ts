import { Collection, emptyCollection } from '../collection'
import { Attrs, Channel, Part } from '../output'
import { Field, field, optionReader, OwnedField, ownedField, Reader } from './field'
import { Identified } from './ids'
import { Controlled, Internal, Observed, ValueOf, Values } from './values'

export interface Browser {
  readonly focused: boolean
}

type Capitalized<Name> = Name extends string ? Capitalize<Name> : never

export type ControlledOptions<Owned> = { readonly [Name in keyof Owned]?: ValueOf<Owned[Name]> } & {
  readonly [Name in keyof Owned as `default${Capitalized<Name>}`]?: ValueOf<Owned[Name]>
} & {
  readonly [Name in keyof Owned as `onChange${Capitalized<Name>}`]?: (value: ValueOf<Owned[Name]>) => void
}

export type Options<OptionValues, Owned> = OptionValues & ControlledOptions<Owned>

export type Snapshot<OptionValues, Owned, Internals, Key, Observes = Record<never, never>, PartName extends string = string> = {
  readonly options: Options<OptionValues, Owned>
  readonly collection: Collection<Key>
  readonly timers: ReadonlyMap<string, number>
  readonly __part?: PartName
} & Identified & Browser & Values<Owned> & Values<Internals> & Values<Observes>

type Fields<State, Value> = { readonly [Name in keyof Value]: Field<State, Value[Name]> }
type OwnedFields<State, Value> = { readonly [Name in keyof Value]: OwnedField<State, Value[Name]> }
type Readers<State, Value> = { readonly [Name in keyof Value]: Reader<State, Value[Name]> }

export interface StateDefinition<OptionValues, Owned, Internals, Key, Observes, PartName extends string> {
  readonly options: OptionValues
  readonly owns: Owned
  readonly follows?: readonly (keyof OptionValues & string)[]
  readonly internal?: Internals
  readonly observes?: Observes
  readonly collection?: (options: OptionValues) => Collection<Key>
  readonly parts?: readonly PartName[]
}

export type ObservedValues = Readonly<Record<string, unknown>>

export interface ShapeMethods<OptionValues, Owned, Internals, Key, Observes, PartName extends string = string> {
  readonly options: Readers<Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>, OptionValues>
  readonly owned: readonly string[]
  readonly followed: readonly string[]
  readonly observed: Readonly<Record<string, Observed<unknown>>>
  part<const Selected extends readonly unknown[], Rendered extends Attrs>(select: (state: Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>, key: Key) => Selected, render: (selected: Selected) => Rendered): Channel<Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>, Key, Rendered>
  create(options: Options<OptionValues, Owned>, id: string): Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>
  sync(state: Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>, options: Options<OptionValues, Owned>): Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>
  observe(state: Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>, values: ObservedValues): Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>
  restore(repaired: Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>, before: Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>): Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>
  readonly __snapshot: Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>
  readonly __key: Key
}

export type Shape<OptionValues, Owned, Internals, Key, Observes, PartName extends string = string> = OwnedFields<Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>, Values<Owned>> &
  Fields<Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>, Values<Internals>> &
  Readers<Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>, Values<Observes>> &
  ShapeMethods<OptionValues, Owned, Internals, Key, Observes, PartName>

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

export type SnapshotOf<WidgetShape> = WidgetShape extends { __snapshot: infer State } ? State : never
export type KeyOf<WidgetShape> = WidgetShape extends { __key: infer Key } ? Key : never
export type PartOfState<State> = State extends { readonly __part?: infer PartName } ? Exclude<PartName, undefined> & string : string
export type PartOf<WidgetShape> = PartOfState<SnapshotOf<WidgetShape>>
export type OptionsOf<WidgetShape> = WidgetShape extends { __snapshot: { options: infer OptionValues } } ? OptionValues : never

export const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

type Mutable = Record<string, unknown>

type Reserved = keyof AnySnapshot | keyof ShapeMethods<object, object, object, unknown, object>
type Free<Taken> = { readonly [Name in Taken & string]?: never }

export const state = <
  OptionValues extends object,
  Owned extends Record<string, Controlled<unknown>> & Free<Reserved | keyof OptionValues>,
  Internals extends Record<string, Internal<unknown>> & Free<Reserved | keyof Owned> = Record<never, never>,
  Key = never,
  Observes extends Record<string, Observed<unknown>> & Free<Reserved | keyof Owned | keyof Internals> = Record<never, never>,
  const PartName extends string = string,
>(definition: StateDefinition<OptionValues, Owned, Internals, Key, Observes, PartName>): Shape<OptionValues, Owned, Internals, Key, Observes, PartName> => {
  type State = Snapshot<OptionValues, Owned, Internals, Key, Observes, PartName>

  const owns = definition.owns
  const internal: Readonly<Record<string, Internal<unknown>>> = definition.internal ?? {}
  const observes: Readonly<Record<string, Observed<unknown>>> = definition.observes ?? {}
  const empty = emptyCollection<Key>()
  const collectionOf = definition.collection ?? (() => empty)

  const read = (options: Options<OptionValues, Owned>, name: string) => (options as Mutable)[name]

  const controlledValue = (options: Options<OptionValues, Owned>, name: string) => {
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

  const patched = (current: State, patch: Mutable): State => {
    const same = Object.keys(patch).every((name) => Object.is((current as Mutable)[name], patch[name]))
    if (same) return current

    return { ...current, ...patch }
  }

  const shape = {} as Mutable

  for (const name in owns) shape[name] = ownedField<State, unknown>(name)
  for (const name in internal) shape[name] = field<State, unknown>(name)
  for (const name in observes) shape[name] = field<State, unknown>(name)

  const options = {} as Record<string, Reader<State, unknown>>
  for (const name in definition.options) options[name] = optionReader<State, unknown>(name)

  const methods: ShapeMethods<OptionValues, Owned, Internals, Key, Observes, PartName> = {
    options: options as Readers<State, OptionValues>,
    owned: Object.keys(owns),
    followed: definition.follows ?? [],
    observed: observes,

    part: (select, render) => ({ select, render: render as (selected: readonly unknown[]) => ReturnType<typeof render> }),

    create(initial, id) {
      const created = { options: initial, collection: collectionOf(initial), id, timers: new Map<string, number>(), focused: false } as Mutable

      for (const name in owns) created[name] = controlledValue(initial, name)
      for (const name in internal) created[name] = internal[name].fallback
      for (const name in observes) created[name] = observes[name].fallback

      return created as State
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

    __snapshot: undefined as unknown as State,
    __key: undefined as unknown as Key,
  }

  return Object.assign(shape, methods) as Shape<OptionValues, Owned, Internals, Key, Observes, PartName>
}
