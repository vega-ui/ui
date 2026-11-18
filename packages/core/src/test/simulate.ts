import { createInput, Input, InputSpec, Orientation, Payload, pointer, readsCrossAxis, toNav } from '../input'
import { AnyShape, KeyOf, ObservedValues, OptionsOf, SnapshotOf } from '../state'
import { Action, Answer } from '../step'
import { createWidget, Widget } from '../widget'
import { hears } from '../dom/sources'

export interface Simulation<WidgetShape extends AnyShape> {
  readonly state: SnapshotOf<WidgetShape>
  readonly answer: Answer | 'pass'
  readonly actions: readonly Action[]
  send(spec: InputSpec | Input<KeyOf<WidgetShape>>, payload?: Payload<KeyOf<WidgetShape>>): Simulation<WidgetShape>
  setOptions(options: OptionsOf<WidgetShape>): Simulation<WidgetShape>
  observe(values: ObservedValues): Simulation<WidgetShape>
  pressAt(key: KeyOf<WidgetShape>): Simulation<WidgetShape>
  type(text: string): Simulation<WidgetShape>
}

export interface SimulationEnvironment {
  readonly orientation?: Orientation
  readonly rtl?: boolean
}

const isInput = <Key>(spec: InputSpec | Input<Key>): spec is Input<Key> => 'is' in spec

export const simulate = <WidgetShape extends AnyShape>(widget: Widget<WidgetShape>, options: OptionsOf<WidgetShape>, environment: SimulationEnvironment = {}): Simulation<WidgetShape> => {
  const instance = createWidget(widget, options, { id: 'widget', strict: true })
  const direction = { orientation: environment.orientation ?? 'vertical', rtl: environment.rtl ?? false, cross: readsCrossAxis(widget.listens) }

  let last: { answer: Answer | 'pass'; actions: readonly Action[] } = { answer: 'pass', actions: [] }

  const simulation: Simulation<WidgetShape> = {
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
