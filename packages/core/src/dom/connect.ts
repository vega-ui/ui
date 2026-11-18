import { collection } from '../collection'
import { browser, createInput, Direction, focus, Input, InputSpec, layout, measure, Measured, Orientation, pointer, readsCrossAxis, readsDirection, scroll, text, TextState, timer, toNav } from '../input'
import { Part, sameSelection, ValidationAttributes } from '../output'
import { AnyShape, capitalize, KeyOf, ObservedValues } from '../state'
import { Action, Answer, targets } from '../step'
import { Dispatched, WidgetInstance } from '../widget'
import { registryOf } from './elements'
import { focusableAt, holdsFocusable } from './focusables'
import { isComposing, keyInput } from './keys'
import { pressesText, readMeasure, scrollerBelow, scrollOf } from './measure'
import { cancels, delivers, DomEvent, eventsFor, hears, spins } from './sources'
import { inOpenPopup, isTextEntry, yieldsToNative } from './yield'

export interface Bound<Key> {
  readonly element: Element
  readonly key: Key | undefined
  readonly output: Part<unknown, Key>
}

export interface Elements<Key> {
  rootOf(node: Node): Element | undefined
  bound(): Iterable<Bound<Key>>
  boundOf(element: Element): Bound<Key> | undefined
  part(name: string): Element | null
  item(key: Key): Element | null
  keyOf(element: Element): Key | undefined
  partOf(element: Element): string | undefined
  roots(): Iterable<Element>
  watchRoots(listener: () => void): () => void
}

export interface DomHandlers {
  keydown(event: KeyboardEvent): boolean
  click(event: MouseEvent): boolean
  pointerdown(event: PointerEvent): boolean
  pointermove(event: PointerEvent): boolean
  pointerover(event: PointerEvent): boolean
  pointerout(event: PointerEvent): boolean
  touchmove(event: TouchEvent): boolean
  wheel(event: WheelEvent): boolean
  scroll(event: Event): boolean
  scrollend(event: Event): boolean
  focusin(event: FocusEvent): boolean
  focusout(event: FocusEvent): boolean
  beforeinput(event: InputEvent): boolean
  input(event: Event): boolean
  toggle(event: Event): boolean
  load(event: Event): boolean
  error(event: Event): boolean
  cancel(event: Event): boolean
  close(event: Event): boolean
  submit(event: SubmitEvent): boolean
}

export interface Connection<Key = unknown> extends DomHandlers {
  readonly events: readonly DomEvent[]
  listen(element: Element): () => void
  send(input: Input<Key>): Dispatched<Key>
  observe(): void
  paint(element?: Element): void
  apply(actions: readonly Action<Key>[]): void
  flush(): void
  disconnect(): void
}

export interface ConnectionEnvironment {
  readonly onError?: (error: unknown, action?: Action) => void
}

interface Waiting<Key> {
  readonly action: Action<Key>
  readonly wasKnown: boolean
}

interface Painted {
  readonly selected: readonly unknown[]
  readonly values: Readonly<Record<string, unknown>>
}

type ChannelName = 'props' | 'live'

const CHANNELS: readonly ChannelName[] = ['props', 'live']

const validationMessageOf = (attributes: ValidationAttributes | undefined) => {
  if (!attributes) return ''

  const input = document.createElement('input')
  Object.assign(input, attributes)

  return input.validationMessage
}

const writeProperty = (element: Element, name: string, value: unknown) => {
  if (name === 'invalidAs' && 'setCustomValidity' in element) {
    ;(element as HTMLInputElement).setCustomValidity(validationMessageOf(value as ValidationAttributes | undefined))
    return
  }

  Reflect.set(element, name, value)
}

const writeLive = (element: Element, name: string, value: unknown) => {
  const { style } = element as HTMLElement

  if (name.startsWith('--')) {
    if (value === undefined) style.removeProperty(name)
    else style.setProperty(name, String(value))
    return
  }

  if (value === undefined || value === false) element.removeAttribute(name)
  else element.setAttribute(name, value === true ? '' : String(value))
}

const COLLAPSED: Keyframe = { height: '0px', paddingBlockStart: '0px', paddingBlockEnd: '0px' }

const blockSizeOf = (element: Element): Keyframe => {
  const { paddingBlockStart, paddingBlockEnd } = getComputedStyle(element)

  return { height: `${element.getBoundingClientRect().height}px`, paddingBlockStart, paddingBlockEnd }
}

