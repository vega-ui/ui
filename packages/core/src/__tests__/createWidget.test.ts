import { describe, expect, it, vi } from 'vitest'
import { browser, createInput, key, layout, lifecycle, nav, pointer, text } from '../input'
import { controlled, internal, state } from '../state'
import { simulate } from '../test'
import { createWidget, defineWidget, InvariantError } from '../widget'
import { act, handled, keep, listening } from '../step'
import { fruits, listbox, shape } from './fixtures/listbox'

const forward = createInput<string>(nav.forward)

describe('Critical User Paths', () => {
  it('reports a changed owned value through onChangeX once per transaction and ignores unchanged ones', () => {
    const onChangeActive = vi.fn()
    const onChangeValue = vi.fn()
    const widget = createWidget(listbox, { items: fruits, mode: 'single', onChangeActive, onChangeValue }, { id: 'widget' })

    widget.dispatch(forward)

    expect(onChangeActive).toHaveBeenCalledExactlyOnceWith('apple')
    expect(onChangeValue).not.toHaveBeenCalled()

    widget.setOptions({ items: fruits, mode: 'single', active: 'fig', onChangeActive, onChangeValue })

    expect(widget.state.active).toBe('fig')
    expect(onChangeActive).toHaveBeenCalledOnce()
  })

  it('keeps a reported controlled value until the parent answers with setOptions', () => {
    const onChangeActive = vi.fn()
    const widget = createWidget(listbox, { items: fruits, mode: 'single', active: 'banana', onChangeActive }, { id: 'widget' })
    const before = widget.state.collection

    widget.dispatch(forward)
    expect(onChangeActive).toHaveBeenCalledExactlyOnceWith('date')
    expect(widget.state.active).toBe('date')

    widget.setOptions({ items: fruits, mode: 'single', active: 'banana', onChangeActive })
    expect(widget.state.active).toBe('banana')

    widget.setOptions({ items: fruits, mode: 'single', active: 'date', onChangeActive })
    expect(widget.state.active).toBe('date')
    expect(widget.state.collection).toBe(before)
    expect(onChangeActive).toHaveBeenCalledOnce()
  })

  it('renders a part again only when its selected inputs change', () => {
    const widget = createWidget(listbox, { items: fruits, mode: 'single' }, { id: 'widget' })
    const apple = widget.render(listbox.output.option, 'apple')
    const fig = widget.render(listbox.output.option, 'fig')

    widget.dispatch(forward)

    expect(widget.render(listbox.output.option, 'fig')).toBe(fig)
    expect(widget.render(listbox.output.option, 'apple')).not.toBe(apple)
    expect(widget.render(listbox.output.option, 'apple')).toMatchObject({ 'data-active': true })
  })

  it('hands a changed followed option to the steps and keeps other option changes silent', () => {
    const followed = state({ options: { page: 0, label: '' }, owns: {}, follows: ['page'], internal: { seen: internal([] as number[]) } })
    const pager = defineWidget({
      state: followed,
      step: [(current, input) => (input.is(lifecycle.options) ? keep(followed.seen.set(current, [...current.seen, current.options.page])) : undefined)],
      output: {},
    })
    const widget = createWidget(pager, { page: 0, label: '' }, { id: 'pager' })

    widget.setOptions({ page: 0, label: 'next' })
    widget.setOptions({ page: 2, label: 'next' })

    expect(widget.state.seen).toEqual([2])
  })
})

