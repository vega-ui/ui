# @vega-ui/core

The logic of composite widgets, written as one pipeline:

```
event → normalize → step(state, input) → { state, actions } → output(state) → DOM
```

The adapter does the first and the last arrow. Everything in between is plain data and pure functions with no dependency on React or the DOM, so a widget runs and is tested in node.

Five concepts: **State** (an immutable snapshot), **Input** (a value with a payload), **Step** (`(state, input) → result`), **Action** (data the adapter executes after the commit) and **Output** (pure attributes per part).

## State

```ts
import { state, controlled, internal, matching, source } from '@vega-ui/core'

const items = source({ key: (fruit: Fruit) => fruit.id, disabled: (fruit) => fruit.disabled ?? false, label: (fruit) => fruit.label })

const shape = state({
  options: { items: [] as readonly Fruit[], mode: 'single' as 'single' | 'multiple' },
  owns: {
    value: controlled([] as readonly string[]),
    active: controlled(null as string | null),
  },
  internal: {
    anchor: internal(null as Anchor<string> | null),
    typed: internal(''),
  },
  observes: {
    shown: matching('listbox', ':popover-open'),
  },
  collection: (options) => items.of(options.items),
})
```

`controlled(fallback, initial)` is a value the parent may control through `value`, `defaultValue` and `onChangeValue`; `initial(options)`, when given, starts an uncontrolled value from the options in place of `defaultValue`, so a rule like "the country of the default number wins over `defaultCountry`" lives in the widget, and a reset step calls the same function. `internal(fallback)` is a value only the widget and its output see. `matching(part, selector)` is a value the browser owns: the adapter reads whether the part matches the selector before every dispatch, so a popover closed by light dismiss is `shown: false` in the next snapshot without a line of logic, and the parent's `open` stays what it is, a command. `reading(read, fallback)` is a value from outside the page that the adapter reads the same way, with `read(options)`, like whether a group of tooltips is warm: the step stays pure and reads it from the snapshot. The shape gives a typed field per value, so `shape.active.set(state, key)` returns a new snapshot and `shape.ancor` is a type error, and a reader per option, `shape.options.mode`. Every value takes a name of its own: a name the snapshot or the shape already uses, like `id`, `focused` or `create`, the name of another value, or an option named like an owned value is a type error.

A snapshot holds the options, the collection, the `id` of the widget, the running timers, whether the widget is focused, the observed values and the owned and internal values. Nothing else: a derived value is a function of the snapshot, and an element id is `idOf(state, 'option', key)`. Everything in it is plain data, so a snapshot serializes.

## Collection

`source(spec).of(items)` builds the collection once per items array: `order`, `index`, `disabled` and `labels`. The functions in `collection` walk it and skip disabled items: `next`, `previous`, `first`, `last`, `nearest`, `between`, `selectable`, `findByLabel`.

## Inputs

Inputs are values. A typo does not compile.

```ts
key.arrowDown, key.with(key.a, mod.mod), key.printable
nav.forward, nav.backward, nav.first, nav.last, nav.pageForward, nav.pageBackward
pointer.down, pointer.press, pointer.drag, pointer.dragOver, pointer.release, pointer.cancel, pointer.hover, pointer.enter, pointer.leave, pointer.wheel, pointer.spin
scroll.move, scroll.end
layout.resize, layout.viewport
focus.enter, focus.move, focus.leave
text.edit, text.change, text.select
browser.toggle, browser.cancel, browser.close, browser.submit, browser.reset, browser.animationEnd, browser.flushed
lifecycle.connect, lifecycle.options
measure.done
timer('typeahead'), command('focus')
```

