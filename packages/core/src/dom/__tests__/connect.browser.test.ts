import { afterEach, describe, expect, it, vi } from 'vitest'
import { connect, createElements } from '..'
import { act } from '../../step'
import { createWidget, defineWidget } from '../../widget'
import { handled, keep, listening } from '../../step'
import { browser, command, createInput, focus, key, layout, Measured, measure, nav, pointer as pointerInput, scroll, text, TextState } from '../../input'
import { fruits, listbox, shape } from '../../__tests__/fixtures/listbox'
import { Part } from '../../output'
import { emptyCollection } from '../../collection'
import { internal, reading, state } from '../../state'

type Options = Parameters<typeof shape.create>[0]

const mount = (options: Options, parent: Element = document.body) => {
  const root = document.createElement('div')
  root.tabIndex = 0
  parent.appendChild(root)

  const elements = createElements<string>()
  elements.setRoot(root)

  const items = new Map<string, HTMLElement>()
  for (const fruit of fruits) {
    const option = document.createElement('div')
    option.textContent = fruit.label
    root.appendChild(option)
    elements.setItem(fruit.id, option)
    items.set(fruit.id, option)
  }

  const instance = createWidget(listbox, options, { id: 'widget', strict: true })
  const connection = connect(instance, elements)
  const stop = connection.listen(root)

  return { root, items, instance, connection, elements, stop }
}

const keydown = (target: Element, init: KeyboardEventInit) => {
  const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init })
  target.dispatchEvent(event)
  return event
}

const click = (target: Element, detail = 1) => {
  const event = new MouseEvent('click', { bubbles: true, cancelable: true, detail })
  target.dispatchEvent(event)
  return event
}

const pointer = (target: EventTarget, type: string, init: PointerEventInit = {}) => {
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 1, buttons: 1, ...init }))
}

afterEach(() => {
  document.body.replaceChildren()
  vi.useRealTimers()
})