describe('Error handling', () => {
  it('never reports an owned value from setOptions, and a strict widget refuses a step that changes one on lifecycle.options', () => {
    const counted = state({ options: { page: 0 }, owns: { count: controlled(0) }, follows: ['page'] })
    const counter = defineWidget({
      state: counted,
      step: [(current, input) => (input.is(lifecycle.options) ? keep(counted.count.set(current, current.count + 1)) : undefined)],
      output: {},
    })
    const onChangeCount = vi.fn()
    const widget = createWidget(counter, { page: 0, onChangeCount }, { id: 'counter' })

    widget.setOptions({ page: 1, onChangeCount })

    expect(onChangeCount).not.toHaveBeenCalled()
    expect(() => createWidget(counter, { page: 0 }, { id: 'counter', strict: true }).setOptions({ page: 1 })).toThrow('count')
  })

  it('refuses in a simulation an input the DOM adapter would not deliver, because no step declares it', () => {
    const onlyKeys = defineWidget({ state: shape, step: [listening([key.escape], (state) => handled(state))] })
    const simulation = simulate(onlyKeys, { items: fruits, mode: 'single' })

    expect(() => simulation.send(pointer.press, { key: 'apple' })).toThrow(/does not listen to pointer press/)
    expect(() => simulation.send(key.tab)).toThrow(/does not listen to key Tab/)
    expect(() => simulation.send(key.escape)).not.toThrow()
  })

  it('presses an item in a simulation of a widget that only listens to the press, like the adapter does', () => {
    const onlyPress = defineWidget({ state: shape, step: [listening([pointer.press], (state, input) => handled(shape.active.set(state, input.key as string)))] })

    expect(simulate(onlyPress, { items: fruits, mode: 'single' }).pressAt('fig').state.active).toBe('fig')
  })

  it('refuses in a simulation an input the adapter listens for on the page when no step declares it, like a form reset', () => {
    const onlyKeys = defineWidget({ state: shape, step: [listening([key.escape, browser.reset], (state) => handled(state))] })
    const simulation = simulate(onlyKeys, { items: fruits, mode: 'single' })

    expect(() => simulation.send(layout.resize)).toThrow(/does not listen to layout resize/)
    expect(() => simulation.send(layout.viewport)).toThrow(/does not listen to layout viewport/)
    expect(() => simulation.send(text.select)).toThrow(/does not listen to text select/)
    expect(() => simulation.send(browser.reset)).not.toThrow()
  })

  it('keeps the previous state when a step throws and reports the error outside strict mode', () => {
    const onError = vi.fn()
    const broken = defineWidget({
      state: shape,
      step: [() => { throw new Error('boom') }],
      output: {},
    })
    const widget = createWidget(broken, { items: fruits, mode: 'single', defaultActive: 'apple' }, { id: 'widget', onError })

    const dispatched = widget.dispatch(forward)

    expect(dispatched).toEqual({ answer: 'pass', actions: [] })
    expect(widget.state.active).toBe('apple')
    expect(onError).toHaveBeenCalledOnce()
  })

  it('hands an error a change callback throws to onError, and still notifies the rest and returns the actions', () => {
    const error = new Error('boom')
    const onError = vi.fn()

    const pair = state({ options: {}, owns: { first: controlled(0), second: controlled(0) } })
    const both = defineWidget({
      state: pair,
      step: [(current) => handled(pair.second.set(pair.first.set(current, 1), 1), [act.focusPart('end')])],
      output: {},
    })
    const onChangeSecond = vi.fn()
    const listener = vi.fn()
    const widget = createWidget(both, { onChangeFirst: () => { throw error }, onChangeSecond }, { id: 'pair', onError })
    widget.subscribe(listener)

    expect(widget.dispatch(createInput(nav.forward))).toEqual({ answer: 'handled', actions: [act.focusPart('end')] })
    expect(onError).toHaveBeenCalledExactlyOnceWith(error)
    expect(onChangeSecond).toHaveBeenCalledExactlyOnceWith(1)
    expect(listener).toHaveBeenCalledOnce()
    expect(createWidget(both, { onChangeFirst: () => { throw error } }, { id: 'pair' }).dispatch(createInput(nav.forward)).answer).toBe('handled')
    expect(() => createWidget(both, { onChangeFirst: () => { throw error } }, { id: 'pair', strict: true }).dispatch(createInput(nav.forward))).toThrow(error)
  })

  it('throws on a broken invariant in strict mode, from the first snapshot on, and repairs it otherwise', () => {
    const onRepair = vi.fn()
    expect(() => createWidget(listbox, { items: fruits, mode: 'single', defaultActive: 'cherry' }, { id: 'widget', strict: true })).toThrow(InvariantError)

    const strict = createWidget(listbox, { items: fruits, mode: 'single', defaultActive: 'apple' }, { id: 'widget', strict: true })
    expect(() => strict.setOptions({ items: fruits, mode: 'single', active: 'cherry' })).toThrow(InvariantError)

    const lenient = createWidget(listbox, { items: fruits, mode: 'single', defaultActive: 'cherry' }, { id: 'widget', onRepair })
    expect(lenient.state.active).toBe('apple')
    expect(onRepair).toHaveBeenCalledWith(expect.objectContaining({ invariant: 'activeExists' }))

    lenient.setOptions({ items: fruits.filter((fruit) => fruit.id !== 'apple'), mode: 'single' })
    expect(lenient.state.active).toBe('banana')
  })

  it('never repairs a value the parent controls', () => {
    const onRepair = vi.fn()
    const widget = createWidget(listbox, { items: fruits, mode: 'multiple', value: ['cherry'] }, { id: 'widget', onRepair })

    expect(widget.state.value).toEqual(['cherry'])
    expect(onRepair).toHaveBeenCalledWith(expect.objectContaining({ invariant: 'valueSelectable' }))
  })

  it('keeps the change a step made to a controlled value when another value is repaired in the same commit', () => {
    const flagged = state({ options: {}, owns: { active: controlled('a') }, internal: { broken: internal(false) } })
    const moving = defineWidget({
      state: flagged,
      step: [(current) => keep(flagged.broken.set(flagged.active.set(current, 'b'), true))],
      invariants: { neverBroken: { check: (current) => !current.broken, repair: (current) => flagged.broken.set(current, false) } },
    })
    const onChangeActive = vi.fn()
    const widget = createWidget(moving, { active: 'a', onChangeActive }, { id: 'moving', onRepair: vi.fn() })

    widget.dispatch(createInput(nav.forward))

    expect(widget.state.broken).toBe(false)
    expect(onChangeActive).toHaveBeenCalledExactlyOnceWith('b')
  })
})