`layout.resize` arrives when a root of the widget changes its size, from a `ResizeObserver` the adapter keeps on every root, also on one registered later, like a dialog mounted on open, with the root's name as `part`; `layout.viewport` arrives when the window resizes or the visual viewport resizes or scrolls, like when an on-screen keyboard opens. The adapter observes them only for a widget that declares them, so a step asks for a measure and no component subscribes on its own. `lifecycle.connect` arrives once the adapter is connected and the elements are registered; `lifecycle.options` arrives when the parent changes a value it controls, such as `open`, so a step can answer with `act.showPopover`, or an option the shape names in `follows`, like the page a scroller follows, so a step can scroll to it. A parent that keeps its value does not trigger it, and neither does a change of any other option, which the steps read from the snapshot when they need it. The parent sets options while it renders, so `setOptions` never calls an `onChangeX`: a step answering `lifecycle.options` follows the options with what it shows, like the text of a field or an open popover, and never changes an owned value, which a strict widget refuses with an error. `defineInput(type, name)` declares a new kind of input for an adapter of your own. `text.edit` arrives from a cancelable `beforeinput` with the `field` before the edit, its `value` and `selection`, and the `edit`, the `inputType` and the inserted `data`, so a step masks the text and answers `handled` with `act.setText(part, value, selection)`; a composition is left to the browser and arrives as `text.change`, like any change the browser makes without an edit, such as autofill. `act.setText` writes through the native value setter, so a framework's `onChange` reports the text, and moves the caret only while the field is focused; `act.commitText(part, value)` also dispatches `change`, like a native picker that commits a value, and `act.commit(part)` dispatches only `change`, like a text field the user edited and left, since the browser does not count a text written by the adapter as an edit of the user. `browser.reset` arrives once a form reset restored the defaults. `browser.load` and `browser.error` arrive from the `load` and `error` of a root, like an image. `text.select` arrives with the `field` when the selection of a focused text field of the widget changes or the field takes the focus, from the `selectionchange` of the document, and once the pointer is released while it selects. A text field that is the root itself hands its caret keys and typed characters to the widget, which leaves to the browser the ones no step answers; a text field inside an item yields them to the browser. A text field root without `aria-orientation` is horizontal, so ArrowUp and ArrowDown stay keys a step can use to step a value.

The adapter turns the arrows into the logical directions of `nav` from the orientation and the writing direction with `toNav`, so a step never knows about RTL. A pointer input carries the `key` of the item and the name of the `part` it hit, so `input.part === 'trigger'` tells a press on the trigger from a press on an option. `pointer.enter` and `pointer.leave` arrive once per part or item the pointer crosses, not per child element, with its `pointerType`; a leave carries the part the pointer moves to as `to`, so a step tells a move from the trigger onto its tooltip from a move away. A key input carries `inside` when it came from a control inside the item and `content` when the item holds focusable content, so a grid cell sends Enter into its button and leaves the arrows of its input alone. A `command` may carry `keys`, a list of keys, like the cells of the page that scrolled into view.

## Steps and actions

```ts
const step = listening<S>([key.enter, key.tab], (state, input) => {
  if (input.is(key.enter) && state.active != null) return handled(state, [act.click(state.active)])
  if (input.is(key.tab) && state.open) return keep(shape.value.set(state, state.active))
  return undefined
})
```

`listening(inputs, step)` declares the inputs a step reads from the browser, and the widget collects them as `widget.listens`. The adapter listens only to the events that give a declared input, so a widget without a pointer step never sees a `pointermove`, and delivers a key only when a step declares it or the direction it becomes, so a key no step reads stays with the browser, like the arrows of a native range. Focus is always followed, and a `command`, a `timer`, a `lifecycle` input or an input of your own needs no declaration.

