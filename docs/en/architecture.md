# Architecture

VegaUI is a `pnpm` workspace orchestrated with Turborepo. The important architectural idea is not just the folder tree, but the dependency flow across packages.

## System Layers

The repository is built as a layered design-system stack:

1. `packages/tokens`
   Raw design tokens such as colors, spacing, radius, shadows, typography, and layers.
2. `packages/theme`
   Semantic theme variables built on top of tokens. This is where `.light` and `.dark` are defined.
3. `packages/ui`
   React components and component CSS modules that consume theme semantics.
4. `docs/` and Storybook
   Human-facing documentation, examples, and integration guidance built on top of the published API.

Read this stack left to right:

`tokens -> theme -> ui -> stories/tests/docs`

## Workspace Packages

- `packages/ui`: main React package published as `@vega-ui/react`
- `packages/theme`: global semantic theme layer published as `@vega-ui/theme-core`
- `packages/tokens`: raw design tokens published as `@vega-ui/tokens-core`
- `packages/icons`: icon assets and icon exports
- `packages/core`: the framework-free logic of composite widgets published as `@vega-ui/core`: the pipeline `state → step → actions → output`, the fragments `roving`, `selection`, `typeahead` and `grid`, and the DOM adapter (see [Widgets](#widgets)); `@vega-ui/core/test` holds `simulate` for node tests
- `packages/widgets`: the widgets of the components, published as `@vega-ui/widgets` with one entry point per widget, like `@vega-ui/widgets/select`; it depends on `core`, `i18n` and `utils` and never on React, so an adapter for another framework can reuse it
- `packages/hooks`: shared technical hooks such as controlled state and resize helpers
- `packages/utils`: low-level utilities such as prop merging, refs, dates, and small data helpers
- `packages/i18n`: framework-agnostic calendar system adapters, locale and formatting helpers, calendar-aware ISO date helpers, and the phone numbering adapter on `libphonenumber-js`, published as `@vega-ui/i18n` (see [Dates and calendar systems](./i18n.md))

## Dependency Model

The important dependency direction is:

- `ui` depends on `core`, `widgets`, `hooks`, `i18n`, `icons`, and `utils`; the React adapter of a widget (`useWidget`, `useOutput`, `useSnapshot`, `useItem`) and `createContext` live in `ui` internals
- `hooks` depends on `core`, and `core` depends on nothing
- `theme` depends on `tokens`
- components in `ui` are styled against semantic variables from `theme`

That means:

- token changes affect the whole styling system
- theme changes remap semantic meaning without rewriting every component
- component-local CSS variables should stay local and not replace the theme layer

## UI Package Structure

Most components in `packages/ui/src/<Component>/` follow a repeatable structure:

- `Component.tsx`: public component implementation
- `types.ts`: exported types and unions when needed
- `index.ts`: public exports for the package entrypoint
- `style.module.css`: component-local styling
- `components/`: exported child parts for compound components
- `contexts/`: shared local context for compound state
- `__tests__/*.browser.test.tsx`: browser interaction tests
- `*.stories.tsx`: story-driven usage examples

Example:

- [packages/ui/src/Avatar/Avatar.tsx](../../packages/ui/src/Avatar/Avatar.tsx)
- [packages/ui/src/Avatar/components/AvatarImage/AvatarImage.tsx](../../packages/ui/src/Avatar/components/AvatarImage/AvatarImage.tsx)
- [packages/ui/src/Avatar/style.module.css](../../packages/ui/src/Avatar/style.module.css)
- [packages/ui/src/Avatar/__tests__/Avatar.browser.test.tsx](../../packages/ui/src/Avatar/__tests__/Avatar.browser.test.tsx)

## Widgets

Components with behavior beyond the native element, such as `Listbox`, `Select`, `Grid` and the pickers and `Calendar` built on it, keep that behavior in a widget: plain TypeScript in `packages/widgets/src/<component>/widget.ts` (or `packages/widgets/src/<segment>` when two widgets share it) that imports nothing from React or the DOM. The React component is a thin adapter around it. Components that are close to a native element, like `Button` or `Switch`, have no widget; `Checkbox` has one only for the `indeterminate` property its input cannot take as an attribute.

### One pipeline

```
event → normalize → step(state, input) → { state, actions } → output(state) → DOM
```

The adapter does the first and the last arrow. Everything in between is plain data and pure functions, so a widget runs and is tested in node. Five concepts, all in `@vega-ui/core`:

- **State**: an immutable snapshot of plain data, beside the options as the parent gave them, callbacks included. `state({ options, owns, follows, internal, observes, collection, parts })` declares it; `parts` names the elements the actions reach, so a mistyped part is a type error. `follows` names the options whose change arrives as `lifecycle.options`, like the page a scroller follows, beside the values the parent controls. `controlled(fallback, initial)` is a value the parent may control through `x`, `defaultX` and `onChangeX`, and `initial(options)`, when given, starts it from the options in place of `defaultX`, like the country of a default phone number; `internal(fallback)` is a value only the widget and its output see; `matching(part, selector)` is a value the browser owns, like whether a popover is open, read by the adapter before every dispatch; `reading(read, fallback)` is a value from outside the page the adapter reads the same way, like whether a group of tooltips is warm; the `collection` is the ordered keys with their flags, built once per items array by `source(spec)` or by a layout. The snapshot also carries the `id` of the widget, the running timers and `focused`; a value named like them, like a method of the shape or like another value, is a type error. Nothing derived is stored: `idOf(state, part, key)`, `tabStop(state)` and the like are functions of the snapshot, memoized by identity.
- **Input**: a value with a payload, never a string. `key.arrowDown`, `key.with(key.a, mod.mod)`, `nav.forward` (the adapter turns arrows into logical directions by the orientation and the writing direction, which is the `dir` attribute of the root or an ancestor), `nav.up` / `down`, `pointer.down` / `press` / `drag` / `dragOver` / `release` / `cancel` / `hover` / `enter` / `leave` / `wheel` / `spin`, `scroll.move` / `end`, `layout.resize` / `viewport`, `focus.enter` / `move` / `leave`, `text.edit` / `change` / `select`, `browser.toggle` / `reset` / `load` / `error` / `cancel` / `close` / `submit` / `animationEnd` / `flushed`, `measure.done`, `timer(name)`, `command(name)` for an input the framework sends itself, `command<Payload>()(name)` when it carries a typed payload, `lifecycle.connect` and `lifecycle.options`, whose `changed` names the options that changed. A typo does not compile, and `input.key` is typed by the key of the collection.
- **Step**: `(state, input) → handled(next, actions) | keep(next, actions) | stop(next) | undefined`. `handled` prevents the browser default, `keep` leaves it, `undefined` passes the input to the next step and then to the widget above. A widget lists its steps in order and the first answer wins.
- **Action**: data the adapter executes after the commit: `act.focus(key)`, `focusInside(key, at)`, `focusPart(name)`, `reveal(key)`, `click(key)`, `timer(name, ms)`, `cancelTimer(name)`, `showPopover(part)`, `hidePopover(part)`, `showModal(part)`, `closeDialog(part, returnValue)`, `send(part, input)` to the widget whose root is that part, `watchKeys()` / `unwatchKeys()` for the keys pressed anywhere on the page, `claimPointer()` so a touch drag does not scroll the page and the click that ends it is swallowed, `scrub(part, ...)` / `stopScrub(part)` for one paused animation a drag seeks, `flushStyles(part)`, which answers with `browser.flushed`, `measure(request)`, which answers with `measure.done`, `awaitAnimations(part)`, which answers with `browser.animationEnd`, `animateHeight(part, open)`, `scrollTo(part, options)`, `setText(part, value, selection)` for the text a mask corrected, `commitText(part, value)`, which also dispatches `change`, like a picker, `commit(part)`, which dispatches `change` for the text already shown, `emit(name, value)` for the `on<Name>` callback of the options. A step never touches the world; a timer fires back as an input.
- **Output**: `shape.part(select, render)`: the selector lists what a part reads, the renderer builds attributes from that tuple. A part re-renders only when one of its inputs changes, so an arrow press in a grid of 10 000 cells touches two cells. Beside the attributes a part has two channels the adapter writes itself: `props` for what only a property of the element can say, like `indeterminate`, and `live` for values that change on every frame, like the offset of a drag.

Reusable logic is a **fragment**: a function with the step signature, generic over the key and the fields it needs, that never knows about other fragments. `roving`, `selection` (single, multiple and range, in one or two dimensions), `typeahead` and the `grid` layout are exported from `@vega-ui/core`.

### Files

| File | Holds | Never |
|---|---|---|
| `widgets/src/<component>/widget.ts` | The shape, the steps, the output parts and the invariants of the widget in `defineWidget`; the commands it accepts; the pure selectors the hooks read, such as `isSelected` | React, DOM, element references |
| `widgets/src/<component>/<name>.ts` | Pure helpers of one widget that `widget.ts` would make long | Side effects |
| `Component.tsx` | `useWidget(widget, options, widgetEnvironment)` and the context that hands the handle down | Logic: a condition about keys, selection or focus belongs to a step |
| `components/*` | The parts: `useOutput(handle, widget.output.part, key)` and `handle.merge(attrs, props)` or `handle.listen(attrs, props)` on the root | Effects that write what the widget owns, `focus()`, `showPopover()` |
| `widgets/src/<component>/__tests__/widget.test.ts` | Node tests on `simulate` from `@vega-ui/core/test` with strict invariants: the user paths as lists of inputs and expected snapshots | The DOM |
| `__tests__/*.browser.test.tsx` | The adapter and the markup: what the user sees and the screen reader hears | What the node test already proved |

Logic shared by two widgets lives in `packages/widgets/src/<segment>`; a context or hook lives with the component that owns it, and another component imports it only through `../Owner`, `../Owner/contexts` or `../Owner/hooks`, never deeper; React code shared with no owning component, like `createContext` and the widget adapter, lives in `packages/ui/src/internals/<segment>`, which never imports component folders. Component folders never import each other in a cycle. Local ESLint rules (`eslint/components.mjs`) check both.

### Rules

- **The browser is first.** What it did is final: a popover closed by light dismiss is `shown: false` in the next snapshot because the adapter read it, and `aria-expanded` follows that, not the parent's `open`. The parent's value is a command the widget answers with `showPopover` / `hidePopover` on `lifecycle.options` when the parent changes it, read from `input.changed`, the names of the options that changed; a change of another option never shows again what the browser closed.
- **The user is first.** The user's handlers run before the widget's; `event.preventDefault()` in them stops the widget, and a key the widget handled reaches the handlers above it with `defaultPrevented`. An event the browser already handled, an inner widget consumed, or a portal delivered from outside the root in the DOM, is skipped.
- **One mechanism.** State changes only in a step. The adapter normalizes, delivers, applies the output and executes actions; it holds no conditions about widgets. A component never writes state from an effect and never calls a browser API itself.
- **Declared inputs.** A step that reads the browser wraps itself in `listening(inputs, step)`. The adapter listens only to the events that give a declared input, plus the focus, delivers a key only when a step declares it or the direction it becomes, and `simulate` refuses an input no step declares, so a node test never passes on an event the page never delivers.
- **The widget is its roots.** A trigger and a popover in the top layer are two roots of one widget (`setRoot(element, name)`, `handle.rootAt(name)`). An event inside any of them belongs to it, the nearest root gives the key and the direction, and a focus between them never leaves the widget. A React portal still belongs to the DOM: content is the widget's because it is its registered root, not because of the React tree.
- **One owner per fact.** The pointer belongs to the adapter until release; the focus belongs to the step through `act.focus`; the collection order belongs to the data (`cells`) or to the DOM registry, declared once.
- **Controlled values.** A changed owned value calls its `onChangeX` once and keeps the new value until the next `setOptions` brings the parent's answer. The React adapter syncs the options during the render of the owner and tells the subscribers after the commit, so the parts read the parent's answer in the same pass and a value the parent keeps never reaches the DOM. A repair never writes a value the parent controls: the core restores it, the output filters it, `onRepair` reports it.
- **Invariants.** `check` and `repair` run after every commit. An invariant that held and a step breaks is a bug: in tests it throws; in production it is repaired and reported to the diagnostics hook of the package (`internals/widget`). An invariant the new options break, like an active item the parent removed, is a change from outside: it is repaired in tests too, without `onChangeX`, like a native `<select>` that loses its selected option without a `change` event. `repair(state, before)` gets the snapshot before the commit, so the active item can move to its nearest neighbour. The library never writes to the console.
- **Every frame bypasses the framework.** A value that changes on every frame, like the offset of a drag, goes to the `live` channel of its part, and a property without an attribute, like `indeterminate`, to `props`. The core adapter writes both itself, so they cost no render and work the same under any framework; the movement itself is CSS that reads the variable. An attribute that starts the animations a step waits for with `act.awaitAnimations` goes to `live` too: a framework may render it after the adapter reads the animations; it stays in the attributes as well when the server must render it, like `hidden` of a collapsed section.
- **Cost follows the change.** The collection and the layout are memoized by the identity of their inputs; selectors are memoized per snapshot; the registry re-sorts only when a registered element is added, removed or moved. New options with the same content recompute nothing.
- **Readable names.** Steps take `(state, input)`; collections are `collection`, keys `key`, actions `action`. No one-letter identifiers.

### Data flow

- **User action:** event → adapter builds the input and reads the browser values → steps → one commit → `onChangeX` once → subscribers → actions.
- **New props:** the owner's render passes the options to the widget, muted; the layout effect tells the subscribers and runs the actions of `lifecycle.options`.
- **Mount:** with `cells` as data the widget knows its items before they render, so the server HTML has the right tab stop. Without it, the items register through `useItem`, and the widget gets them in DOM order as soon as the registry changes, without a render of the component. `lifecycle.connect` arrives when the adapter is connected and the items are registered.
- **Composition:** a widget built on another one wraps its steps, like the period pickers on the grid; a widget that drives a widget inside it registers its root as a part and sends it inputs with `act.send`, like `Calendar` focusing the day of its day grid after a year is picked; a component sends `command(name)` inputs through `handle.send` only from its own event handlers. Widgets never share state.

### How to write a widget

1. Read the [APG](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern: the parts, their roles and attributes, and every key.
2. `state({...})`: what the widget owns, what is internal, what the browser owns, where the collection comes from.
3. Pick the fragments: `roving`, `selection`, `typeahead`, `grid`.
4. Write the steps of the pattern that the fragments do not cover, each a few lines: `(state, input) => input.is(key.escape) ? handled(closed(state)) : undefined`.
5. The output parts with their selectors.
6. The invariants: what must hold in every snapshot, with a repair.
7. Node tests on `simulate`: every key of the pattern as a list of inputs.
8. The component: `useWidget`, `useOutput`, `useItem`, nothing else.

Example: [packages/widgets/src/select/widget.ts](../../packages/widgets/src/select/widget.ts).

## Stories, Tests, And Docs

These three layers serve different purposes and should stay aligned:

- stories describe realistic supported usage and visual states
- tests describe behavior, interactions, and edge cases
- docs describe the consumer contract: when to use a component, how to compose it, and what commonly breaks

In this repository, stories mostly live next to components in `packages/ui/src/**`, while Storybook configuration lives in `.storybook/`.

## Documentation Sources Of Truth

When documenting a component, use these priorities:

1. source code for public exports and type shape
2. stories for supported examples and variants
3. tests for edge cases and behavioral guarantees
4. CSS modules for styling hooks and component-local variables

This prevents docs from drifting into patterns the source does not actually support.

See [Glossary](./glossary.md#source-of-truth) for the shared definition of [source of truth](./glossary.md#source-of-truth).