describe('Edge Cases', () => {
  it('keeps the snapshot and notifies nobody when new options have the same content', () => {
    const listener = vi.fn()
    const widget = createWidget(listbox, { items: fruits, mode: 'single' }, { id: 'widget' })
    const before = widget.state
    widget.subscribe(listener)

    widget.setOptions({ items: fruits, mode: 'single' })

    expect(widget.state).toBe(before)
    expect(listener).not.toHaveBeenCalled()
  })

  it('starts an owned value from its initial function of the options unless the parent controls it', () => {
    const counted = state({ options: { items: [] as string[] }, owns: { count: controlled(0, ({ items }: { items: string[] }) => (items.length > 0 ? items.length : undefined)) } })
    const counter = defineWidget({ state: counted, step: [], output: {} })

    expect(createWidget(counter, { items: ['a', 'b'] }, { id: 'counter' }).state.count).toBe(2)
    expect(createWidget(counter, { items: ['a', 'b'], count: 5 }, { id: 'counter' }).state.count).toBe(5)
    expect(createWidget(counter, { items: [] }, { id: 'counter' }).state.count).toBe(0)
  })

  it('does not notify or rerun invariants when a step returns the same state', () => {
    const listener = vi.fn()
    const widget = createWidget(defineWidget({ state: shape, step: [(state) => handled(state)], output: {} }), { items: fruits, mode: 'single' }, { id: 'widget' })
    widget.subscribe(listener)

    widget.dispatch(forward)

    expect(listener).not.toHaveBeenCalled()
  })

  it('forgets what it rendered for an item once the item leaves the collection', () => {
    const widget = createWidget(listbox, { items: fruits, mode: 'single' }, { id: 'widget' })
    const apple = widget.render(listbox.output.option, 'apple')
    const fig = widget.render(listbox.output.option, 'fig')
    const root = widget.render(listbox.output.root)

    widget.setOptions({ items: fruits.filter((fruit) => fruit.id !== 'apple'), mode: 'single' })
    widget.setOptions({ items: fruits, mode: 'single' })

    expect(widget.render(listbox.output.option, 'apple')).not.toBe(apple)
    expect(widget.render(listbox.output.option, 'fig')).toBe(fig)
    expect(widget.render(listbox.output.root)).toBe(root)
  })
})