`handled` prevents the browser default, `keep` leaves it, `stop` ends without handling, `undefined` passes the input on to the next step and then to the widget above. `input.key` is typed by the key of the collection, so a step never casts. Actions are data: `act.focus(key)`, `focusInside(key, 'first' | 'next' | 'previous')`, `focusPart(part)`, `reveal(key)`, `click(key)`, `timer(name, ms)`, `cancelTimer(name)`, `showPopover(part)`, `hidePopover(part)`, `send(part, input, payload)`, `measure(request)`, `awaitAnimations(part)`, `showModal(part)`, which answers with `browser.toggle` once the dialog is shown, `closeDialog(part, returnValue)`, `watchKeys()` / `unwatchKeys()`, between which a key pressed anywhere on the page reaches the steps, like `Escape` for a tooltip opened by hover, `claimPointer()`, which takes the pressed pointer from the page: until its release a touch does not scroll it, and the click that ends the press on the widget is swallowed, `scrub(part, { keyframes, pseudoElement, progress })`, which seeks one paused animation of the part, created on the first scrub, to `progress` between 0 and 1, like the backdrop that fades with a dragged sheet, so a move writes no style the browser has to recompute, `stopScrub(part)`, which cancels it, `flushStyles(part)`, which applies the pending styles of the part and answers with `browser.flushed`, so the next state starts its transitions from the one just written, `scrollTo(part, { left, top, behavior })`, which scrolls the part at once, so an imperative `next()` moves a scroller before it returns, and `emit(name, value)`, which calls the `on<Name>` callback of the options with the value, for an event that is not a value the widget owns, like the page a scroller settled on. `send` delivers an input to the widget whose root is registered as that part, so a widget drives a widget inside it without sharing state. `measure({ name, parts, items, rect, scroll, styles, viewport })`, where `viewport` is the layout viewport without scrollbars and the `keyboardInset` an on-screen keyboard covers, asks the browser for geometry, which is expensive, so only a step that needs it asks: the adapter reads every request of the moment at once, after the DOM shows the new state, and answers each with a `measure.done` input whose `measured` holds plain numbers by part and by item key, with the `name` of the request, so a step tests it in node like any other input; an element that is not rendered is missing from the answer. A drag never overtakes the measure its press asked for: the adapter answers it before the first move. `awaitAnimations(part)` answers with `browser.animationEnd` once the animations the part runs after the change have finished, at once when none runs. A framework may render the new state after the adapter reads the animations, so the attribute that starts them goes to the `live` channel of the part, which the adapter writes before the actions. The adapter executes them after the state is committed, so a step never touches the world; an action that throws is reported to `onError` and the others still run.

## Widget

```ts
export const listbox = defineWidget({
  state: shape,

  step: [
    roving({ active: shape.active, strategy: 'activedescendant' }),
    selection({ value: shape.value, active: shape.active, anchor: shape.anchor, mode: shape.options.mode, strategy: 'activedescendant' }),
    typeahead({ active: shape.active, typed: shape.typed, strategy: 'activedescendant' }),
  ],

  output: {
    option: shape.part(
      (state, key) => [idOf(state, 'option', key), state.active === key, state.value.includes(key), state.collection.disabled.has(key)] as const,
      ([id, active, selected, disabled]) => ({ role: 'option', id, 'aria-selected': selected, 'aria-disabled': disabled || undefined, 'data-active': active || undefined }),
    ),
  },

  invariants: {
    activeExists: {
      check: (state) => state.active == null || collection.isNavigable(state.collection, state.active),
      repair: (state) => shape.active.set(state, collection.first(state.collection)),
    },
    valueSelectable: {
      check: (state) => state.value.every((key) => collection.isNavigable(state.collection, key)),
      repair: (state) => shape.value.set(state, state.value.filter((key) => collection.isNavigable(state.collection, key))),
    },
  },
})
```

The steps run in order and the first answer wins. A part declares what it reads with a selector; the widget renders it again only when one of those values changes.

A part may carry two more channels, each with a selector of its own, that the DOM adapter writes itself, without a render of the framework:

```ts
const sheet = {
  ...shape.part((state) => [state.open] as const, ([open]) => ({ role: 'dialog', 'data-open': open })),
  live: shape.part((state) => [state.drag] as const, ([drag]) => ({ '--sheet-drag': drag === null ? undefined : `${drag}px`, 'data-dragging': drag !== null })),
  props: shape.part((state) => [state.mixed] as const, ([mixed]) => ({ indeterminate: mixed })),
}
```

