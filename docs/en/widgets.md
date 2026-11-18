# Writing Widgets

How the behavior of composite components is written on `@vega-ui/core` and `@vega-ui/widgets`: the pipeline, a widget written from scratch, and the details of every part. Read [Architecture](./architecture.md#widgets) first for the rules this page applies.

## When a Component Needs a Widget

A component gets a widget when it has behavior the native element does not give: a focus that moves between items, a selection, a popup the keyboard drives, a mask over a text field, a drag. `Listbox`, `Select`, `Grid`, the pickers, `Calendar`, the fields, `Slider`, `Sheet` and `Tooltip` have one. A component that is close to its native element, like `Button` or `Switch`, has none: the browser already does what it should.

The widget is plain TypeScript with no React and no DOM. It runs and is tested in node, and an adapter for another framework can reuse it as it is.

| Package | Holds |
|---|---|
| `@vega-ui/core` | The pipeline: state, inputs, steps, actions, output, the widget instance, the DOM adapter `connect`, the fragments, `simulate` in `@vega-ui/core/test` |
| `@vega-ui/widgets` | The widgets of the components, one entry point per folder: `@vega-ui/widgets/listbox`, `@vega-ui/widgets/select`. A folder shared by several widgets, like `mask` or `drag`, is a segment and is closed in `exports` |
| `packages/ui/src/internals/widget` | The React adapter: `useWidget`, `useOutput`, `useItem`, `usePart`, `useSnapshot` and the diagnostics |

## The Pipeline

```
event → normalize → step(state, input) → { state, actions } → output(state) → DOM
```

1. The adapter turns a browser event into an **input**: `key.arrowDown` becomes `nav.forward` for a vertical list, a click on an option becomes `pointer.press` with its `key`.
2. The widget runs its **steps** in order on the **state** and the input. The first step that answers wins.
3. The answer is a new state and a list of **actions**. The widget commits the state, checks the invariants and calls `onChangeX` for every owned value that changed.
4. The **output** turns the new state into attributes per part, and the adapter writes them.
5. The adapter executes the actions: focus, scroll, show a popover, start a timer. A timer fires back as an input, a measure answers with one.

A step never touches the world. Everything between the first and the last arrow is data, so a test is a list of inputs and the snapshots they lead to.

## Tutorial: A Tag List

The tutorial writes a tag list: a row of tags, the arrows move the focus between them, Home and End go to the ends, Delete and Backspace ask the parent to remove the focused tag, and once the parent removed it the focus goes to its neighbour.

### 1. The Pattern

Start from the [APG](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern, here the [toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/): the root is `role="toolbar"`, one tag is in the tab order with `tabIndex={0}` and the others have `-1` (a roving tab index), the arrows follow the writing direction, Home and End go to the first and the last tag. Write down every part, its role and attributes, and every key before the first line of code.

### 2. State

```ts
import { act, collection, controlled, defineWidget, Entry, handled, key, listening, roving, source, state } from '@vega-ui/core'

export interface TagData {
  readonly label: string
  readonly disabled: boolean
}

export type TagEntry = Entry<string, TagData>

const tags = source({
  key: (entry: TagEntry) => entry.key,
  disabled: (entry) => entry.data.disabled,
  label: (entry) => entry.data.label,
})

export const tagListShape = state({
  options: {
    items: [] as readonly TagEntry[],
    onRemove: undefined as ((key: string) => void) | undefined,
  },
  owns: { active: controlled(null as string | null) },
  collection: (options) => tags.of(options.items),
})

type TagListSnapshot = typeof tagListShape.__snapshot
```

- `options` are the values the parent gives on every render, callbacks included. The fallbacks give their types.
- `owns` are the values the parent may control. `active: controlled(null)` gives the options `active`, `defaultActive` and `onChangeActive` without a line more.
- `collection` builds the ordered keys with their flags from the options. `source(spec).of(items)` builds it once per items array, so an equal render recomputes nothing.
- `tagListShape.active` is a typed field: `tagListShape.active.set(state, 'red')` returns a new snapshot, and `tagListShape.actve` does not compile.

### 3. Steps

The arrows, Home and End are the `roving` fragment. Removing is a step of the widget:

```ts
const removing = listening<TagListSnapshot>([key.delete, key.backspace], (state) => {
  if (state.active === null) return undefined

  return handled(state, [act.emit('remove', state.active)])
})
```

- `listening(inputs, step)` declares the browser inputs the step reads. The adapter listens only to the events that give a declared input, so a key no step declares stays with the browser.
- `handled` prevents the browser default, `keep` leaves it, `undefined` passes the input to the next step.
- The step does not remove anything: the tags belong to the parent. `act.emit('remove', key)` calls `onRemove(key)` from the options after the commit.

### 4. Output

```ts
const tabStopOf = (state: TagListSnapshot) => {
  if (state.active !== null && collection.isNavigable(state.collection, state.active)) return state.active

  return collection.first(state.collection)
}

export const tagListWidget = defineWidget({
  state: tagListShape,

  step: [
    roving({ active: tagListShape.active, strategy: 'focus' }),
    removing,
  ],

  output: {
    root: tagListShape.part(() => [] as const, () => ({ role: 'toolbar' })),
    tag: tagListShape.part(
      (state, key) => [tabStopOf(state) === key, state.collection.disabled.has(key)] as const,
      ([focusable, disabled]) => ({ tabIndex: focusable ? 0 : -1, 'aria-disabled': disabled || undefined }),
    ),
  },
})
```

A part is a selector and a renderer. The selector lists what the part reads as a tuple, and the renderer builds the attributes from that tuple only. A tag renders again only when its tuple changes, so an arrow press renders two tags, not all of them. `tabStopOf` is derived, not stored: the tab stop is the active tag when it can take the focus, otherwise the first one, so the server HTML has a tab stop before anything is focused.

### 5. Invariants

The parent removes the focused tag, and `active` names a key that is gone. An invariant says what must hold in every snapshot, with a repair:

```ts
export const tagListWidget = defineWidget({
  // state, step, output as above

  invariants: {
    activeExists: {
      check: (state) => state.active === null || collection.isNavigable(state.collection, state.active),
      repair: (state, before) => {
        const position = state.active === null ? undefined : before.collection.index.get(state.active)
        if (position === undefined) return tagListShape.active.set(state, null)

        return tagListShape.active.set(state, collection.nearest(state.collection, position))
      },
    },
  },
})
```

`repair(state, before)` gets the snapshot before the commit, so the active tag moves to the tag that took the place of the removed one. New options broke the invariant, so the repair is silent and calls no `onChangeActive`, like a native `<select>` that loses its selected option without a `change` event. A step that broke it would be a bug: strict mode throws.

### 6. Node Tests

```ts
import { describe, expect, it, vi } from 'vitest'
import { act, key } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { TagEntry, tagListWidget } from '../widget'

const tagsOf = (...labels: string[]): readonly TagEntry[] => labels.map((label) => ({ key: label, data: { label, disabled: false } }))

describe('Critical User Paths', () => {
  it('asks the parent to remove the focused tag', () => {
    const onRemove = vi.fn()
    const tagList = simulate(tagListWidget, { items: tagsOf('red', 'green', 'blue'), defaultActive: 'red', onRemove }, { orientation: 'horizontal' })

    tagList.send(key.arrowRight).send(key.delete)

    expect(tagList.answer).toBe('handled')
    expect(tagList.actions).toEqual([act.emit('remove', 'green')])
  })
})

describe('Edge Cases', () => {
  it('moves the focus to the neighbour of a removed tag', () => {
    const tagList = simulate(tagListWidget, { items: tagsOf('red', 'green', 'blue'), defaultActive: 'green' }, { orientation: 'horizontal' })

    tagList.setOptions({ items: tagsOf('red', 'blue') })

    expect(tagList.state.active).toBe('blue')
  })
})
```

`simulate` runs the widget in strict mode and turns the arrows into directions by its `orientation` and `rtl`, like the adapter. It refuses an input no step declares, so `tagList.send(key.escape)` throws: a test never passes on a key the page never delivers. Write every key of the pattern as a list of inputs and the snapshots or actions it leads to.

### 7. The React Component

The component is a thin adapter: it hands the props to the widget, registers the elements and spreads the output. It holds no conditions about keys or focus.

```tsx
const TagListContext = createContext<WidgetHandle<typeof tagListWidget.shape, TagData> | null>(null)

export const TagList = ({ onRemove, children, ...props }: TagListProps) => {
  const handle = useWidget(tagListWidget, (items: readonly TagEntry[]) => ({ items, onRemove }), widgetEnvironment)
  const attrs = useOutput(handle, tagListWidget.output.root)

  return (
    <TagListContext.Provider value={handle}>
      <div ref={handle.root} {...handle.listen(attrs, props)}>{children}</div>
    </TagListContext.Provider>
  )
}

export const Tag = ({ value, disabled = false, children, ...props }: TagProps) => {
  const handle = useContext(TagListContext)!
  const ref = useItem(handle, value, { label: children, disabled })
  const attrs = useOutput(handle, tagListWidget.output.tag, value)

  return <span ref={ref} {...handle.merge(attrs, props)}>{children}</span>
}
```

- `useWidget(widget, options, widgetEnvironment)` creates the widget once and passes it the options on every render. The options are a function of the registered items here: the tags come from the DOM in document order, as `{ key, data }` entries.
- `useItem(handle, key, data)` registers an item element with its data.
- `useOutput(handle, part, key)` renders a part and subscribes to it, so a tag re-renders only when its attributes change.
- `handle.listen(attrs, props)` merges the output, the user's props and the listeners of the root. `handle.merge(attrs, props)` merges without listeners, for a part inside the root.
- The user's handlers run first: `event.preventDefault()` in an `onKeyDown` of the user stops the widget.

The widget lives in `packages/widgets/src/tag-list/widget.ts` with an `index.ts` that exports it, and the folder becomes the `@vega-ui/widgets/tag-list` entry point by itself. The node test lives in `packages/widgets/src/tag-list/__tests__/widget.test.ts`, the browser test of the component checks only what the node test cannot: the markup, the focus and what the screen reader hears.

## Reference

The full list of every function and payload is in the [README of `@vega-ui/core`](../../packages/core/README.md). This section explains how the pieces work and when to reach for which.

### State

`state({ options, owns, follows, internal, observes, collection, parts })` declares the snapshot.

| Field | Who owns the value | Example |
|---|---|---|
| `options` | The parent, as given on every render | `items`, `disabled`, callbacks |
| `owns: { x: controlled(fallback, initial) }` | The parent when it passes `x`, the widget otherwise; changes call `onChangeX` | `value`, `active`, `open` |
| `internal: { x: internal(fallback) }` | The widget only | the typeahead buffer, the anchor of a selection |
| `observes: { x: matching(part, selector) }` | The browser, read before every dispatch | `shown: matching('listbox', ':popover-open')` |
| `observes: { x: reading(read, fallback) }` | Something outside the page, read the same way | whether a group of tooltips is warm |
| `follows` | Names of options whose change arrives as `lifecycle.options` | the page a scroller follows |
| `parts` | Names of the elements actions reach besides the items | `['combobox', 'listbox']` |

- `controlled(fallback, initial)`: `initial(options)` starts an uncontrolled value from the options in place of `defaultX`, like the country of a default phone number. A reset step calls the same function.
- The snapshot also holds the `id`, the running `timers` and `focused`. A value named like them, like a method of the shape or like another value, is a type error.
- Nothing derived is stored. An element id is `idOf(state, 'option', key)`, a tab stop is a function of the snapshot. Memoize an expensive one by the identity of its input.
- With `parts`, `act.showPopover('listbx')` is a type error. A step shared by widgets with different parts names its own: `Step<State, KeyOfState<State>, 'dialog'>`.

### Inputs

An input is a value, never a string: `key.enter`, `key.with(key.a, mod.mod)`, `nav.forward`, `pointer.press`, `focus.leave`, `text.edit`, `browser.toggle`, `measure.done`, `timer('typeahead')`, `lifecycle.options`. A typo does not compile, and `input.key` is typed by the key of the collection.

- **Keys and directions.** The adapter turns the arrows into `nav.forward`, `nav.backward`, `nav.up` and `nav.down` by `aria-orientation` and the writing direction of the root, so a step never knows about RTL. Declare `nav.*` for a list and `key.*` for a key that means the same in every direction.
- **Pointer.** `pointer.down`, `press`, `drag`, `dragOver`, `release`, `cancel`, `hover`, `enter`, `leave`, `wheel` and `spin` carry the `key` of the item and the `part` they hit.
- **Browser.** `browser.toggle` after a popover or a dialog opened or closed, `browser.cancel` / `close` / `submit` of a `<dialog>`, `browser.reset` after a form reset, `browser.reveal` when find in page is about to reveal a part with `hidden="until-found"`, `browser.animationEnd` and `browser.flushed` as answers to actions.
- **Lifecycle.** `lifecycle.connect` once the adapter is connected and the items are registered; `lifecycle.options` when the parent changes a value it controls or an option in `follows`, with `changed`, the names that changed.
- `defineInput(type, name)` declares an input of a kind of your own for an adapter of your own.

### Commands

A command is an input a component sends itself, from its own event handler or an imperative method:

```ts
export const TOGGLE_ITEM = command('toggleItem')
export const SELECT_COUNTRY = command<{ readonly to: PhoneCountry }>()('selectCountry')

handle.send(createInput(SELECT_COUNTRY, { to: 'DE' }))

const selecting: Step<PhoneFieldSnapshot> = (state, input) => {
  if (!input.is(SELECT_COUNTRY)) return undefined

  return keep(phoneFieldShape.country.set(state, input.to))
}
```

`command<Payload>()(name)` declares the payload it carries: `createInput` refuses another payload at the sender, and `input.is(SELECT_COUNTRY)` types `input.to` for the step, so neither side casts. A command, a timer and a lifecycle input need no `listening`: no browser event gives them.

### Steps and Answers

A step is `(state, input) → result | undefined`.

| Answer | Browser default | Meaning |
|---|---|---|
| `handled(next, actions)` | prevented | The step took the input |
| `keep(next, actions)` | kept | The step changed the state, the browser goes on, like a click that also moves the focus |
| `stop(next)` | kept | The input ends here without actions, like a key a disabled widget ignores |
| `undefined` | — | Pass the input to the next step, then to the widget above |

Every answer but `undefined` ends the input: the steps after it and the widgets above it never see it.

- Keep a step a few lines with an early return for the inputs it does not read. A condition that grows is a sign of two steps.
- Order matters: the first answer wins. A guard like "a disabled widget keeps every input" goes first.
- A step that reads the browser wraps itself in `listening(inputs, step)`; `defineWidget` collects the declarations as `widget.listens`.
- A step reads everything from the snapshot, also the browser values the shape observes. It never reads a global, the time or the DOM: the time a step needs comes with the input, as `input.time`.

### Actions

An action is data the adapter executes after the commit, so a step stays pure:

- **Focus and scroll:** `act.focus(key)`, `focusInside(key, 'first' | 'next' | 'previous')`, `focusPart(part)`, `reveal(key)`, `scrollTo(part, options)`.
- **Popups:** `showPopover(part)`, `hidePopover(part)`, `showModal(part)`, `closeDialog(part, returnValue)`.
- **Time:** `timer(name, ms)` fires back as `timer(name)`, `cancelTimer(name)`.
- **Geometry:** `measure(request)` answers with `measure.done` and plain numbers per part and per item. Measure only when the step needs it: the adapter reads every request of the moment at once, after the DOM shows the new state.
- **Animations:** `awaitAnimations(part)` answers with `browser.animationEnd`, `flushStyles(part)` with `browser.flushed`, `scrub(part, ...)` seeks a paused animation by a drag, `animateHeight(part, open)`.
- **Text:** `setText(part, value, selection)` writes a masked text, `commitText(part, value)` also dispatches `change`, `commit(part)` dispatches only `change`.
- **Pointer and keys:** `claimPointer()` keeps a touch drag from scrolling the page and swallows the click that ends it; `watchKeys()` / `unwatchKeys()` deliver keys pressed anywhere on the page, like Escape for a tooltip opened by hover.
- **Outside:** `click(key)`, `emit(name, value)` calls `on<Name>` from the options, `send(part, input)` delivers an input to the widget whose root is that part, `sendAt(key, input)` to the widget whose root is the item `key` or holds it.

An action that cannot run yet, like a focus on an element that is not rendered, waits and runs once the element registers. An action that throws is reported to `onError`, and the others still run.

### Output Channels

`shape.part(select, render)` builds a part. Besides the attributes, a part may have two channels that the DOM adapter writes itself, without a render of the framework:

```ts
const sheet = {
  ...shape.part((state) => [state.open] as const, ([open]) => ({ role: 'dialog', 'data-open': open })),
  live: shape.part((state) => [state.drag] as const, ([drag]) => ({ '--sheet-drag': drag === null ? undefined : `${drag}px` })),
  props: shape.part((state) => [state.mixed] as const, ([mixed]) => ({ indeterminate: mixed })),
}
```

- `live` holds what changes on every frame, like the offset of a drag: a name starting with `--` is a CSS variable, any other an attribute. The movement itself is CSS that reads the variable.
- `props` holds what only a property of the element can say, like `indeterminate`, or `invalidAs` for the browser's own validation message. It never writes `value`, `checked`, `open` or `selected`: the browser and the parent own them, an action changes them.
- An attribute that starts the animations a step awaits goes to `live` too, since a framework may render it after the adapter reads the animations.

### Invariants

An invariant is `{ check(state), repair(state, before) }`, checked after every commit from the first snapshot on.

- Broken by a step that kept it: a bug. Strict mode (tests) throws; production repairs it and reports it to `onRepair`.
- Broken by the options (the first ones or new ones from `setOptions`): a change from outside. It is repaired silently in strict mode too, without `onChangeX`.
- A repair never writes a value the parent controls. The core restores the parent's value, the output filters what it cannot show, `onRepair` tells the developer.

Typical invariants: the active item exists and is enabled, the value holds only selectable items, a buffer lives only while its timer runs.

### The Widget Instance

```ts
const widget = createWidget(tagListWidget, options, { id, strict, onRepair, onError, onDispatch })

widget.dispatch(input, observed)
widget.observe({ focused: true })
widget.setOptions(options)
widget.render(tagListWidget.output.tag, 'red')
widget.subscribe(listener)
```

- `id` is required and comes from the framework, like `useId` in React, so the server and the client render the same element ids.
- Every dispatch is a transaction. A step, an invariant, a selector or the collection that throws leaves the state as it was, drops the actions and reports to `onError`; `render` keeps the attributes it rendered last.
- A changed owned value calls its `onChangeX` once and keeps the new value until the next `setOptions` brings the parent's answer. `setOptions` itself never calls `onChangeX`: the parent sets options while it renders.
- `onDispatch` receives every transaction as `{ input, answer, actions, before, after }`, the trace of the widget. In the ui package these hooks go through `diagnostics` in `internals/widget`; the library itself never writes to the console.

### The DOM Adapter

`connect(widget, elements, { onError })` is the adapter every framework uses. `createElements()` is the registry of the elements:

```ts
const elements = createElements<string, TagData>()
elements.setRoot(root)
elements.setItem('red', span, { label: 'Red', disabled: false })

const connection = connect(widget, elements, { onError })
connection.listen(root)
connection.send(createInput(lifecycle.connect))
```

- `connection.events` lists the events the widget needs. A framework forwards them to `connection.keydown`, `click`, `pointerdown` and the rest, or calls `listen(root)` to attach them natively. A handler returns `true` when the default must be prevented, and the caller prevents it through its own event.
- A widget may have several roots, like a trigger and a popover in the top layer: `setRoot(element, name)`. An event inside any of them belongs to the widget, and a focus moving between them never leaves it.
- An event the user's handler prevented, one an inner widget handled or one whose target is outside the root in the DOM is skipped.
- The adapter attaches nothing until a root registers, so a widget created on the server touches nothing.

The React adapter in `packages/ui/src/internals/widget` wraps it: `useWidget` creates the handle, syncs the options during the render of the owner and tells the subscribers after the commit; `handle.root`, `handle.rootAt(name)` and `handle.part(name)` are refs that register elements, and `usePart(handle, name, part, key)` registers one of many keyed elements of a part, like a tab panel, and writes its channels again after every commit, since React renders over an attribute like `hidden="until-found"`; `handle.send(input)` sends a command; `useSnapshot(handle, select)` reads a value of the snapshot for a component that needs it.

### Fragments

A fragment is a step any widget composes, generic over the key and the fields it needs. It never knows about other fragments.

- `roving({ active, strategy, hover, page, wrap })` moves the active key with `nav`, Home, End, PageUp and PageDown, with `pointer.down` and, with `hover`, under the pointer. `strategy: 'focus'` moves the DOM focus, `'activedescendant'` keeps the focus on the root and reveals the active item.
- `selection({ value, active, anchor, mode, strategy, keys })` follows the APG selection model in `single`, `multiple` and `range` modes, in one or two dimensions. The returned step carries verbs for the widget's own steps: `isSelected`, `toggle`, `extend`, `selectAll`.
- `typeahead({ active, typed, strategy, enabled, delay })` finds an item by its typed letters.
- `createGridLayout(...)`, `gridNeighbor(...)` and `gridBetween(...)` lay out and walk a grid of cells.

A fragment takes fields, not names: pass `selectedKeys`, a `Field` of your own with `get` and `set`, when the value the parent sees differs from the keys the fragment works with, like Listbox, whose value is the option values and whose collection is keyed by element ids.

### Composition

- **Wrap the steps.** A widget built on another one lists the steps of the other one among its own, like the period pickers on the grid.
- **Drive a widget inside.** A widget registers the root of an inner widget as one of its parts and sends it inputs with `act.send(part, input)`, like `Calendar` focusing a day after a year is picked. Widgets never share state.
- **Share code.** Logic two widgets share lives in a segment, `packages/widgets/src/<segment>`, closed in `exports` when it is not a widget of its own.

## Testing

- **Node tests** in `packages/widgets/src/<widget>/__tests__/widget.test.ts` on `simulate`: every key and pointer path of the pattern, every controlled and uncontrolled value, every invariant the options can break. They are fast and cover the behavior.
- `simulate(widget, options, { orientation, rtl })` returns `send(input, payload)`, `setOptions(options)`, `observe(values)`, `pressAt(key)` and `type(text)`, and exposes `state`, `answer` and `actions` of the last dispatch.
- **Browser tests** in `packages/ui/src/<Component>/__tests__` check only what node cannot: the markup and roles, the real focus, the native events and the order of handlers. Do not repeat a node test in the browser.
- Top-level `describe` blocks are `Critical User Paths`, `Error handling`, `Edge Cases`, `Accessibility` and `Performance`.
- Break the code a new test guards and see the test fail before you trust it.

## Checklist

1. The APG pattern: parts, roles, attributes, keys.
2. `state({...})`: what the parent owns, what is internal, what the browser owns, where the collection comes from, which parts actions reach.
3. The fragments that cover the pattern.
4. The steps the fragments do not cover, each with `listening` for the browser inputs it reads.
5. The output parts with selectors that read as little as possible; `live` and `props` for frames and properties.
6. The invariants, each with a repair.
7. Node tests on `simulate` for every key of the pattern.
8. The component: `useWidget`, `useOutput`, `useItem` and refs, nothing else.
9. Browser tests for the markup and the focus, and a changeset for `@vega-ui/widgets` and `@vega-ui/react`.

## Common Mistakes

- **Logic in the component.** A condition about keys, selection or focus in a `.tsx` file belongs to a step. A component that calls `focus()` or `showPopover()` in an effect fights the widget over the element.
- **A browser input without `listening`.** The adapter never listens to it, and `simulate` refuses it, so the step never runs.
- **Writing a value the browser owns.** A popover closed by light dismiss is closed: read it with `matching`, follow it in the output, and answer the parent's `open` only when it changes.
- **Storing a derived value.** A tab stop, an element id or a filtered list in the state goes stale; compute it from the snapshot.
- **A selector that reads the whole state.** A part renders again whenever its tuple changes, so a selector that returns `state` renders every item on every input.
- **`onChangeX` from a repair or from `lifecycle.options`.** A repair is silent and never writes a controlled value; a step answering `lifecycle.options` follows the options with what it shows and never changes an owned value.
- **A string where an input belongs.** Compare with `input.is(spec)` and declare commands with `command(name)`, so a typo is a type error, not a step that never answers.