const WRITERS: Record<ChannelName, (element: Element, name: string, value: unknown) => void> = { props: writeProperty, live: writeLive }

const consumed = new WeakSet<Event>()

const SCROLL_END_FALLBACK = 80

const receivers = new WeakMap<Elements<unknown>, (input: Input) => void>()

const INTERACTIVE = 'a[href], button, input, select, textarea, [contenteditable]:not([contenteditable="false"]), [tabindex]'

const IMPLICIT_ORIENTATIONS = new Map<string, Orientation>([
  ['grid', 'grid'],
  ['treegrid', 'grid'],
  ['tablist', 'horizontal'],
  ['menubar', 'horizontal'],
  ['toolbar', 'horizontal'],
])

const isBackdrop = (event: MouseEvent) => {
  const dialog = event.target
  if (!(dialog instanceof HTMLDialogElement)) return false

  const rect = dialog.getBoundingClientRect()
  return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom
}

type TextField = HTMLInputElement | HTMLTextAreaElement

const isTextField = (target: EventTarget | null): target is TextField => target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement

const fieldOf = (target: EventTarget | null): TextState | undefined => {
  if (!isTextField(target)) return undefined

  const { value } = target
  return { value, selection: [target.selectionStart ?? value.length, target.selectionEnd ?? value.length] }
}

const writeValue = (field: TextField, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(field), 'value')?.set
  if (setter) setter.call(field, value)
  else field.value = value
}

const orientationOf = (root: Element): Orientation => {
  const declared = root.getAttribute('aria-orientation') as Orientation | null
  if (declared) return declared

  if (isTextEntry(root)) return 'horizontal'

  return IMPLICIT_ORIENTATIONS.get(root.getAttribute('role') ?? '') ?? 'vertical'
}