`live` holds values that change on every frame, like the offset of a drag: a name starting with `--` is a CSS variable on the element, any other is an attribute, removed when `undefined` or `false`. `props` holds what only a property or a method of the element can say: `indeterminate`, or `invalidAs`: the attributes of an `<input>` that the browser would find invalid in the same way (`{ type: 'date', min, value }`, `{ required: true }`), so the field gets the browser's own message in the language of the page through `setCustomValidity`, and `undefined` for a valid field. The browser and the parent own `value`, `checked`, `open` and `selected`, so `props` cannot write them; an action does. A channel is built with `shape.part(select, render)` like the part itself, so its renderer gets the typed selection and a value of the wrong type is a type error. The adapter writes a channel after every dispatch and on `flush`, and only when its selection changed, for the elements registered with the part: `setItem(key, element, data, part)`, `setPart(name, element, part)`, `setRoot(element, name, part)`.

An invariant is what must hold in every snapshot. `createWidget` checks every invariant after every commit, from the first snapshot on. In strict mode (tests) a broken invariant throws. Otherwise it is repaired and reported to `onRepair`. A repair never writes a value the parent controls: the parent owns it, so the core restores it after the repair, the widget filters it on output, and `onRepair` tells the developer.

```ts
const widget = createWidget(listbox, options, { id, onRepair, onError, onDispatch })

widget.dispatch(input, observed)   // { answer: 'handled' | 'keep' | 'stop' | 'pass', actions }
widget.observe({ focused: true })  // browser values without an input
widget.setOptions(options)         // every render; returns the actions of lifecycle.options
widget.render(listbox.output.option, key)
widget.subscribe(listener)
```

`id` is required and comes from the framework (`useId` in React), so the server and the client render the same ids and two copies of the library on one page never share one; the core has no counter of its own. `onDispatch` receives every transaction as `{ input, answer, actions, before, after }`, the trace of the widget. Every dispatch is a transaction: a step that throws leaves the state as it was and reports to `onError`. A changed owned value calls its `onChangeX` once and keeps the new value until the next `setOptions` brings the parent's answer; a callback that throws is reported to `onError`, and the other callbacks, the listeners and the actions still run; a parent that keeps its value wins there. `setOptions` never calls `onChangeX`.

## DOM

```ts
const elements = createElements<string, { value: string }>()
elements.setRoot(root)
elements.setRoot(popup, 'content')
const unregister = elements.setItem('banana', li, { value: 'banana' })
elements.entries()
elements.within(page)
elements.subscribe(listener)

const connection = connect(widget, elements, { onError })
connection.listen(root)
connection.paint()
connection.send(createInput(lifecycle.connect))
connection.disconnect()
```

