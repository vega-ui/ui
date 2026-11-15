import { createInput, Input, InputSpec, Orientation, Payload, pointer, toNav } from '../input'
import { AnyShape, KeyOf, ObservedValues, OptionsOf, SnapshotOf } from '../state'
import { Action, Answer } from '../step'
import { createWidget, Widget } from '../widget'
import { hears } from '../dom/sources'

export interface Simulation<Sh extends AnyShape> {
  readonly state: SnapshotOf<Sh>
  readonly answer: Answer | 'pass'
  readonly actions: readonly Action[]
  send(spec: InputSpec | Input<KeyOf<Sh>>, payload?: Payload<KeyOf<Sh>>): Simulation<Sh>
  setOptions(options: OptionsOf<Sh>): Simulation<Sh>
  observe(values: ObservedValues): Simulation<Sh>
  pressAt(key: KeyOf<Sh>): Simulation<Sh>
  type(text: string): Simulation<Sh>
}

export interface SimulationEnvironment {
  readonly orientation?: Orientation
  readonly rtl?: boolean
}

const isInput = <K>(spec: InputSpec | Input<K>): spec is Input<K> => 'is' in spec

export const simulate = <Sh extends AnyShape>(widget: Widget<Sh>, options: OptionsOf<Sh>, environment: SimulationEnvironment = {}): Simulation<Sh> => {
  const instance = createWidget(widget, options, { id: 'widget', strict: true })
  const direction = { orientation: environment.orientation ?? 'vertical', rtl: environment.rtl ?? false }

  let last: { answer: Answer | 'pass'; actions: readonly Action[] } = { answer: 'pass', actions: [] }

  const simulation: Simulation<Sh> = {
    get state() {
      return instance.state
    },
    get answer() {
      return last.answer
    },
    get actions() {
      return last.actions
    },

    send(spec, payload) {
      const input = isInput(spec) ? spec : createInput(spec, payload)
      if (!hears(widget.listens, input, direction.orientation)) throw new Error(`The widget does not listen to ${input.type} ${input.name}: no step declares it`)

      last = instance.dispatch(toNav(input, direction))
      return simulation
    },

    setOptions(next) {
      last = instance.setOptions(next)
      return simulation
    },

    observe(values) {
      instance.observe(values)
      return simulation
    },

    pressAt(key) {
      const down = createInput(pointer.down, { key })
      if (hears(widget.listens, down, direction.orientation)) simulation.send(down)

      return simulation.send(pointer.press, { key })
    },

    type(text) {
      for (const char of text) simulation.send({ type: 'key', name: char, mods: new Set() }, { char })
      return simulation
    },
  }

  return simulation
}
