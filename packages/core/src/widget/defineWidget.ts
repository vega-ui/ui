import { InputSpec } from '../input'
import { Part } from '../output'
import { AnyShape, KeyOf, SnapshotOf } from '../state'
import { Step } from '../step'

export interface Invariant<S> {
  check(state: S): boolean
  repair(state: S): S
}

export interface WidgetDefinition<Sh extends AnyShape> {
  readonly state: Sh
  readonly step?: readonly Step<SnapshotOf<Sh>, KeyOf<Sh>>[]
  readonly output?: Readonly<Record<string, Part<SnapshotOf<Sh>, KeyOf<Sh>>>>
  readonly invariants?: Readonly<Record<string, Invariant<SnapshotOf<Sh>>>>
}

export interface Widget<Sh extends AnyShape> {
  readonly shape: Sh
  readonly steps: readonly Step<SnapshotOf<Sh>, KeyOf<Sh>>[]
  readonly listens: readonly InputSpec[]
  readonly output: Readonly<Record<string, Part<SnapshotOf<Sh>, KeyOf<Sh>>>>
  readonly invariants: Readonly<Record<string, Invariant<SnapshotOf<Sh>>>>
}

export const defineWidget = <Sh extends AnyShape>(definition: WidgetDefinition<Sh>): Widget<Sh> => ({
  shape: definition.state,
  steps: definition.step ?? [],
  listens: (definition.step ?? []).flatMap((step) => step.listens ?? []),
  output: definition.output ?? {},
  invariants: definition.invariants ?? {},
})