`connect` is the adapter: it builds inputs from events and executes the actions of every dispatch. A framework attaches its own listeners for `connection.events` and forwards the native events to `connection.keydown`, `click`, `pointerdown`, `pointermove`, `pointerover`, `pointerout`, `focusin`, `focusout`, `beforeinput`, `input` and `toggle`; `listen(root)` attaches them natively. `events` are the events that give an input some step declares, plus `focusin` and `focusout`: `keydown` for a `key` or `nav` input, `click` for `pointer.press`, `pointerdown` for `pointer.down`, `drag`, `dragOver`, `release` and `cancel`, `touchmove` for `drag`, which a framework attaches to the root itself with `passive: false` before any touch starts, since a browser decides at the start of a touch whether a page may hold its scroll, `wheel` for `pointer.wheel`, attached as passive, or for `pointer.spin` with the `delta` of the wheel, attached as not passive and natively for a widget that declares it, so a step keeps the page from scrolling, `scroll` for `scroll.move` and `scrollend` for `scroll.end`, which a framework attaches to the root natively as well, since they do not bubble, `pointermove` for `pointer.hover`, `pointerover` and `pointerout` for `pointer.enter` and `pointer.leave`, `beforeinput` for `text.edit`, which a framework attaches natively, `input` for `text.change`, `selectionchange` and `focusin` of the document for `text.select`, `reset` of the document for `browser.reset`, `toggle` for `browser.toggle`, `load` and `error` for `browser.load` and `browser.error`, and `cancel`, `close` and `submit` of a `<dialog>` for `browser.cancel`, `browser.close` and `browser.submit`, the last with the method of the form as `to` and the `value` of the submitter. A press on the backdrop of a modal dialog carries `backdrop`. A handler does not cancel the event itself: it returns `true` when the browser default must be prevented, and the caller prevents it through its own event, so a framework's handlers above the widget see `defaultPrevented`. The adapter listens to the page, the document, the window and the `ResizeObserver` of the roots, only once a root registers, so a connection made on the server or for a render that never commits touches nothing.

- A widget may have several roots, like a trigger and a popover in the top layer with no common ancestor but `body`: `setRoot(element, name)` registers one more, and the main one is named `root`. Each root is also the part of its name, so a step tells a key in the content from a key on the trigger by `input.part`. An event belongs to the widget when its target is inside any of its roots, the key, the orientation and the writing direction come from the nearest one, a focus moving between two roots is `focus.move`, not a leave, and one event that bubbles through two roots of the widget, as a React portal delivers, is dispatched once
- The user's handler runs first: an event with `defaultPrevented`, or one an inner widget already handled, is skipped, and so is an event a framework delivers to two handlers or one whose target is outside the root in the DOM, as a React portal delivers. `handled` asks to prevent the default of keydown and click, `keep` does not
- Before every dispatch the adapter reads the browser values the shape `observes`, and `focused`, and hands them to the widget with the input, so they are in the snapshot the steps see
- Arrows become `nav` directions by `aria-orientation` and the `dir` of the root (`:dir(rtl)`, the same direction CSS can match), read on every key that RTL turns into another direction, so a `dir` changed on an ancestor applies at once, with `nav.up` and `nav.down` for a `grid` or `treegrid` role and a horizontal axis for a `tablist`, `menubar` or `toolbar` without `aria-orientation`; the key of an item comes from `elements.keyOf` of the event target, and `inside` tells that the event came from a control inside the item, like a button in a grid cell
- `send(input)` dispatches an input without an event and runs its actions, for a `command(name)` a framework sends itself
- Inside text entry, caret keys and printable characters without a modifier go to the browser, and so does every key from a control inside an item whose popup is open: `aria-expanded="true"` on the control, or an open popover or dialog inside the item
- `focusInside` focuses the first focusable element of an item, or the next or previous one from the focused element, cycling; the focusable elements are links, enabled controls, editable elements and elements with a `tabindex` outside `hidden` and `inert` subtrees
- A pointer press owns the pointer until release through document listeners; a move with `buttons === 0` counts as a release, and a focus leaving the root cancels the press. The press carries its `time`, whether it is `primary` (the primary pointer and button), and, for a widget that declares `drag`, whether it pressed `text` (a field or selected text) and the `scroller` between the target and the root that scrolls vertically, so a sheet lets a list scroll before it drags; the release carries its `point` and `time`, the cancel only its `time`, since the browser gives it no point. A move of the pressed pointer is `pointer.drag` with its `point`, `pointerType` and `time`, like the offset of a drawer, and `pointer.dragOver` adds the key under the pointer, like the cells of a range in a grid: only a widget that declares `dragOver` pays for the hit test, which costs more than the rest of the frame
- `focusin` and `focusout` across the root border set `focused` and dispatch `focus.enter` / `focus.leave`; a focus moving between two items inside the root is `focus.move`
- Timers fire back as `timer(name)` inputs; an action that cannot run yet, like focusing an element that is not rendered, waits and is retried with `connection.flush()` until it runs, and so does a `focus` whose element did not take the focus, like a cell in an `inert` page; a later focus replaces a waiting one, a waiting action is dropped when its key leaves the collection or the focus leaves the root, while an action for a key the collection never had, like a cell of the next page, waits for it to register, and a focus the connection moved itself is not dispatched back
- `entries()` lists the registered items in DOM order as `{ key, data }`, without the elements, for a widget whose items come from the DOM rather than from an array. The order is cached until an item registers or a registered element is added, removed or moved in the root's subtree, which a `MutationObserver` on the root follows (a text change inside a cell does not re-sort); `version` and `subscribe` tell a framework when to rebuild its collection; `within(container)` lists the keys of the items inside an element, like the cells of the page that scrolled into view