describe('Critical User Paths', () => {
  it('turns a key on the root into an input, prevents its default when handled and leaves unknown keys alone', () => {
    const { root, instance } = mount({ items: fruits, mode: 'single', defaultActive: 'apple' })

    const down = keydown(root, { key: 'ArrowDown' })
    expect(instance.state.active).toBe('banana')
    expect(down.defaultPrevented).toBe(true)

    const tab = keydown(root, { key: 'Tab' })
    expect(tab.defaultPrevented).toBe(false)
  })

  it('selects the option under the pointer on press and activates it on pointer down', () => {
    const { items, instance } = mount({ items: fruits, mode: 'multiple' })

    pointer(items.get('date')!, 'pointerdown')
    expect(instance.state.active).toBe('date')

    pointer(document, 'pointerup', { buttons: 0 })
    click(items.get('date')!)
    expect(instance.state.value).toEqual(['date'])
  })

  it('reports focus entering and leaving the root', () => {
    const { root, instance } = mount({ items: fruits, mode: 'single' })
    const outside = document.createElement('button')
    document.body.appendChild(outside)

    root.focus()
    expect(instance.state.focused).toBe(true)
    expect(instance.state.active).toBe('apple')

    outside.focus()
    expect(instance.state.focused).toBe(false)
  })

  it('tells every widget the focus leaves, the outer one too when the inner one handles its leaving', () => {
    const outer = mount({ items: fruits, mode: 'single' })
    const inner = document.createElement('div')
    inner.tabIndex = -1
    outer.root.appendChild(inner)
    const outside = document.createElement('button')
    document.body.appendChild(outside)

    const elements = createElements<string>()
    elements.setRoot(inner)
    const leaving = defineWidget({
      state: shape,
      step: [listening([focus.leave], (state, input) => (input.is(focus.leave) ? keep(state) : undefined))],
    })
    const instance = createWidget(leaving, { items: fruits, mode: 'single' }, { id: 'inner', strict: true })
    connect(instance, elements).listen(inner)

    outer.root.focus()
    inner.focus()
    outside.focus()
    expect(instance.state.focused).toBe(false)
    expect(outer.instance.state.focused).toBe(false)
  })

  it('runs a timer action and feeds its firing back as an input', () => {
    vi.useFakeTimers()
    const { root, instance } = mount({ items: fruits, mode: 'single' })

    keydown(root, { key: 'd' })
    expect(instance.state.typed).toBe('d')
    expect(instance.state.active).toBe('date')

    vi.advanceTimersByTime(600)
    expect(instance.state.typed).toBe('')
    expect(instance.state.timers.size).toBe(0)
  })

  it('names the part a key came from', () => {
    const { root, elements } = mount({ items: fruits, mode: 'single' })
    const trigger = document.createElement('button')
    root.appendChild(trigger)
    elements.setPart('trigger', trigger)

    const parts: (string | undefined)[] = []
    const watching = defineWidget({
      state: shape,
      step: [listening([key.tab], (state, input) => {
        if (!input.is(key.tab)) return undefined

        parts.push(input.part)
        return handled(state)
      })],
    })
    connect(createWidget(watching, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements).listen(trigger)

    keydown(trigger, { key: 'Tab' })
    expect(parts).toEqual(['trigger'])
  })

  it('delivers an input to the widget whose root is a part of another widget', () => {
    const outer = document.createElement('div')
    document.body.appendChild(outer)
    const inner = mount({ items: fruits, mode: 'single' }, outer)

    const elements = createElements<string>()
    elements.setRoot(outer)
    elements.setPart('inner', inner.root)

    const sending = defineWidget({
      state: shape,
      step: [listening([key.escape], (state, input) => (input.is(key.escape) ? handled(state, [act.send('inner', key.printable, { char: 'd' })]) : undefined))],
    })
    connect(createWidget(sending, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements).listen(outer)

    keydown(outer, { key: 'Escape' })
    expect(inner.instance.state.active).toBe('date')
  })

  it('delivers an input to the widget whose root is an item or holds it, and to no one for an item outside other widgets', () => {
    const outer = document.createElement('div')
    document.body.appendChild(outer)
    const inner = mount({ items: fruits, mode: 'single' }, outer)
    const nested = document.createElement('div')
    inner.root.appendChild(nested)
    const plain = document.createElement('div')
    outer.appendChild(plain)

    const elements = createElements<string>()
    elements.setRoot(outer)
    elements.setItem('nested', nested)
    elements.setItem('plain', plain)

    const PING = command('ping')
    const sending = defineWidget({
      state: shape,
      step: [listening([PING], (state, input) => (input.is(PING) && input.key !== undefined ? handled(state, [act.sendAt(input.key, key.printable, { char: 'd' })]) : undefined))],
    })
    const connection = connect(createWidget(sending, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)

    connection.send(createInput(PING, { key: 'plain' }))
    expect(inner.instance.state.active).toBe(null)

    connection.send(createInput(PING, { key: 'nested' }))
    expect(inner.instance.state.active).toBe('date')
  })

  it('delivers an input from a part to the nearest widget around it', () => {
    const outer = mount({ items: fruits, mode: 'single' })
    const handle = document.createElement('div')
    outer.root.appendChild(handle)

    const elements = createElements<never>()
    elements.setRoot(handle, 'handle')

    const PING = command('ping')
    const sending = defineWidget({
      state: state({ options: {}, owns: {}, parts: ['handle'] }),
      step: [listening([PING], (current, input) => (input.is(PING) ? handled(current, [act.sendUp('handle', key.printable, { char: 'd' })]) : undefined))],
    })
    const connection = connect(createWidget(sending, {}, { id: 'sending', strict: true }), elements)

    connection.send(createInput(PING))
    expect(outer.instance.state.active).toBe('date')
  })

  it('asks for a context menu with the point and the part, and keeps the menu of the browser away only when a step handles it', () => {
    const area = document.createElement('div')
    const inner = document.createElement('span')
    area.appendChild(inner)
    document.body.appendChild(area)

    const elements = createElements<never>()
    elements.setRoot(area, 'area')

    const inputs: unknown[] = []
    const asking = defineWidget({
      state: state({ options: {}, owns: {}, parts: ['area'] }),
      step: [listening([browser.contextMenu], (current, input) => {
        if (!input.is(browser.contextMenu)) return undefined
        inputs.push([input.part, input.point])
        return input.point?.x === 10 ? handled(current) : undefined
      })],
    })
    connect(createWidget(asking, {}, { id: 'asking', strict: true }), elements).listen(area)

    const handledMenu = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 10, clientY: 20 })
    inner.dispatchEvent(handledMenu)
    const passedMenu = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 30, clientY: 40 })
    inner.dispatchEvent(passedMenu)

    expect(inputs).toEqual([['area', { x: 10, y: 20 }], ['area', { x: 30, y: 40 }]])
    expect(handledMenu.defaultPrevented).toBe(true)
    expect(passedMenu.defaultPrevented).toBe(false)
  })

  it('writes the live values and the properties of a part itself, without a render, and only when what they read changes', () => {
    const { root, items, elements } = mount({ items: fruits, mode: 'multiple', defaultActive: 'apple' })
    const mixed = document.createElement('input')
    mixed.type = 'checkbox'
    root.appendChild(mixed)

    const option: Part<unknown, string> = {
      ...listbox.output.option,
      live: {
        select: (state, key) => [(state as typeof shape.__snapshot).active === key],
        render: ([active]) => ({ '--option-shift': active ? '4px' : undefined, 'data-current': active === true }),
      },
    }
    const all: Part<unknown, string> = {
      ...listbox.output.root,
      props: {
        select: (state) => [(state as typeof shape.__snapshot).value.length],
        render: ([count]) => ({ indeterminate: count === 1 }),
      },
    }
    for (const fruit of fruits) elements.setItem(fruit.id, items.get(fruit.id)!, undefined, option)
    elements.setPart('all', mixed, all)

    keydown(root, { key: 'ArrowDown' })
    expect(items.get('banana')!.style.getPropertyValue('--option-shift')).toBe('4px')
    expect(items.get('banana')!.hasAttribute('data-current')).toBe(true)
    expect(items.get('apple')!.style.getPropertyValue('--option-shift')).toBe('')
    expect(items.get('apple')!.hasAttribute('data-current')).toBe(false)
    expect(mixed.indeterminate).toBe(false)

    keydown(root, { key: ' ' })
    expect(mixed.indeterminate).toBe(true)

    mixed.indeterminate = false
    keydown(root, { key: 'ArrowDown' })
    expect(mixed.indeterminate).toBe(false)
  })

  it('measures the parts and the items a step asks for after the actions and answers with plain numbers', async () => {
    const { root, items, elements } = mount({ items: fruits, mode: 'single' })
    for (const fruit of fruits) items.get(fruit.id)!.style.height = '10px'
    elements.setPart('list', root)

    const answers: Measured<string>[] = []
    const measuring = defineWidget({
      state: shape,
      step: [listening([key.enter], (state, input) => {
        if (input.is(key.enter)) return handled(state, [act.measure({ name: 'lane', parts: ['list', 'missing'], items: ['banana', 'gone'], rect: true, styles: ['height'] })])
        if (input.is(measure.done) && input.measured) answers.push(input.measured)
        return undefined
      })],
    })
    connect(createWidget(measuring, { items: fruits, mode: 'single' }, { id: 'measuring', strict: true }), elements).listen(root)

    keydown(root, { key: 'Enter' })
    expect(answers).toEqual([])
    await Promise.resolve()

    const banana = items.get('banana')!.getBoundingClientRect()
    expect(answers).toEqual([{
      name: 'lane',
      parts: { list: { rect: expect.objectContaining({ height: root.getBoundingClientRect().height }), styles: { height: `${root.getBoundingClientRect().height}px` } } },
      items: [['banana', { rect: { x: banana.x, y: banana.y, width: banana.width, height: 10 }, styles: { height: '10px' } }]],
    }])
  })

  it('answers once the animations of a part have finished', async () => {
    const { root, elements } = mount({ items: fruits, mode: 'single' })
    const panel = document.createElement('div')
    root.appendChild(panel)
    elements.setPart('panel', panel)

    const ended: (string | undefined)[] = []
    const waiting = defineWidget({
      state: shape,
      step: [listening([key.escape], (state, input) => {
        if (input.is(key.escape)) return handled(state, [act.awaitAnimations('panel')])
        if (input.is(browser.animationEnd)) ended.push(input.part)
        return undefined
      })],
    })
    connect(createWidget(waiting, { items: fruits, mode: 'single' }, { id: 'waiting', strict: true }), elements).listen(root)

    const fading = panel.animate([{ opacity: 1 }, { opacity: 0 }], 100)
    fading.pause()
    keydown(root, { key: 'Escape' })
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(ended).toEqual([])

    fading.finish()
    await vi.waitFor(() => expect(ended).toEqual(['panel']))
  })

  it('takes the events of a second root apart from the first, like a popover in the top layer, with the focus between them staying inside', () => {
    const trigger = document.createElement('button')
    const content = document.createElement('div')
    content.tabIndex = -1
    const outside = document.createElement('button')
    document.body.append(trigger, content, outside)

    const elements = createElements<string>()
    elements.setRoot(trigger, 'trigger')
    elements.setRoot(content, 'content')

    const inputs: (string | undefined)[][] = []
    const recording = defineWidget({
      state: shape,
      step: [listening([key.escape, focus.leave], (state, input) => {
        inputs.push([input.name, input.part])
        return keep(state)
      })],
    })
    const connection = connect(createWidget(recording, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    connection.listen(trigger)
    connection.listen(content)

    trigger.focus()
    content.focus()
    keydown(content, { key: 'Escape' })
    outside.focus()

    expect(inputs).toEqual([['enter', 'trigger'], ['move', 'content'], ['Escape', 'content'], ['leave', undefined]])
  })

  it('reports the pointer entering and leaving a part once, with the part it moves to and the pointer type', () => {
    const trigger = document.createElement('button')
    const icon = document.createElement('span')
    trigger.appendChild(icon)
    const content = document.createElement('div')
    document.body.append(trigger, content)

    const elements = createElements<string>()
    elements.setRoot(trigger, 'trigger')
    elements.setRoot(content, 'content')

    const inputs: unknown[][] = []
    const recording = defineWidget({
      state: shape,
      step: [listening([pointerInput.enter, pointerInput.leave], (state, input) => {
        inputs.push([input.name, input.part, input.to, input.pointerType, input.point])
        return keep(state)
      })],
    })
    const connection = connect(createWidget(recording, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    connection.listen(trigger)
    connection.listen(content)

    pointer(trigger, 'pointerover', { pointerType: 'mouse', relatedTarget: document.body })
    pointer(trigger, 'pointerout', { pointerType: 'mouse', relatedTarget: icon })
    pointer(icon, 'pointerover', { pointerType: 'mouse', relatedTarget: trigger })
    pointer(icon, 'pointerout', { pointerType: 'mouse', relatedTarget: content, clientX: 40, clientY: 12 })
    pointer(content, 'pointerover', { pointerType: 'mouse', relatedTarget: icon })

    expect(inputs).toEqual([
      ['enter', 'trigger', undefined, 'mouse', undefined],
      ['leave', 'trigger', 'content', 'mouse', { x: 40, y: 12 }],
      ['enter', 'content', undefined, 'mouse', undefined],
    ])
  })

  it('reports a drag with its point, and hit tests the key under the pointer only for a widget that asks for it', () => {
    const hitTest = vi.spyOn(document, 'elementFromPoint')
    const record = (spec: typeof pointerInput.drag) => {
      const root = document.createElement('div')
      const apple = document.createElement('div')
      const fig = document.createElement('div')
      fig.textContent = 'Fig'
      root.append(apple, fig)
      document.body.appendChild(root)
      const elements = createElements<string>()
      elements.setRoot(root)
      elements.setItem('apple', apple)
      elements.setItem('fig', fig)
      const inputs: unknown[][] = []
      const recording = defineWidget({
        state: shape,
        step: [listening([pointerInput.down, spec], (state, input) => {
          if (input.is(spec)) inputs.push([input.name, input.key, input.point?.y, input.pointerType])
          return keep(state)
        })],
      })
      connect(createWidget(recording, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements).listen(root)
      const target = fig.getBoundingClientRect()
      pointer(apple, 'pointerdown', { pointerType: 'touch' })
      pointer(document, 'pointermove', { clientX: target.left + 1, clientY: target.top + 1, pointerType: 'touch' })
      pointer(document, 'pointerup', { buttons: 0 })
      root.remove()
      return { inputs, y: target.top + 1 }
    }

    const drag = record(pointerInput.drag)
    expect(drag.inputs).toEqual([['drag', undefined, drag.y, 'touch']])
    expect(hitTest).not.toHaveBeenCalled()

    const over = record(pointerInput.dragOver)
    expect(over.inputs).toEqual([['dragOver', 'fig', over.y, 'touch']])
    expect(hitTest).toHaveBeenCalledTimes(1)
  })

  it('tells a drag what it pressed, holds the native scroll once a step claims the pointer and swallows the click that ends it, never a keyboard click after a touch drag without one', () => {
    const root = document.createElement('div')
    const scroller = document.createElement('div')
    const field = document.createElement('input')
    scroller.style.cssText = 'overflow-y: auto; height: 20px'
    scroller.append(Object.assign(document.createElement('div'), { style: 'height: 100px' }), field)
    root.append(scroller)
    document.body.appendChild(root)
    const elements = createElements<string>()
    elements.setRoot(root)

    const presses: unknown[] = []
    const claiming = defineWidget({
      state: shape,
      step: [listening([pointerInput.down, pointerInput.drag, pointerInput.release], (state, input) => {
        if (input.is(pointerInput.down)) presses.push({ primary: input.primary, text: input.text, scrolls: input.scroller?.height, timed: input.time !== undefined })
        if (input.is(pointerInput.drag)) return keep(state, [act.claimPointer()])
        return keep(state)
      })],
    })
    connect(createWidget(claiming, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements).listen(root)

    pointer(field, 'pointerdown', { isPrimary: true, button: 0, pointerType: 'touch' })
    const free = new Event('touchmove', { bubbles: true, cancelable: true })
    field.dispatchEvent(free)
    pointer(document, 'pointermove', { pointerType: 'touch' })
    const held = new Event('touchmove', { bubbles: true, cancelable: true })
    field.dispatchEvent(held)
    pointer(document, 'pointerup', { buttons: 0 })

    expect(presses).toEqual([{ primary: true, text: true, scrolls: 100 + field.offsetHeight, timed: true }])
    expect(free.defaultPrevented).toBe(false)
    expect(held.defaultPrevented).toBe(true)
    expect(click(field).defaultPrevented).toBe(true)
    expect(click(field).defaultPrevented).toBe(false)

    const outside = document.createElement('button')
    document.body.appendChild(outside)
    pointer(field, 'pointerdown', { isPrimary: true, button: 0, pointerType: 'touch' })
    pointer(document, 'pointermove', { pointerType: 'touch' })
    pointer(document, 'pointerup', { buttons: 0 })
    pointer(outside, 'pointerdown')
    expect(click(field).defaultPrevented).toBe(false)

    pointer(field, 'pointerdown', { isPrimary: true, button: 0, pointerType: 'touch' })
    pointer(document, 'pointermove', { pointerType: 'touch' })
    pointer(document, 'pointerup', { buttons: 0 })
    expect(click(field, 0).defaultPrevented).toBe(false)
    expect(click(field).defaultPrevented).toBe(false)
  })

  it('leaves out of the drag a move the user prevented, and still ends the drag on the release', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const elements = createElements<string>()
    elements.setRoot(root)

    const inputs: string[] = []
    const dragging = defineWidget({
      state: shape,
      step: [listening([pointerInput.down, pointerInput.drag, pointerInput.release], (state, input) => {
        inputs.push(input.name)
        return keep(state)
      })],
    })
    connect(createWidget(dragging, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements).listen(root)
    root.addEventListener('pointermove', (event) => event.preventDefault(), { once: true })

    pointer(root, 'pointerdown', { isPrimary: true, button: 0, buttons: 1 })
    pointer(root, 'pointermove', { buttons: 1 })
    pointer(root, 'pointermove', { buttons: 1 })
    pointer(document, 'pointerup', { buttons: 0 })

    expect(inputs).toEqual(['down', 'drag', 'release'])
  })

  it('answers the measure a press asked for before a drag that comes in the same task', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const elements = createElements<string>()
    elements.setRoot(root)

    const inputs: string[] = []
    const measuring = defineWidget({
      state: shape,
      step: [listening([pointerInput.down, pointerInput.drag], (state, input) => {
        inputs.push(input.name)
        if (input.is(pointerInput.down)) return keep(state, [act.measure({ name: 'press', rect: true })])
        return keep(state)
      })],
    })
    connect(createWidget(measuring, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements).listen(root)

    pointer(root, 'pointerdown')
    pointer(document, 'pointermove')

    expect(inputs).toEqual(['down', 'done', 'drag'])
  })

  it('seeks one paused animation of a part as a step scrubs it, answers a style flush and cancels the scrub on stop', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const elements = createElements<string>()
    elements.setRoot(root, 'panel', { select: () => [], render: () => ({}) })

    const flushed: unknown[] = []
    const scrubbing = defineWidget({
      state: shape,
      step: [listening([pointerInput.down, pointerInput.drag, pointerInput.release], (state, input) => {
        if (input.is(browser.flushed)) flushed.push(input.part)
        if (input.is(pointerInput.release)) return keep(state, [act.flushStyles('panel'), act.stopScrub('panel')])
        if (input.point) return keep(state, [act.scrub('panel', { keyframes: { opacity: [0, 1] }, progress: input.point.x / 100 })])
        return keep(state)
      })],
    })
    connect(createWidget(scrubbing, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements).listen(root)

    pointer(root, 'pointerdown', { clientX: 25 })
    pointer(document, 'pointermove', { clientX: 75 })

    const animations = root.getAnimations()
    expect(animations).toHaveLength(1)
    expect(animations[0].playState).toBe('paused')
    expect(animations[0].currentTime).toBe(750)

    pointer(document, 'pointerup', { buttons: 0 })
    expect(flushed).toEqual(['panel'])
    expect(root.getAnimations()).toHaveLength(0)
  })

  it('reports how a root scrolls and when it stops, scrolls it on a step and calls the callback a step emits', async () => {
    const root = document.createElement('div')
    root.style.cssText = 'overflow-x: auto; width: 100px'
    root.append(Object.assign(document.createElement('div'), { style: 'width: 400px; height: 10px' }))
    document.body.appendChild(root)
    const elements = createElements<string>()
    elements.setRoot(root, 'pager')

    const SCROLL = command('scroll')
    const moves: number[] = []
    const ends: number[] = []
    const onWheeled = vi.fn()
    const scrolling = defineWidget({
      state: shape,
      step: [listening([scroll.move, scroll.end, pointerInput.wheel], (state, input) => {
        if (input.is(SCROLL)) return keep(state, [act.scrollTo('pager', { left: 120 })])
        if (input.is(pointerInput.wheel)) return keep(state, [act.emit('wheeled', input.part)])
        if (input.is(scroll.move)) moves.push(input.scroller?.left ?? -1)
        if (input.is(scroll.end)) ends.push(input.scroller?.left ?? -1)
        return keep(state)
      })],
    })
    const connection = connect(createWidget(scrolling, { items: fruits, mode: 'single', onWheeled } as Options, { id: 'widget', strict: true }), elements)
    connection.listen(root)

    connection.send(createInput(SCROLL))
    await expect.poll(() => ends).toEqual([120])
    expect(moves.at(-1)).toBe(120)

    root.dispatchEvent(new WheelEvent('wheel', { bubbles: true, deltaX: 10 }))
    expect(onWheeled).toHaveBeenCalledWith('pager')
  })

  it('reports a resize of each root, also of a root registered after connecting, and a change of the viewport', async () => {
    const trigger = document.createElement('div')
    const content = document.createElement('div')
    document.body.append(trigger, content)
    const elements = createElements<string>()
    elements.setRoot(trigger)

    const resized: (string | undefined)[] = []
    let viewports = 0
    const resizing = defineWidget({
      state: shape,
      step: [listening([layout.resize, layout.viewport], (state, input) => {
        if (input.is(layout.resize)) resized.push(input.part)
        if (input.is(layout.viewport)) viewports++
        return keep(state)
      })],
    })
    connect(createWidget(resizing, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    await expect.poll(() => resized).toEqual(['root'])

    elements.setRoot(content, 'content')
    resized.length = 0
    content.style.height = '40px'
    await expect.poll(() => resized).toContain('content')

    window.dispatchEvent(new Event('resize'))
    expect(viewports).toBe(1)
  })

  it('hands a step the edit and the field of a text input and writes the text it answers with, selected before the input event', () => {
    const field = document.createElement('input')
    document.body.appendChild(field)
    field.focus()
    const elements = createElements<string>()
    elements.setRoot(field)

    const fields: (TextState | undefined)[] = []
    const keys: string[] = []
    const editing = defineWidget({
      state: shape,
      step: [listening([text.edit, text.change, key.arrowUp], (state, input) => {
        if (input.is(command('pick'))) return handled(state, [act.commitText('root', 'picked')])
        if (input.is(command('leave'))) return handled(state, [act.commit('root')])
        if (input.is(key.arrowUp)) keys.push(input.field?.value ?? '')
        if (input.is(text.change)) fields.push(input.field)
        if (!input.is(text.edit)) return keep(state)

        return handled(state, [act.setText('root', `${input.field?.value}${input.edit?.data}!`, [1, 1])])
      })],
    })
    const connection = connect(createWidget(editing, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    connection.listen(field)
    const onInput = vi.fn(() => [field.selectionStart, field.selectionEnd])
    const onChange = vi.fn()
    field.addEventListener('input', onInput)
    field.addEventListener('change', onChange)

    const edit = new InputEvent('beforeinput', { bubbles: true, cancelable: true, inputType: 'insertText', data: 'a' })
    field.dispatchEvent(edit)

    expect(edit.defaultPrevented).toBe(true)
    expect(field.value).toBe('a!')
    expect([field.selectionStart, field.selectionEnd]).toEqual([1, 1])
    expect(onInput).toHaveBeenCalledOnce()
    expect(onInput).toHaveReturnedWith([1, 1])
    expect(fields).toEqual([])

    keydown(field, { key: 'ArrowUp' })
    field.dispatchEvent(new InputEvent('input', { bubbles: true }))

    expect(keys).toEqual(['a!'])
    expect(fields).toEqual([{ value: 'a!', selection: [1, 1] }])
    expect(onChange).not.toHaveBeenCalled()

    connection.send(createInput(command('pick')))

    expect(field.value).toBe('picked')
    expect(onChange).toHaveBeenCalledOnce()

    connection.send(createInput(command('leave')))

    expect(field.value).toBe('picked')
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('hands the caret keys and the selection of a text field that is the root itself to the widget', async () => {
    const field = Object.assign(document.createElement('input'), { value: 'abc' })
    document.body.appendChild(field)
    field.focus()
    const elements = createElements<string>()
    elements.setRoot(field)

    const selections: (TextState | undefined)[] = []
    const caret = defineWidget({
      state: shape,
      step: [listening([nav.forward, text.select], (state, input) => {
        if (input.is(text.select)) selections.push(input.field)
        if (!input.is(nav.forward)) return undefined

        return handled(state)
      })],
    })
    const connection = connect(createWidget(caret, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    connection.listen(field)

    expect(keydown(field, { key: 'ArrowRight' }).defaultPrevented).toBe(true)
    expect(keydown(field, { key: 'a' }).defaultPrevented).toBe(false)

    field.setSelectionRange(0, 3)

    await expect.poll(() => selections.at(-1)).toEqual({ value: 'abc', selection: [0, 3] })
  })

  it('reports the selection of a text field once the pointer that selects it is released', async () => {
    const field = Object.assign(document.createElement('input'), { value: 'abc' })
    document.body.appendChild(field)
    await new Promise(requestAnimationFrame)
    field.focus()
    const elements = createElements<string>()
    elements.setRoot(field)

    const selections: (TextState | undefined)[] = []
    const selecting = defineWidget({
      state: shape,
      step: [listening([text.select], (_state, input) => {
        selections.push(input.field)

        return undefined
      })],
    })
    const connection = connect(createWidget(selecting, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    connection.listen(field)

    field.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    field.setSelectionRange(1, 2)
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

    expect(selections).toEqual([])

    field.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }))

    expect(selections).toEqual([{ value: 'abc', selection: [1, 2] }])
  })

  it('lets a widget that spins a value take the wheel from the page', () => {
    const field = document.createElement('input')
    document.body.appendChild(field)
    const elements = createElements<string>()
    elements.setRoot(field)

    const deltas: unknown[] = []
    const spinning = defineWidget({
      state: shape,
      step: [listening([pointerInput.spin], (state, input) => {
        deltas.push(input.delta)

        return handled(state)
      })],
    })
    const connection = connect(createWidget(spinning, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    connection.listen(field)

    const wheel = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -3 })
    field.dispatchEvent(wheel)

    expect(wheel.defaultPrevented).toBe(true)
    expect(deltas).toEqual([{ x: 0, y: -3 }])
  })

  it('never asks to prevent a wheel it hears passively, even when a step handles it', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const elements = createElements<string>()
    elements.setRoot(root)

    const hearing = defineWidget({ state: shape, step: [listening([pointerInput.wheel], (state) => handled(state))] })
    const connection = connect(createWidget(hearing, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    const answers: boolean[] = []
    root.addEventListener('wheel', (event) => answers.push(connection.wheel(event)))

    root.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: -3 }))

    expect(answers).toEqual([false])
  })

  it('tells a widget that an image root loaded or failed', async () => {
    const image = document.createElement('img')
    document.body.appendChild(image)
    const elements = createElements<string>()
    elements.setRoot(image)

    const outcomes: string[] = []
    const loading = defineWidget({
      state: shape,
      step: [listening([browser.load, browser.error], (state, input) => {
        outcomes.push(input.name)

        return keep(state)
      })],
    })
    const connection = connect(createWidget(loading, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    connection.listen(image)

    image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    await expect.poll(() => outcomes).toEqual(['load'])

    image.src = 'data:image/png;base64,broken'
    await expect.poll(() => outcomes).toEqual(['load', 'error'])
  })

  it('tells a widget that a form was reset once the browser restored the defaults', async () => {
    const form = document.createElement('form')
    const field = Object.assign(document.createElement('input'), { defaultValue: 'default' })
    form.append(field)
    document.body.appendChild(form)
    const elements = createElements<string>()
    elements.setRoot(field)

    const restored: string[] = []
    const resetting = defineWidget({
      state: shape,
      step: [listening([browser.reset], (state, input) => {
        if (input.is(browser.reset)) restored.push(field.value)
        return keep(state)
      })],
    })
    connect(createWidget(resetting, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    field.value = 'typed'

    form.reset()

    await expect.poll(() => restored).toEqual(['default'])
  })

  it('paints each element of a keyed part with its key and tells a widget which one the page search revealed, hiding it again when no step shows it', async () => {
    const root = document.createElement('div')
    const panels = new Map(['first', 'second'].map((name) => [name, document.createElement('div')]))
    document.body.append(root, ...panels.values())
    const elements = createElements<string>()
    elements.setRoot(root)

    const panelShape = state({ options: { shows: true }, owns: {}, internal: { shown: internal('first') }, collection: () => emptyCollection<string>() })
    const revealed: unknown[] = []
    const revealing = defineWidget({
      state: panelShape,
      step: [listening([browser.reveal], (current, input) => {
        if (!input.is(browser.reveal)) return undefined
        revealed.push([input.part, input.key])
        if (!current.options.shows) return undefined

        return keep(panelShape.shown.set(current, input.key as string))
      })],
    })
    const panel: Part<unknown, string> = {
      ...panelShape.part(() => [] as const, () => ({})),
      live: {
        select: (current, key) => [(current as typeof panelShape.__snapshot).shown === key],
        render: ([shown]) => ({ hidden: shown ? undefined : 'until-found' }),
      },
    }
    for (const [name, element] of panels) elements.setPart('panel', element, panel, name)
    const instance = createWidget(revealing, { shows: true }, { id: 'widget', strict: true })
    connect(instance, elements).flush()
    expect(panels.get('first')!.hasAttribute('hidden')).toBe(false)
    expect(panels.get('second')!.getAttribute('hidden')).toBe('until-found')

    const reveal = (element: Element) => {
      element.dispatchEvent(new Event('beforematch', { bubbles: true }))
      element.removeAttribute('hidden')
    }

    reveal(panels.get('second')!)
    expect(revealed).toEqual([['panel', 'second']])
    expect(panels.get('first')!.getAttribute('hidden')).toBe('until-found')

    instance.setOptions({ shows: false })
    reveal(panels.get('first')!)
    await expect.poll(() => panels.get('first')!.getAttribute('hidden')).toBe('until-found')
    expect(panels.get('second')!.hasAttribute('hidden')).toBe(false)

    const stranger = document.createElement('div')
    root.appendChild(stranger)
    reveal(stranger)
    expect(revealed).toHaveLength(2)
  })

  it('takes the keys pressed anywhere on the page only while a step watches them', () => {
    const root = document.createElement('div')
    const outside = document.createElement('button')
    document.body.append(root, outside)
    const elements = createElements<string>()
    elements.setRoot(root)

    const keys: string[] = []
    const watching = defineWidget({
      state: shape,
      step: [listening([key.enter, key.escape], (state, input) => {
        keys.push(input.name)
        if (input.is(key.enter)) return handled(state, [act.watchKeys()])
        return handled(state, [act.unwatchKeys()])
      })],
    })
    const connection = connect(createWidget(watching, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    connection.listen(root)

    keydown(outside, { key: 'Escape' })
    keydown(root, { key: 'Enter' })
    const watched = keydown(outside, { key: 'Escape' })
    keydown(outside, { key: 'Escape' })

    expect(keys).toEqual(['Enter', 'Escape'])
    expect(watched.defaultPrevented).toBe(true)
  })
})

describe('Edge Cases', () => {
  it('hands to onError what a part throws while painting, and still paints the other elements', () => {
    const { root, items, instance, elements, stop } = mount({ items: fruits, mode: 'single', defaultActive: 'apple' })
    stop()
    const error = new Error('boom')
    const onError = vi.fn()
    const option: Part<unknown, string> = {
      ...listbox.output.option,
      live: {
        select: (state, key) => {
          if (key === 'banana') throw error
          return [(state as typeof shape.__snapshot).active === key]
        },
        render: ([active]) => ({ 'data-current': active === true }),
      },
    }
    for (const fruit of fruits) elements.setItem(fruit.id, items.get(fruit.id)!, undefined, option)
    connect(instance, elements, { onError }).listen(root)

    keydown(root, { key: 'End' })
    expect(items.get('fig')!.hasAttribute('data-current')).toBe(true)
    expect(onError).toHaveBeenCalledWith(error)
  })

  it('hears a symbol key the layout types with Shift, and still tells Shift apart on letters', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const elements = createElements<string>()
    elements.setRoot(root)
    const heard: string[] = []
    const watching = defineWidget({
      state: shape,
      step: [listening([key.asterisk, key.of('a')], (state, input) => {
        if (input.is(key.asterisk)) heard.push('*')
        if (input.is(key.of('a'))) heard.push('a')
        return handled(state)
      })],
    })
    connect(createWidget(watching, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements).listen(root)

    keydown(root, { key: '*', shiftKey: true })
    keydown(root, { key: 'A', shiftKey: true })
    keydown(root, { key: 'a' })
    expect(heard).toEqual(['*', 'a'])
  })

  it('tells a widget about an image that loaded or failed before its root registered', async () => {
    const loaded = Object.assign(document.createElement('img'), { src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' })
    const broken = Object.assign(document.createElement('img'), { src: 'data:image/png;base64,broken' })
    document.body.append(loaded, broken)
    await expect.poll(() => loaded.complete && broken.complete).toBe(true)

    const outcomes: string[] = []
    const loading = defineWidget({
      state: shape,
      step: [listening([browser.load, browser.error], (state, input) => {
        outcomes.push(input.name)

        return keep(state)
      })],
    })

    for (const image of [loaded, broken]) {
      const elements = createElements<string>()
      connect(createWidget(loading, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
      elements.setRoot(image)
    }

    expect(outcomes).toEqual(['load', 'error'])
  })

  it('listens to the page only once a root registers, so a connection of a dropped render leaves nothing behind', () => {
    const page = vi.spyOn(document, 'addEventListener')
    const widget = defineWidget({ state: state({ options: {}, owns: {} }), step: [listening([browser.reset, text.select], (current) => keep(current))], output: {} })
    const elements = createElements<never>()
    const connection = connect(createWidget(widget, {}, { id: 'widget' }), elements)

    expect(page).not.toHaveBeenCalled()

    const root = document.createElement('div')
    document.body.appendChild(root)
    elements.setRoot(root)

    expect(page).toHaveBeenCalledWith('reset', expect.any(Function), expect.anything())
    connection.disconnect()
    page.mockRestore()
  })

  it('handles an event once when it bubbles through two roots of one widget, as the nearest root', () => {
    const root = document.createElement('div')
    const content = document.createElement('div')
    const inner = document.createElement('span')
    content.appendChild(inner)
    root.appendChild(content)
    document.body.appendChild(root)

    const elements = createElements<string>()
    elements.setRoot(root)
    elements.setRoot(content, 'content')

    const parts: (string | undefined)[] = []
    const passing = defineWidget({
      state: shape,
      step: [listening([key.escape], (_state, input) => {
        parts.push(input.part)
        return undefined
      })],
    })
    const connection = connect(createWidget(passing, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    connection.listen(root)
    connection.listen(content)

    keydown(inner, { key: 'Escape' })

    expect(parts).toEqual(['content'])
  })

  it('lets the inner widget handle a key first and keeps a handled key from the outer widget', () => {
    const outer = mount({ items: fruits, mode: 'single', defaultActive: 'apple' })
    const inner = mount({ items: fruits, mode: 'single', defaultActive: 'apple' }, outer.root)

    keydown(inner.root, { key: 'ArrowDown' })
    expect(inner.instance.state.active).toBe('banana')
    expect(outer.instance.state.active).toBe('apple')

    keydown(inner.root, { key: 'Tab' })
    expect(inner.instance.state.active).toBe('banana')
  })

  it('does not handle a key whose default the user prevented before the widget saw it', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    root.addEventListener('keydown', (event) => event.preventDefault())

    const elements = createElements<string>()
    elements.setRoot(root)
    const instance = createWidget(listbox, { items: fruits, mode: 'single', defaultActive: 'apple' }, { id: 'widget', strict: true })
    connect(instance, elements).listen(root)

    keydown(root, { key: 'ArrowDown' })

    expect(instance.state.active).toBe('apple')
  })

  it('yields the caret keys to a text field inside the root but still takes the keys of the widget', () => {
    const { root, instance } = mount({ items: fruits, mode: 'single', defaultActive: 'apple' })
    const field = document.createElement('input')
    root.appendChild(field)

    const left = keydown(field, { key: 'ArrowLeft' })
    expect(left.defaultPrevented).toBe(false)

    const typed = keydown(field, { key: 'd' })
    expect(typed.defaultPrevented).toBe(false)
    expect(instance.state.active).toBe('apple')

    keydown(field, { key: 'ArrowDown' })
    expect(instance.state.active).toBe('banana')
  })

  it('tells a widget that asks for it about a key it yields to a text field, without preventing the key', () => {
    const { root, items } = mount({ items: fruits, mode: 'single' })
    const field = Object.assign(document.createElement('input'), { value: 'abc' })
    root.appendChild(field)
    const elements = createElements<string>()
    elements.setRoot(root)
    elements.setItem('apple', items.get('apple')!)

    const yielded: (string | undefined)[] = []
    const editing = defineWidget({
      state: shape,
      step: [listening([text.key], (state, input) => {
        if (!input.is(text.key)) return undefined

        yielded.push(input.field?.value)
        return handled(state)
      })],
    })
    connect(createWidget(editing, { items: fruits, mode: 'single' }, { id: 'editing', strict: true }), elements).listen(root)

    expect(keydown(field, { key: 'End' }).defaultPrevented).toBe(false)
    expect(keydown(field, { key: 'x' }).defaultPrevented).toBe(false)
    expect(yielded).toEqual(['abc', 'abc'])
  })

  it('yields the line keys to a multi-line field inside the root', () => {
    const { root, instance } = mount({ items: fruits, mode: 'single', defaultActive: 'apple' })
    const area = document.createElement('textarea')
    const editor = document.createElement('div')
    editor.contentEditable = 'true'
    root.append(area, editor)

    for (const field of [area, editor]) {
      for (const name of ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Enter']) {
        expect(keydown(field, { key: name }).defaultPrevented).toBe(false)
      }
    }
    expect(instance.state.active).toBe('apple')

    keydown(root.appendChild(document.createElement('input')), { key: 'ArrowDown' })
    expect(instance.state.active).toBe('banana')
  })

  it('reads a shortcut letter from the key position in a layout without Latin letters', () => {
    const { root, instance } = mount({ items: fruits, mode: 'multiple' })

    keydown(root, { key: 'ф', code: 'KeyA', ctrlKey: true })

    expect(instance.state.value).toEqual(['apple', 'banana', 'date', 'fig'])
  })

  it('releases the pointer when the buttons are up on a move, so the next press is not lost', () => {
    const { items, instance } = mount({ items: fruits, mode: 'single' })

    pointer(items.get('apple')!, 'pointerdown')
    pointer(document, 'pointermove', { buttons: 0 })
    pointer(items.get('fig')!, 'pointerdown', { pointerId: 2 })

    expect(instance.state.active).toBe('fig')
  })

  it('retries a focus action once the element is rendered', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const elements = createElements<string>()
    elements.setRoot(root)

    const focusFig = defineWidget({ state: shape, step: [listening([key.enter], (state) => handled(state, [act.focus('fig')]))], output: {} })
    const instance = createWidget(focusFig, { items: fruits, mode: 'single' }, { id: 'widget' })
    const connection = connect(instance, elements)
    connection.listen(root)

    keydown(root, { key: 'Enter' })

    const fig = document.createElement('button')
    root.appendChild(fig)
    elements.setItem('fig', fig)
    connection.flush()

    expect(document.activeElement).toBe(fig)
  })

  it('does not listen to the events no step declares', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const elements = createElements<string>()
    elements.setRoot(root)

    const seen: string[] = []
    const onlyEscape = defineWidget({
      state: shape,
      step: [listening([key.escape], (state, input) => {
        seen.push(input.type)
        return handled(state)
      })],
    })
    const connection = connect(createWidget(onlyEscape, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)
    connection.listen(root)

    click(root)
    pointer(root, 'pointermove', { buttons: 0 })
    keydown(root, { key: 'Escape' })

    expect(connection.events).toEqual(['keydown', 'focusin', 'focusout'])
    expect(seen).toEqual(['key'])
  })

  it('leaves a key no step reads to the browser without reading the writing direction', () => {
    const root = document.createElement('div')
    root.setAttribute('aria-orientation', 'horizontal')
    document.body.appendChild(root)
    const elements = createElements<string>()
    elements.setRoot(root)

    const seen: string[] = []
    const onlyPages = defineWidget({
      state: shape,
      step: [listening([nav.pageForward], (state, input) => {
        seen.push(input.name)
        return handled(state)
      })],
    })
    connect(createWidget(onlyPages, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements).listen(root)
    const styles = vi.spyOn(window, 'getComputedStyle')

    const arrow = keydown(root, { key: 'ArrowRight' })
    const page = keydown(root, { key: 'PageDown' })

    expect(arrow.defaultPrevented).toBe(false)
    expect(page.defaultPrevented).toBe(true)
    expect(seen).toEqual([nav.pageForward.name])
    expect(styles).not.toHaveBeenCalled()
  })

  it('reads a value from outside the page before every input', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const elements = createElements<never>()
    elements.setRoot(root)

    const outside = { warm: false }
    const warmShape = state({ options: { source: outside }, owns: {}, observes: { warm: reading((options: { source: typeof outside }) => options.source.warm, false) } })
    const reported: boolean[] = []
    const recording = defineWidget({
      state: warmShape,
      step: [listening([key.escape], (current) => {
        reported.push(current.warm)
        return keep(current)
      })],
    })
    connect(createWidget(recording, { source: outside }, { id: 'widget', strict: true }), elements).listen(root)

    keydown(root, { key: 'Escape' })
    outside.warm = true
    keydown(root, { key: 'Escape' })

    expect(reported).toEqual([false, true])
  })

  it('clears its timers and document listeners on disconnect and ignores what is sent after it', () => {
    vi.useFakeTimers()
    const { root, items, instance, connection } = mount({ items: fruits, mode: 'single' })

    keydown(root, { key: 'd' })
    pointer(items.get('date')!, 'pointerdown')
    connection.disconnect()

    vi.advanceTimersByTime(600)
    pointer(document, 'pointerup', { buttons: 0 })
    keydown(root, { key: 'ArrowDown' })
    click(items.get('fig')!)
    expect(connection.send(createInput(nav.forward)).answer).toBe('pass')

    expect(instance.state.typed).toBe('d')
    expect(instance.state.active).toBe('date')
    expect(instance.state.value).toEqual([])
  })

  it('starts again the timers a previous connection left running, so the typed letters still expire after a reconnect', () => {
    vi.useFakeTimers()
    const { root, instance, connection, elements } = mount({ items: fruits, mode: 'single' })

    keydown(root, { key: 'd' })
    connection.disconnect()
    connect(instance, elements).listen(root)

    vi.advanceTimersByTime(600)
    expect(instance.state.typed).toBe('')
  })

  it('clears a property the part no longer renders', () => {
    const { root, elements } = mount({ items: fruits, mode: 'multiple', defaultActive: 'apple' })
    const mixed = document.createElement('input')
    mixed.type = 'checkbox'
    root.appendChild(mixed)

    const all: Part<unknown, string> = {
      ...listbox.output.root,
      props: {
        select: (state) => [(state as typeof shape.__snapshot).value.length],
        render: ([count]) => (count === 1 ? { indeterminate: true } : {}),
      },
    }
    elements.setPart('all', mixed, all)

    keydown(root, { key: ' ' })
    expect(mixed.indeterminate).toBe(true)

    keydown(root, { key: ' ' })
    expect(mixed.indeterminate).toBe(false)
  })

  it('cancels a height animation on disconnect, so a closed content does not stay collapsed for the next connection', () => {
    const root = document.createElement('div')
    const content = document.createElement('div')
    content.style.animationDuration = '1s'
    content.textContent = 'content'
    root.appendChild(content)
    document.body.appendChild(root)
    const elements = createElements<string>()
    elements.setRoot(root)
    elements.setPart('content', content)

    const CLOSE = command('close')
    const closing = defineWidget({ state: shape, step: [(current, input) => (input.is(CLOSE) ? handled(current, [act.animateHeight('content', false)]) : undefined)], output: {} })
    const connection = connect(createWidget(closing, { items: fruits, mode: 'single' }, { id: 'widget', strict: true }), elements)

    connection.send(createInput(CLOSE))
    expect(content.getAnimations()).toHaveLength(1)

    connection.disconnect()
    expect(content.getAnimations()).toHaveLength(0)
  })
})

describe('Accessibility', () => {
  it('maps the arrows by the orientation of the root', () => {
    const { root, instance } = mount({ items: fruits, mode: 'single', defaultActive: 'apple' })
    root.setAttribute('aria-orientation', 'horizontal')

    keydown(root, { key: 'ArrowDown' })
    expect(instance.state.active).toBe('apple')

    keydown(root, { key: 'ArrowRight' })
    expect(instance.state.active).toBe('banana')

    root.dir = 'rtl'
    keydown(root, { key: 'ArrowLeft' })
    expect(instance.state.active).toBe('date')
  })

  it('takes the writing direction from dir, which CSS can match, not from the direction property alone', () => {
    const { root, instance } = mount({ items: fruits, mode: 'single', defaultActive: 'banana' })
    root.setAttribute('aria-orientation', 'horizontal')
    root.style.direction = 'rtl'

    keydown(root, { key: 'ArrowLeft' })
    expect(instance.state.active).toBe('apple')
  })

  it('follows a writing direction an ancestor changes after the first key', () => {
    const outer = document.createElement('div')
    document.body.appendChild(outer)
    const { root, instance } = mount({ items: fruits, mode: 'single', defaultActive: 'apple' }, outer)
    root.setAttribute('aria-orientation', 'horizontal')

    keydown(root, { key: 'ArrowRight' })
    expect(instance.state.active).toBe('banana')

    outer.dir = 'rtl'
    keydown(root, { key: 'ArrowLeft' })
    expect(instance.state.active).toBe('date')
  })

  it('turns the arrows across the axis into cross moves by the writing direction, only for a widget that reads them', () => {
    const record = () => {
      const root = document.createElement('div')
      root.tabIndex = 0
      document.body.appendChild(root)
      const elements = createElements<never>()
      elements.setRoot(root)

      const moves: string[] = []
      const crossing = defineWidget({
        state: state({ options: {}, owns: {} }),
        step: [listening([nav.crossForward, nav.crossBackward], (current, input) => {
          moves.push(input.name)
          return handled(current)
        })],
      })
      connect(createWidget(crossing, {}, { id: 'crossing', strict: true }), elements).listen(root)

      return { root, moves }
    }

    const vertical = record()
    keydown(vertical.root, { key: 'ArrowRight' })
    keydown(vertical.root, { key: 'ArrowDown' })
    vertical.root.dir = 'rtl'
    keydown(vertical.root, { key: 'ArrowRight' })
    expect(vertical.moves).toEqual(['crossForward', 'crossBackward'])

    const horizontal = record()
    horizontal.root.setAttribute('aria-orientation', 'horizontal')
    keydown(horizontal.root, { key: 'ArrowUp' })
    keydown(horizontal.root, { key: 'ArrowRight' })
    expect(horizontal.moves).toEqual(['crossBackward'])

    const { root, instance } = mount({ items: fruits, mode: 'single', defaultActive: 'apple' })
    expect(keydown(root, { key: 'ArrowRight' }).defaultPrevented).toBe(false)
    expect(instance.state.active).toBe('apple')
  })

  it('reads the implicit horizontal orientation of a tablist', () => {
    const { root, instance } = mount({ items: fruits, mode: 'single', defaultActive: 'apple' })
    root.setAttribute('role', 'tablist')

    keydown(root, { key: 'ArrowDown' })
    expect(instance.state.active).toBe('apple')

    keydown(root, { key: 'ArrowRight' })
    expect(instance.state.active).toBe('banana')
  })
})