export const connect = <WidgetShape extends AnyShape>(instance: WidgetInstance<WidgetShape>, elements: Elements<KeyOf<WidgetShape>>, environment: ConnectionEnvironment = {}): Connection<KeyOf<WidgetShape>> => {
  type Key = KeyOf<WidgetShape>

  const events = eventsFor(instance.listens)
  const drags = delivers(instance.listens, pointer.drag)
  const dragsOver = delivers(instance.listens, pointer.dragOver)
  const deferred: Extract<Action<Key>, { type: 'measure' | 'awaitAnimations' }>[] = []
  const timers = new Map<string, ReturnType<typeof setTimeout>>()
  const startTimer = (name: string, ms: number) => {
    clearTimeout(timers.get(name))
    timers.set(name, setTimeout(() => {
      timers.delete(name)
      send(createInput(timer(name)))
    }, ms))
  }
  const pending: Waiting<Key>[] = []
  const controller = new AbortController()
  let pressed: { id: number; key: Key | undefined; pointerType: string; claimed: boolean } | null = null
  let swallowsClick = false
  const scrubs = new Map<string, Animation>()
  const heights = new Map<string, Animation>()
  const scrollEnds = new Map<Element, ReturnType<typeof setTimeout>>()
  let focusing: Element | null = null

  const declares = (spec: InputSpec) => instance.listens.some((declared) => declared.type === spec.type && declared.name === spec.name)
  const spinning = spins(instance.listens)
  let resizes: ResizeObserver | undefined
  let listensToPage = false

  const listenToPage = () => {
    if (listensToPage) return
    listensToPage = true

    if (declares(layout.resize)) {
      resizes = new ResizeObserver((entries) => {
        for (const entry of entries) send(createInput<Key>(layout.resize, { part: elements.partOf(entry.target) }))
      })
    }

    if (declares(browser.reset)) {
      document.addEventListener('reset', (event) => {
        if (event.defaultPrevented || !(event.target instanceof HTMLFormElement)) return

        const controls = Array.from(event.target.elements)
        const owns = [...elements.roots()].some((root) => controls.some((control) => root.contains(control)))
        if (owns) queueMicrotask(() => void send(createInput<Key>(browser.reset)))
      }, { signal: controller.signal })
    }

    if (declares(browser.reveal)) {
      document.addEventListener('beforematch', (event) => {
        const revealed = event.target instanceof Element ? elements.boundOf(event.target) : undefined
        if (!revealed) return

        send(createInput<Key>(browser.reveal, { part: elements.partOf(revealed.element), key: revealed.key }))
        queueMicrotask(() => paint(revealed.element))
      }, { capture: true, signal: controller.signal })
    }

    if (declares(layout.viewport)) {
      const changed = () => void send(createInput<Key>(layout.viewport))
      window.addEventListener('resize', changed, { signal: controller.signal })
      window.visualViewport?.addEventListener('resize', changed, { signal: controller.signal })
      window.visualViewport?.addEventListener('scroll', changed, { signal: controller.signal })
    }

    if (declares(text.select)) {
      let held = false
      let waiting = false
      const changed = () => {
        const field = document.activeElement
        if (!isTextField(field) || !isOwn(field)) return
        if (held) {
          waiting = true
          return
        }

        send(createInput<Key>(text.select, { part: partAt(field), field: fieldOf(field) }))
      }
      const hold = () => {
        held = true
      }
      const release = () => {
        held = false
        if (!waiting) return

        waiting = false
        changed()
      }
      document.addEventListener('selectionchange', changed, { capture: true, signal: controller.signal })
      document.addEventListener('focusin', changed, { signal: controller.signal })
      document.addEventListener('pointerdown', hold, { capture: true, signal: controller.signal })
      document.addEventListener('pointerup', release, { capture: true, signal: controller.signal })
      document.addEventListener('pointercancel', release, { capture: true, signal: controller.signal })
    }
  }

  const observeRoots = () => {
    const roots = [...elements.roots()]
    if (roots.length > 0) listenToPage()
    if (!resizes) return

    resizes.disconnect()
    for (const root of roots) resizes.observe(root)
  }
  observeRoots()
  const unwatchRoots = elements.watchRoots(observeRoots)

  const seen = new WeakSet<Event>()
  const painted = new WeakMap<Element, Partial<Record<ChannelName, Painted>>>()

  const cross = readsCrossAxis(instance.listens)

  const directionOf = (root: Element, input: Input<unknown>): Direction => {
    const orientation = orientationOf(root)
    if (!readsDirection(input, orientation, cross)) return { orientation, rtl: false, cross }

    return { orientation, rtl: root.matches(':dir(rtl)'), cross }
  }

  const rootAt = (target: EventTarget | null) => (target instanceof Node ? elements.rootOf(target) : undefined)

  const isOwn = (target: EventTarget | null) => rootAt(target) !== undefined

  const find = <Found>(target: EventTarget | null, lookup: (element: Element) => Found | undefined): Found | undefined => {
    const root = rootAt(target)

    for (let element = target instanceof Element ? target : null; element && element !== root; element = element.parentElement) {
      const found = lookup(element)
      if (found !== undefined) return found
    }

    return undefined
  }

  const keyAt = (target: EventTarget | null) => find(target, elements.keyOf)
  const partAt = (target: EventTarget | null) => {
    const found = find(target, elements.partOf)
    if (found !== undefined) return found

    const root = rootAt(target)
    return root ? elements.partOf(root) : undefined
  }

  const locate = (target: EventTarget | null) => {
    const key = keyAt(target)
    const item = key === undefined ? null : elements.item(key)
    const control = find(target, (element) => {
      if (element === item) return null
      return element.matches(INTERACTIVE) ? element : undefined
    })

    return { key, item, inside: control instanceof Element }
  }

  const receiverFrom = (start: Element | null, stops: ReadonlySet<Element>) => {
    for (let node = start; node && !stops.has(node); node = node.parentElement) {
      const registry = registryOf(node)
      if (!registry || registry === elements) continue

      const receiver = receivers.get(registry)
      if (receiver) return receiver
    }

    return undefined
  }

  const focusElement = (element: HTMLElement, preventScroll?: boolean) => {
    focusing = element
    element.focus({ preventScroll })
    focusing = null
  }

  const observed = (focused = instance.state.focused): ObservedValues => {
    const values: Record<string, unknown> = { focused }

    for (const name in instance.observed) {
      const declared = instance.observed[name]
      if ('read' in declared) {
        values[name] = declared.read(instance.state.options as never)
        continue
      }

      const element = elements.part(declared.part)
      values[name] = element ? element.matches(declared.selector) : declared.fallback
    }

    return values
  }

  const run = (action: Action<Key>, waits: boolean) => {
    switch (action.type) {
      case 'focus': {
        const element = elements.item(action.key)
        if (!element) return waits
        focusElement(element as HTMLElement, action.preventScroll)
        return waits && document.activeElement !== element
      }
      case 'focusInside': {
        const element = elements.item(action.key)
        if (!element) return waits
        const target = focusableAt(element, action.at, document.activeElement)
        if (target) focusElement(target)
        return false
      }
      case 'focusPart': {
        const element = elements.part(action.part)
        if (!element) return waits
        focusElement(element as HTMLElement)
        return false
      }
      case 'reveal': {
        const element = elements.item(action.key)
        if (!element) return waits
        element.scrollIntoView({ block: 'nearest', inline: 'nearest' })
        return false
      }
      case 'click': {
        const element = elements.item(action.key)
        if (!element) return waits
        ;(element as HTMLElement).click()
        return false
      }
      case 'timer': {
        startTimer(action.name, action.ms)
        return false
      }
      case 'cancelTimer': {
        clearTimeout(timers.get(action.name))
        timers.delete(action.name)
        return false
      }
      case 'showPopover':
      case 'hidePopover': {
        const element = elements.part(action.part) as HTMLElement | null
        if (!element) return waits
        const open = element.matches(':popover-open')
        if (action.type === 'showPopover' && !open) element.showPopover()
        if (action.type === 'hidePopover' && open) element.hidePopover()
        return false
      }
      case 'send': {
        const element = elements.part(action.part)
        const registry = element ? registryOf(element) : undefined
        const receiver = registry ? receivers.get(registry) : undefined
        if (!receiver) return waits
        receiver(createInput(action.input, action.payload))
        return false
      }
      case 'sendAt': {
        const element = elements.item(action.key)
        if (!element) return waits
        receiverFrom(element, new Set(elements.roots()))?.(createInput(action.input, action.payload))
        return false
      }
      case 'sendUp': {
        const element = elements.part(action.part)
        if (!element) return waits
        receiverFrom(element.parentElement, new Set())?.(createInput(action.input, action.payload))
        return false
      }
      case 'showModal': {
        const element = elements.part(action.part)
        if (!(element instanceof HTMLDialogElement)) return waits
        if (!element.open) element.showModal()
        send(createInput(browser.toggle, { to: true, part: action.part }))
        return false
      }
      case 'closeDialog': {
        const element = elements.part(action.part)
        if (!(element instanceof HTMLDialogElement)) return waits
        element.close(action.returnValue)
        return false
      }
      case 'scrub': {
        const element = elements.part(action.part)
        if (!element) return false

        let animation = scrubs.get(action.part)
        if (!animation) {
          const { keyframes, pseudoElement } = action.scrub
          animation = element.animate(keyframes, { duration: 1000, fill: 'both', pseudoElement })
          animation.pause()
          scrubs.set(action.part, animation)
        }
        animation.currentTime = action.scrub.progress * 1000
        return false
      }
      case 'stopScrub': {
        scrubs.get(action.part)?.cancel()
        scrubs.delete(action.part)
        return false
      }
      case 'setText': {
        const element = elements.part(action.part)
        if (!isTextField(element)) return waits
        if (element.value !== action.value) {
          writeValue(element, action.value)
          if (action.selection && element.ownerDocument.activeElement === element) element.setSelectionRange(...action.selection)
          const changed = new InputEvent('input', { bubbles: true, inputType: 'insertReplacementText' })
          seen.add(changed)
          element.dispatchEvent(changed)
          if (action.commit) element.dispatchEvent(new Event('change', { bubbles: true }))
        }
        if (action.selection && element.ownerDocument.activeElement === element) element.setSelectionRange(...action.selection)
        return false
      }
      case 'commit': {
        const element = elements.part(action.part)
        if (!element) return waits
        element.dispatchEvent(new Event('change', { bubbles: true }))
        return false
      }
      case 'scrollTo': {
        const element = elements.part(action.part)
        if (!element) return waits
        element.scrollTo(action.to)
        return false
      }
      case 'emit': {
        const callback = (instance.state.options as Record<string, unknown>)[`on${capitalize(action.name)}`]
        if (typeof callback === 'function') callback(action.value)
        return false
      }
      case 'flushStyles': {
        elements.part(action.part)?.getAnimations()
        send(createInput(browser.flushed, { part: action.part }))
        return false
      }
      case 'animateHeight': {
        const element = elements.part(action.part)
        if (!element) return waits

        const previous = heights.get(action.part)
        const from = action.open && previous?.playState !== 'running' ? COLLAPSED : blockSizeOf(element)
        paint()
        previous?.cancel()
        const to = action.open ? blockSizeOf(element) : COLLAPSED

        const { animationDuration, animationTimingFunction } = getComputedStyle(element)
        heights.set(action.part, element.animate([from, to], {
          duration: parseFloat(animationDuration) * 1000,
          easing: animationTimingFunction,
          fill: action.open ? 'none' : 'forwards',
        }))
        return false
      }
      case 'claimPointer': {
        if (!pressed || pressed.claimed) return false
        pressed.claimed = true
        return false
      }
      case 'watchKeys': {
        document.addEventListener('keydown', onDocumentKeyDown, { signal: controller.signal })
        return false
      }
      case 'unwatchKeys': {
        document.removeEventListener('keydown', onDocumentKeyDown)
        return false
      }
      case 'measure':
      case 'awaitAnimations': {
        if (deferred.length === 0) queueMicrotask(runDeferred)
        deferred.push(action)
        return false
      }
    }
  }

  const attempt = (action: Action<Key>) => {
    try {
      return run(action, true)
    } catch (error) {
      environment.onError?.(error, action)
      return false
    }
  }

  const known = (action: Action<Key>) => targets(action) && collection.has(instance.state.collection, action.key)

  const stale = ({ action, wasKnown }: Waiting<Key>) => wasKnown && !known(action)

  const retry = (waiting: readonly Waiting<Key>[]) => {
    for (const entry of waiting) {
      if (stale(entry)) continue
      if (attempt(entry.action)) pending.push(entry)
    }
  }

  const apply = (actions: readonly Action<Key>[]) => {
    if (actions.some((action) => action.type === 'focus')) {
      const kept = pending.filter(({ action }) => action.type !== 'focus')
      pending.splice(0, pending.length, ...kept)
    }

    retry(actions.map((action) => ({ action, wasKnown: known(action) })))
    if (pending.length > 0) queueMicrotask(flush)
  }

  const paintBound = ({ element, key, output }: Bound<Key>) => {
    for (const channel of CHANNELS) {
      const definition = output[channel]
      if (!definition) continue

      const previous = painted.get(element)?.[channel]
      try {
        const selected = definition.select(instance.state, key as Key)
        if (previous && sameSelection(previous.selected, selected)) continue

        const values: Readonly<Record<string, unknown>> = definition.render(selected)
        for (const name in values) {
          if (previous && Object.is(previous.values[name], values[name])) continue
          WRITERS[channel](element, name, values[name])
        }
        const dropped = previous ? Object.keys(previous.values).filter((name) => !(name in values)) : []
        for (const name of dropped) WRITERS[channel](element, name, undefined)

        painted.set(element, { ...painted.get(element), [channel]: { selected, values } })
      } catch (error) {
        environment.onError?.(error)
      }
    }
  }

  const paint = (element?: Element) => {
    if (!element) {
      for (const bound of elements.bound()) paintBound(bound)
      return
    }

    const bound = elements.boundOf(element)
    if (!bound) return

    painted.delete(element)
    paintBound(bound)
  }

  const awaitAnimations = (part: string) => {
    const element = elements.part(part)
    const animations = element ? element.getAnimations({ subtree: true }).filter((animation) => animation.effect instanceof KeyframeEffect && animation.effect.target === element) : []

    void Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      if (!controller.signal.aborted) send(createInput<Key>(browser.animationEnd, { part }))
    })
  }

  const runDeferred = () => {
    if (deferred.length === 0) return

    const actions = deferred.splice(0)
    const results: Measured<Key>[] = []
    for (const action of actions) {
      if (action.type === 'measure') results.push(readMeasure<Key>(elements, action.request, instance.state.collection.order as readonly Key[]))
      else awaitAnimations(action.part)
    }

    for (const measured of results) send(createInput<Key>(measure.done, { measured }))
  }

  const flush = () => {
    paint()
    retry(pending.splice(0))
    runDeferred()
  }

  const settle = (event: Event, input: Input<Key>, answer: Answer | 'pass') => {
    if (answer === 'pass') return false

    consumed.add(event)
    return answer === 'handled' && cancels(event, input)
  }

  const send = (input: Input<Key>, focused?: boolean): Dispatched<Key> => {
    if (controller.signal.aborted) return { answer: 'pass', actions: [] }

    const result = instance.dispatch(input, observed(focused))
    paint()
    apply(result.actions)

    return result
  }

  const dispatch = (event: Event, input: Input<Key>, focused?: boolean) => {
    seen.add(event)
    return settle(event, input, send(input, focused).answer)
  }

  const accepts = (event: Event) => !consumed.has(event) && !seen.has(event) && isOwn(event.target) && !event.defaultPrevented

  const endPress = () => {
    if (pressed?.claimed) {
      swallowsClick = true
      document.addEventListener('pointerdown', onAnyPointerDown, { capture: true, once: true, signal: controller.signal })
      document.addEventListener('click', onClaimedClick, { capture: true, once: true, signal: controller.signal })
    }
    pressed = null
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup', onPointerUp)
    document.removeEventListener('pointercancel', onPointerCancel)
  }

  const release = (event: PointerEvent, name: 'release' | 'cancel') => {
    if (!pressed || event.pointerId !== pressed.id) return

    const { key, pointerType } = pressed
    endPress()
    if (name === 'cancel') return dispatch(event, createInput(pointer.cancel, { key, pointerType, time: event.timeStamp }))

    dispatch(event, createInput(pointer.release, { key, pointerType, point: { x: event.clientX, y: event.clientY }, time: event.timeStamp }))
  }

  const onDocumentKeyDown = (event: KeyboardEvent) => {
    if (consumed.has(event) || seen.has(event) || event.defaultPrevented || isComposing(event)) return

    const input = keyInput(event)
    if (!hears(instance.listens, input)) return
    if (dispatch(event, createInput(input, { char: input.char }))) event.preventDefault()
  }

  const crosses = (from: EventTarget | null, to: EventTarget | null) => partAt(from) !== partAt(to) || !Object.is(keyAt(from), keyAt(to))

  const onAnyPointerDown = () => {
    swallowsClick = false
  }

  const onClaimedClick = (event: MouseEvent) => {
    if (!swallowsClick) return

    swallowsClick = false
    if (event.detail === 0 || !isOwn(event.target)) return

    event.preventDefault()
    event.stopPropagation()
  }

  const onPointerUp = (event: PointerEvent) => release(event, 'release')
  const onPointerCancel = (event: PointerEvent) => release(event, 'cancel')

  const onPointerMove = (event: PointerEvent) => {
    if (!pressed || event.pointerId !== pressed.id) return
    if (event.buttons === 0) return release(event, 'release')
    if (event.defaultPrevented) return
    runDeferred()
    const point = { x: event.clientX, y: event.clientY }
    const { pointerType } = pressed
    if (drags) dispatch(event, createInput(pointer.drag, { point, pointerType, time: event.timeStamp }))
    if (!dragsOver) return

    const over = document.elementFromPoint(event.clientX, event.clientY)
    dispatch(event, createInput(pointer.dragOver, { key: keyAt(over), point, pointerType }))
  }

  const handlers: DomHandlers = {
    keydown(event) {
      if (!accepts(event) || isComposing(event)) return false

      const root = rootAt(event.target)
      const target = event.target instanceof Element ? event.target : null
      if (!root || !target) return false

      const input = keyInput(event)
      if (target !== root && yieldsToNative(target, input)) {
        return declares(text.key) ? dispatch(event, createInput(text.key, { char: input.char, part: partAt(target), field: fieldOf(target) })) : false
      }
      if (!hears(instance.listens, input, orientationOf(root))) return false

      const { key, item, inside } = locate(target)
      if (item && inside && inOpenPopup(item, target)) return false

      const content = item !== null && holdsFocusable(item)
      return dispatch(event, toNav(createInput(input, { char: input.char, key, inside, content, part: partAt(target), field: fieldOf(target) }), directionOf(root, input)))
    },

    click(event) {
      if (!accepts(event)) return false
      return dispatch(event, createInput(pointer.press, { ...locate(event.target), part: partAt(event.target), backdrop: isBackdrop(event) }))
    },

    pointerdown(event) {
      if (!accepts(event) || pressed) return false

      const { key, inside } = locate(event.target)
      const root = rootAt(event.target)
      const scroller = drags && root ? scrollerBelow(event.target, root) : undefined
      pressed = { id: event.pointerId, key, pointerType: event.pointerType, claimed: false }
      document.addEventListener('pointermove', onPointerMove, { signal: controller.signal })
      document.addEventListener('pointerup', onPointerUp, { signal: controller.signal })
      document.addEventListener('pointercancel', onPointerCancel, { signal: controller.signal })
      return dispatch(event, createInput(pointer.down, {
        key,
        inside,
        part: partAt(event.target),
        point: { x: event.clientX, y: event.clientY },
        backdrop: isBackdrop(event),
        pointerType: event.pointerType,
        time: event.timeStamp,
        primary: event.isPrimary && event.button === 0,
        text: drags ? pressesText(event.target) : undefined,
        scroller: scroller ? scrollOf(scroller) : undefined,
      }))
    },

    pointermove(event) {
      if (pressed || event.buttons !== 0 || !accepts(event)) return false
      return dispatch(event, createInput(pointer.hover, { key: keyAt(event.target), point: { x: event.clientX, y: event.clientY } }))
    },

    touchmove(event) {
      return event.cancelable && pressed?.claimed === true
    },

    wheel(event) {
      if (!accepts(event)) return false
      const part = partAt(event.target)
      if (!spinning) return dispatch(event, createInput(pointer.wheel, { part }))

      return dispatch(event, createInput(pointer.spin, { part, delta: { x: event.deltaX, y: event.deltaY } }))
    },

    scroll(event) {
      const target = event.target
      if (!accepts(event) || !(target instanceof Element)) return false

      if (!('onscrollend' in target)) {
        clearTimeout(scrollEnds.get(target))
        scrollEnds.set(target, setTimeout(() => {
          scrollEnds.delete(target)
          send(createInput(scroll.end, { part: partAt(target), scroller: scrollOf(target) }))
        }, SCROLL_END_FALLBACK))
      }

      return dispatch(event, createInput(scroll.move, { part: partAt(target), scroller: scrollOf(target) }))
    },

    scrollend(event) {
      const target = event.target
      if (!accepts(event) || !(target instanceof Element)) return false
      return dispatch(event, createInput(scroll.end, { part: partAt(target), scroller: scrollOf(target) }))
    },

    pointerover(event) {
      if (!accepts(event) || !crosses(event.target, event.relatedTarget)) return false
      return dispatch(event, createInput(pointer.enter, { key: keyAt(event.target), part: partAt(event.target), pointerType: event.pointerType }))
    },

    pointerout(event) {
      if (!accepts(event) || !crosses(event.target, event.relatedTarget)) return false
      return dispatch(event, createInput(pointer.leave, { key: keyAt(event.target), part: partAt(event.target), to: partAt(event.relatedTarget), point: { x: event.clientX, y: event.clientY }, pointerType: event.pointerType }))
    },

    focusin(event) {
      if (!accepts(event)) return false
      if (event.target === focusing) {
        instance.observe(observed(true))
        return false
      }

      const key = keyAt(event.target)
      const part = partAt(event.target)
      if (isOwn(event.relatedTarget)) return dispatch(event, createInput(focus.move, { key, part }), true)

      return dispatch(event, createInput(focus.enter, { key, part }), true)
    },

    focusout(event) {
      if (seen.has(event) || !isOwn(event.target) || isOwn(event.relatedTarget)) return false

      pending.length = 0
      if (pressed) {
        const key = pressed.key
        endPress()
        send(createInput(pointer.cancel, { key }))
      }

      seen.add(event)
      send(createInput(focus.leave), false)
      return false
    },

    beforeinput(event) {
      if (!accepts(event) || event.isComposing || event.inputType === 'insertCompositionText') return false
      const field = fieldOf(event.target)
      if (!field) return false

      const data = event.data ?? event.dataTransfer?.getData('text/plain') ?? ''
      return dispatch(event, createInput(text.edit, { part: partAt(event.target), field, edit: { type: event.inputType, data } }))
    },

    input(event) {
      if (!accepts(event)) return false
      const field = fieldOf(event.target)
      return dispatch(event, createInput(text.change, { value: field?.value, part: partAt(event.target), field }))
    },

    toggle(event) {
      if (!accepts(event)) return false
      const open = (event as ToggleEvent).newState === 'open'
      const part = event.target instanceof Element ? elements.partOf(event.target) : undefined
      return dispatch(event, createInput(browser.toggle, { to: open, part }))
    },

    load(event) {
      if (!accepts(event)) return false
      return dispatch(event, createInput(browser.load, { part: partAt(event.target) }))
    },

    error(event) {
      if (!accepts(event)) return false
      return dispatch(event, createInput(browser.error, { part: partAt(event.target) }))
    },

    cancel(event) {
      if (!accepts(event)) return false
      const part = event.target instanceof Element ? elements.partOf(event.target) : undefined
      return dispatch(event, createInput(browser.cancel, { part }))
    },

    close(event) {
      if (!accepts(event)) return false
      const part = event.target instanceof Element ? elements.partOf(event.target) : undefined
      return dispatch(event, createInput(browser.close, { part }))
    },

    submit(event) {
      if (!accepts(event) || !(event.target instanceof HTMLFormElement)) return false
      const submitter = event.submitter
      const method = submitter instanceof HTMLButtonElement || submitter instanceof HTMLInputElement ? submitter.formMethod || event.target.method : event.target.method
      const value = submitter?.hasAttribute('value') ? (submitter as HTMLButtonElement).value : undefined
      return dispatch(event, createInput(browser.submit, { part: partAt(event.target), to: method, value }))
    },
  }

  const listen = (element: Element) => {
    const typed = element as HTMLElement

    const on = <EventType extends keyof HTMLElementEventMap>(type: EventType, handler: (event: HTMLElementEventMap[EventType]) => boolean, { passive = false } = {}) => {
      const listener = (event: HTMLElementEventMap[EventType]) => {
        if (handler(event)) event.preventDefault()
      }
      typed.addEventListener(type, listener, { passive, signal: controller.signal })
      return () => typed.removeEventListener(type, listener)
    }

    const attach: Record<DomEvent, () => () => void> = {
      keydown: () => on('keydown', handlers.keydown),
      click: () => on('click', handlers.click),
      pointerdown: () => on('pointerdown', handlers.pointerdown),
      pointermove: () => on('pointermove', handlers.pointermove),
      pointerover: () => on('pointerover', handlers.pointerover),
      pointerout: () => on('pointerout', handlers.pointerout),
      touchmove: () => on('touchmove', handlers.touchmove),
      wheel: () => on('wheel', handlers.wheel, { passive: !spinning }),
      scroll: () => on('scroll', handlers.scroll),
      scrollend: () => on('scrollend', handlers.scrollend),
      focusin: () => on('focusin', handlers.focusin),
      focusout: () => on('focusout', handlers.focusout),
      beforeinput: () => on('beforeinput', handlers.beforeinput),
      input: () => on('input', handlers.input),
      toggle: () => on('toggle', handlers.toggle),
      load: () => on('load', handlers.load),
      error: () => on('error', handlers.error),
      cancel: () => on('cancel', handlers.cancel),
      close: () => on('close', handlers.close),
      submit: () => on('submit', handlers.submit),
    }

    const stops = events.map((event) => attach[event]())

    return () => {
      for (const stop of stops) stop()
    }
  }

  const replayed = new WeakSet<Element>()

  const replayLoads = () => {
    if (!events.includes('load')) return

    for (const root of elements.roots()) {
      if (replayed.has(root) || !(root instanceof HTMLImageElement) || !root.complete || !root.currentSrc) continue

      replayed.add(root)
      send(createInput(root.naturalWidth > 0 ? browser.load : browser.error, { part: partAt(root) }))
    }
  }
  replayLoads()
  for (const [name, ms] of instance.state.timers) startTimer(name, ms)
  const unwatchLoads = elements.watchRoots(replayLoads)

  const disconnect = () => {
    if (receivers.get(elements) === receive) receivers.delete(elements)
    controller.abort()
    for (const handle of timers.values()) clearTimeout(handle)
    timers.clear()
    pending.length = 0
    pressed = null
    deferred.length = 0
    for (const animation of scrubs.values()) animation.cancel()
    scrubs.clear()
    for (const animation of heights.values()) animation.cancel()
    heights.clear()
    for (const handle of scrollEnds.values()) clearTimeout(handle)
    scrollEnds.clear()
    resizes?.disconnect()
    unwatchRoots()
    unwatchLoads()
  }

  const observe = () => instance.observe(observed())

  const receive = (input: Input) => void send(input as Input<Key>)
  receivers.set(elements, receive)

  return { ...handlers, events, listen, send: (input) => send(input), observe, paint, apply, flush, disconnect }
}