## Fragments

A fragment is a step any widget composes. It is generic over the key and the fields it needs, and it never knows about other fragments.

- `roving({ active, strategy, hover, page, wrap })` moves the active key with `nav`, on `pointer.down`, with `hover` under the pointer and with `page` by that many items on PageUp and PageDown, from the last item to the first and back with `wrap`, and asks the adapter to `focus` or `reveal` it
- `selection({ value, active, anchor, mode, strategy, keys })` follows the APG listbox: a press or one of `keys` (Space by default) toggles, Shift+Arrow moves and toggles, Shift+Space selects from the most recently selected key to the active one, Ctrl+Shift+Home/End selects to the first or last key, Mod+A selects all. The anchor is the most recently selected key and is ignored once it is no longer selected or present, so nothing has to reset it. The same fragment selects in two dimensions and in ranges: `mode` may be `'range'`, where the value holds the two edges and every key between them by `compare` is selected; `extend: 'range'` makes Shift+Arrow extend from the anchor instead of toggling; `selectable`, `compare`, `between`, `resolveRange` and `all` give a grid its own order and its own keys between two cells; `extension` and `gesture` are fields for an extension in progress (it continues only while it ends on the active key, so a move elsewhere starts a new one) and for a pointer drag (`pressed`, `dragging`, `dragged`, so the click that ends a drag toggles nothing). The returned step carries verbs for the widget's own steps: `isSelected`, `edges`, `toggle`, `extend(state, from, to)`, `selectAll`, `press`, `drag`
- `createGridLayout({ positions, flags, isExcluded, compare })` lays out a grid from the key, row and column of every cell: the rows, the columns, the reading order and the collection, with the excluded cells kept out of the navigation; `gridNeighbor(layout, from, intent, wrap)` finds the cell in a direction (`forward`, `backward`, `up`, `down`, `rowStart`, `rowEnd`, `gridStart`, `gridEnd`, `pageUp`, `pageDown`) with `'horizontal'`, `'vertical'` or `'both'` wrap, and `gridBetween(layout, from, to)` lists the cells between two keys in reading order
- `typeahead({ active, typed, strategy, enabled, delay })` finds an option by its typed letters, cycles on a repeated letter, keeps the buffer while its timer runs and drops it when the timer fires or the focus leaves

## Tests

`simulate` lives in `@vega-ui/core/test`, so it never reaches a bundle.

```ts
const widget = simulate(listbox, { items: fruits, mode: 'multiple', defaultActive: 'apple' })

widget.send(key.with(key.arrowDown, mod.shift))

expect(widget.state.value).toEqual(['apple', 'banana'])
expect(widget.actions).toEqual([act.reveal('banana')])
```

`simulate` runs in node, turns the arrows into directions by its `orientation` and `rtl`, and enforces every invariant after every send. It refuses an input the adapter would not deliver, one from a browser event no step of the widget declares, also a form reset, a resize or a selection change the adapter follows on the page itself, or a key no step reads, so a test never passes on an input the page never sees.
