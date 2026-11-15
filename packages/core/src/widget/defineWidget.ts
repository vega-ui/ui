import { InputSpec } from '../input'
import { Part } from '../output'
import { AnyShape, KeyOf, SnapshotOf } from '../state'
import { Step } from '../step'

export interface Invariant<State> {
  check(state: State): boolean
  repair(state: State, before: State): State
}

export type OutputOf<WidgetShape extends AnyShape> = Readonly<Record<string, Part<SnapshotOf<WidgetShape>, KeyOf<WidgetShape>>>>

export interface WidgetDefinition<WidgetShape extends AnyShape, Output extends OutputOf<WidgetShape> = OutputOf<WidgetShape>> {
  readonly state: WidgetShape
  readonly step?: readonly Step<SnapshotOf<WidgetShape>, KeyOf<WidgetShape>>[]
  readonly output?: Output
  readonly invariants?: Readonly<Record<string, Invariant<SnapshotOf<WidgetShape>>>>
}

export interface Widget<WidgetShape extends AnyShape, Output extends OutputOf<WidgetShape> = OutputOf<WidgetShape>> {
  readonly shape: WidgetShape
  readonly steps: readonly Step<SnapshotOf<WidgetShape>, KeyOf<WidgetShape>>[]
  readonly listens: readonly InputSpec[]
  readonly output: Output
  readonly invariants: Readonly<Record<string, Invariant<SnapshotOf<WidgetShape>>>>
}

export const defineWidget = <WidgetShape extends AnyShape, Output extends OutputOf<WidgetShape> = Record<never, never>>(definition: WidgetDefinition<WidgetShape, Output>): Widget<WidgetShape, Output> => ({
  shape: definition.state,
  steps: definition.step ?? [],
  listens: (definition.step ?? []).flatMap((step) => step.listens ?? []),
  output: definition.output ?? ({} as Output),
  invariants: definition.invariants ?? {},
})
