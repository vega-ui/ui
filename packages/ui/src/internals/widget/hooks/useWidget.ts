import { FocusEvent, KeyboardEvent, MouseEvent, PointerEvent, SyntheticEvent, WheelEvent, useId, useLayoutEffect, useReducer, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import {
  Action,
  AnyShape,
  Attrs,
  connect,
  Connection,
  createElements,
  createInput,
  createWidget,
  Dispatched,
  DomEvent,
  ElementRegistry,
  Entry,
  eventsFor,
  spins,
  Input,
  KeyOf,
  lifecycle,
  OptionsOf,
  Part,
  SnapshotOf,
  Widget,
  WidgetEnvironment,
  WidgetInstance,
} from '@vega-ui/core'
import { mergeProps } from '@vega-ui/utils'

type Props = Record<string, unknown>

export interface Listeners {
  onKeyDown(event: KeyboardEvent): void
  onClick(event: MouseEvent): void
  onPointerDown(event: PointerEvent): void
  onPointerMove(event: PointerEvent): void
  onPointerOver(event: PointerEvent): void
  onPointerOut(event: PointerEvent): void
  onWheel(event: WheelEvent): void
  onFocus(event: FocusEvent): void
  onBlur(event: FocusEvent): void
  onChange(event: SyntheticEvent): void
  onToggle(event: SyntheticEvent): void
  onLoad(event: SyntheticEvent): void
  onError(event: SyntheticEvent): void
  onCancel(event: SyntheticEvent): void
  onClose(event: SyntheticEvent): void
  onSubmit(event: SyntheticEvent): void
}

const NATIVE = ['touchmove', 'scroll', 'scrollend', 'beforeinput'] as const

type NativeEvent = (typeof NATIVE)[number]

type PropEvent = Exclude<DomEvent, NativeEvent>

const isNative = (event: DomEvent): event is NativeEvent => (NATIVE as readonly DomEvent[]).includes(event)

const PROPS: Record<PropEvent, keyof Listeners> = {
  keydown: 'onKeyDown',
  click: 'onClick',
  pointerdown: 'onPointerDown',
  pointermove: 'onPointerMove',
  pointerover: 'onPointerOver',
  pointerout: 'onPointerOut',
  wheel: 'onWheel',
  focusin: 'onFocus',
  focusout: 'onBlur',
  input: 'onChange',
  toggle: 'onToggle',
  load: 'onLoad',
  error: 'onError',
  cancel: 'onCancel',
  close: 'onClose',
  submit: 'onSubmit',
}

export interface UseWidgetOptions<Sh extends AnyShape, D> extends Omit<WidgetEnvironment, 'id' | 'onError'> {
  readonly elements?: ElementRegistry<KeyOf<Sh>, D>
  readonly onError?: (error: unknown, source?: Input | Action) => void
}

export interface HandleOptions<Sh extends AnyShape, D> extends UseWidgetOptions<Sh, D> {
  readonly id: string
}

export type WidgetOptions<Sh extends AnyShape, D> = OptionsOf<Sh> | ((entries: readonly Entry<KeyOf<Sh>, D>[]) => OptionsOf<Sh>)

export interface WidgetHandle<Sh extends AnyShape, D = undefined> {
  readonly instance: WidgetInstance<Sh>
  readonly elements: ElementRegistry<KeyOf<Sh>, D>
  readonly listeners: Partial<Listeners>
  readonly connection: { current: Connection<KeyOf<Sh>> | null }
  subscribe(listener: () => void): () => void
  setOptions(options: WidgetOptions<Sh, D>): void
  settle(): void
  root(element: Element | null): void
  rootAt(name: string, output?: Part<SnapshotOf<Sh>, KeyOf<Sh>>): (element: Element | null) => void
  part(name: string, output?: Part<SnapshotOf<Sh>, KeyOf<Sh>>): (element: Element | null) => void
  send(input: Input<KeyOf<Sh>>): Dispatched
  merge(attrs: Attrs, props?: Props): Props
  listen(attrs: Attrs, props?: Props): Props
}

const resolve = <Sh extends AnyShape, D>(options: WidgetOptions<Sh, D>, elements: ElementRegistry<KeyOf<Sh>, D>) => (typeof options === 'function' ? options(elements.entries()) : options)

export const createHandle = <Sh extends AnyShape, D>(widget: Widget<Sh>, options: WidgetOptions<Sh, D>, { elements = createElements<KeyOf<Sh>, D>(), onError, ...environment }: HandleOptions<Sh, D>): WidgetHandle<Sh, D> => {
  const instance = createWidget(widget, resolve(options, elements), { ...environment, onError })
  const open = () => connect(instance, elements, { onError })
  const connection: { current: Connection<KeyOf<Sh>> | null } = { current: open() }
  const parts = new Map<string, (element: Element | null) => void>()
  const roots = new Map<string, (element: Element | null) => void>()
  const natives = new Map<string, () => void>()
  const subscribers = new Set<() => void>()
  const queued: Action<KeyOf<Sh>>[] = []
  let muted = false
  let missed = false

  const notify = () => {
    missed = false
    for (const subscriber of subscribers) subscriber()
  }

  instance.subscribe(() => {
    if (muted) missed = true
    else notify()
  })

  const forward = <E extends SyntheticEvent>(handle: (connection: Connection, event: E['nativeEvent']) => boolean) => (event: E) => {
    if (connection.current && handle(connection.current, event.nativeEvent)) event.preventDefault()
  }

  const all: Listeners = {
    onKeyDown: forward((current, event) => current.keydown(event)),
    onClick: forward((current, event) => current.click(event)),
    onPointerDown: forward((current, event) => current.pointerdown(event)),
    onPointerMove: forward((current, event) => current.pointermove(event)),
    onPointerOver: forward((current, event) => current.pointerover(event)),
    onPointerOut: forward((current, event) => current.pointerout(event)),
    onWheel: forward((current, event) => current.wheel(event)),
    onFocus: forward((current, event) => current.focusin(event)),
    onBlur: forward((current, event) => current.focusout(event)),
    onChange: forward((current, event) => current.input(event)),
    onToggle: forward((current, event) => current.toggle(event)),
    onLoad: forward((current, event) => current.load(event)),
    onError: forward((current, event) => current.error(event)),
    onCancel: forward((current, event) => current.cancel(event)),
    onClose: forward((current, event) => current.close(event)),
    onSubmit: forward((current, event) => current.submit(event as SubmitEvent)),
  }

  const events = eventsFor(widget.listens)
  const spinning = spins(widget.listens)
  const handledNatively = (event: DomEvent) => isNative(event) || (spinning && event === 'wheel')
  const propEvents = events.filter((event): event is PropEvent => !handledNatively(event))
  const nativeEvents = events.filter(handledNatively)
  const listeners: Partial<Listeners> = Object.fromEntries(propEvents.map((event) => [PROPS[event], all[PROPS[event]]]))

  const handleNatively = (current: Connection, event: Event) => {
    if (event.type === 'touchmove') return current.touchmove(event as TouchEvent)
    if (event.type === 'beforeinput') return current.beforeinput(event as InputEvent)
    if (event.type === 'wheel') return current.wheel(event as globalThis.WheelEvent)

    return current.scroll(event)
  }

  const onNative = (event: Event) => {
    const current = connection.current
    if (!current) return

    if (event.type === 'scrollend') return flushSync(() => current.scrollend(event))

    const handled = handleNatively(current, event)
    if (handled) event.preventDefault()
  }

  const listenNatively = (name: string, element: Element | null) => {
    natives.get(name)?.()
    natives.delete(name)
    if (!element || nativeEvents.length === 0) return

    for (const event of nativeEvents) element.addEventListener(event, onNative, { passive: false })
    natives.set(name, () => {
      for (const event of nativeEvents) element.removeEventListener(event, onNative)
    })
  }

  const merge = (attrs: Attrs, props: Props = {}) => mergeProps<Props>(attrs, props)

  return {
    instance,
    elements,
    listeners,
    connection,
    subscribe(subscriber) {
      subscribers.add(subscriber)
      return () => subscribers.delete(subscriber)
    },
    setOptions(next) {
      muted = true
      try {
        connection.current?.observe()
        queued.push(...instance.setOptions(resolve(next, elements)).actions)
      } finally {
        muted = false
      }
    },
    settle() {
      if (missed) notify()
      if (queued.length > 0) connection.current?.apply(queued.splice(0))
    },
    root: (element) => {
      elements.setRoot(element)
      listenNatively('root', element)
    },
    rootAt(name, output) {
      let ref = roots.get(name)
      if (!ref) roots.set(name, (ref = (element) => {
        elements.setRoot(element, name, output)
        listenNatively(name, element)
        if (output) connection.current?.paint()
      }))
      return ref
    },
    part(name, output) {
      let ref = parts.get(name)
      if (!ref) parts.set(name, (ref = (element) => {
        elements.setPart(name, element, output)
        if (output) connection.current?.paint()
      }))
      return ref
    },
    send: (input) => (connection.current ?? (connection.current = open())).send(input),
    merge,
    listen: (attrs, props = {}) => mergeProps<Props>(attrs, props, listeners as unknown as Props),
  }
}

const drifted = <Sh extends AnyShape>(widget: Widget<Sh>, instance: WidgetInstance<Sh>) => {
  const { options } = instance.state
  const state = instance.state as Record<string, unknown>

  return widget.shape.owned.some((name) => (options as Record<string, unknown>)[name] !== undefined && !Object.is(state[name], (options as Record<string, unknown>)[name]))
}

export const useWidget = <Sh extends AnyShape, D = undefined>(widget: Widget<Sh>, options: WidgetOptions<Sh, D>, settings: UseWidgetOptions<Sh, D> = {}): WidgetHandle<Sh, D> => {
  const id = useId()
  const [handle] = useState(() => createHandle(widget, options, { ...settings, id }))
  const [, rerender] = useReducer((n: number) => n + 1, 0)
  const latest = useRef(options)
  latest.current = options
  const report = useRef(settings.onError)
  report.current = settings.onError
  handle.setOptions(options)

  useLayoutEffect(() => {
    handle.settle()
  })

  useLayoutEffect(() => {
    const connection = handle.connection.current ?? connect(handle.instance, handle.elements, { onError: (error, action) => report.current?.(error, action) })
    handle.connection.current = connection

    const unsubscribeInstance = handle.instance.subscribe(() => {
      if (drifted(widget, handle.instance)) rerender()
    })

    let scheduled = false
    const sync = () => {
      scheduled = false
      if (typeof latest.current === 'function') {
        handle.connection.current?.observe()
        handle.connection.current?.apply(handle.instance.setOptions(resolve(latest.current, handle.elements)).actions)
      }
      handle.connection.current?.flush()
    }
    const unsubscribe = handle.elements.subscribe(() => {
      if (scheduled) return
      scheduled = true
      queueMicrotask(sync)
    })
    sync()
    connection.send(createInput(lifecycle.connect))

    return () => {
      unsubscribeInstance()
      unsubscribe()
      connection.disconnect()
      handle.connection.current = null
    }
  }, [handle, widget])

  useLayoutEffect(() => {
    handle.connection.current?.observe()
    handle.connection.current?.flush()
  })

  return handle
}
