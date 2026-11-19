# Как писать виджеты

Как поведение составных компонентов пишется на `@vega-ui/core` и `@vega-ui/widgets`: конвейер, виджет с нуля и устройство каждой части. Сначала прочитайте [Архитектуру](./architecture.md#виджеты): эта страница применяет её правила.

## Когда компоненту нужен виджет

Виджет нужен компоненту, у которого есть поведение сверх нативного элемента: фокус, который переходит между элементами, выбор, попап под управлением клавиатуры, маска поверх текстового поля, перетаскивание. Виджет есть у `Listbox`, `Select`, `Grid`, пикеров, `Calendar`, полей ввода, `Slider`, `Sheet`, `Toolbar`, `Toggle`, `ToggleGroup` и `Tooltip`. У компонента, близкого к своему нативному элементу, как `Button` или `Switch`, виджета нет: браузер уже делает то, что нужно.

Виджет — обычный TypeScript без React и без DOM. Он запускается и тестируется в node, а адаптер для другого фреймворка может переиспользовать его как есть.

| Пакет | Что в нём |
|---|---|
| `@vega-ui/core` | Конвейер: состояние, входы, шаги, действия, вывод, экземпляр виджета, DOM-адаптер `connect`, фрагменты, `simulate` в `@vega-ui/core/test` |
| `@vega-ui/widgets` | Виджеты компонентов, по точке входа на папку: `@vega-ui/widgets/listbox`, `@vega-ui/widgets/select`. Папка, общая для нескольких виджетов, как `mask` или `drag`, — сегмент, и она закрыта в `exports` |
| `packages/ui/src/internals/widget` | React-адаптер: `useWidget`, `useOutput`, `useItem`, `usePart`, `useSnapshot` и диагностика |

## Конвейер

```
event → normalize → step(state, input) → { state, actions } → output(state) → DOM
```

1. Адаптер превращает событие браузера во **вход**: `key.arrowDown` становится `nav.forward` для вертикального списка, клик по опции — `pointer.press` с её `key`.
2. Виджет по порядку запускает свои **шаги** на **состоянии** и входе. Побеждает первый ответивший шаг.
3. Ответ — новое состояние и список **действий**. Виджет фиксирует состояние, проверяет инварианты и вызывает `onChangeX` для каждого изменившегося собственного значения.
4. **Вывод** превращает новое состояние в атрибуты по частям, адаптер записывает их.
5. Адаптер выполняет действия: фокус, прокрутку, показ поповера, запуск таймера. Таймер возвращается входом, на замер приходит ответ входом.

Шаг никогда не трогает внешний мир. Всё между первой и последней стрелкой — данные, поэтому тест — это список входов и снимков, к которым они приводят.

## Пошагово: список тегов

Напишем список тегов: ряд тегов, стрелки переводят фокус между ними, Home и End ведут к краям, Delete и Backspace просят родителя удалить тег в фокусе, а когда родитель удалил его, фокус переходит к соседу.

### 1. Паттерн

Начните с паттерна [APG](https://www.w3.org/WAI/ARIA/apg/patterns/), здесь — [toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/): корень — `role="toolbar"`, в порядке табуляции один тег с `tabIndex={0}`, у остальных `-1` (roving tab index), стрелки следуют направлению письма, Home и End ведут к первому и последнему тегу. Выпишите каждую часть, её роль и атрибуты и каждую клавишу до первой строки кода.

### 2. Состояние

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

- `options` — значения, которые родитель передаёт на каждом рендере, включая колбэки. Значения по умолчанию задают их типы.
- `owns` — значения, которые родитель может контролировать. `active: controlled(null)` даёт опции `active`, `defaultActive` и `onChangeActive` без единой лишней строки.
- `collection` строит из опций упорядоченные ключи с флагами. `source(spec).of(items)` строит её один раз на массив элементов, поэтому одинаковый рендер ничего не пересчитывает.
- `tagListShape.active` — типизированное поле: `tagListShape.active.set(state, 'red')` возвращает новый снимок, а `tagListShape.actve` не компилируется.

### 3. Шаги

Стрелки, Home и End — это фрагмент `roving`. Удаление — собственный шаг виджета:

```ts
const removing = listening<TagListSnapshot>([key.delete, key.backspace], (state) => {
  if (state.active === null) return undefined

  return handled(state, [act.emit('remove', state.active)])
})
```

- `listening(inputs, step)` объявляет входы браузера, которые читает шаг. Адаптер слушает только события, дающие объявленный вход, поэтому клавиша, которую не объявил ни один шаг, остаётся браузеру.
- `handled` отменяет действие браузера по умолчанию, `keep` оставляет его, `undefined` передаёт вход следующему шагу.
- Шаг ничего не удаляет: теги принадлежат родителю. `act.emit('remove', key)` после фиксации вызывает `onRemove(key)` из опций.

### 4. Вывод

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

Часть — это селектор и рендерер. Селектор перечисляет кортежем, что читает часть, а рендерер строит атрибуты только из этого кортежа. Тег рендерится заново, только когда меняется его кортеж, поэтому нажатие стрелки перерисовывает два тега, а не все. `tabStopOf` вычисляется, а не хранится: точка табуляции — активный тег, если он может принять фокус, иначе первый, поэтому в серверном HTML точка табуляции есть ещё до любого фокуса.

### 5. Инварианты

Родитель удаляет тег в фокусе, и `active` указывает на ключ, которого больше нет. Инвариант говорит, что должно выполняться в каждом снимке, и как это починить:

```ts
export const tagListWidget = defineWidget({
  // state, step, output как выше

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

`repair(state, before)` получает снимок до фиксации, поэтому активным становится тег, вставший на место удалённого. Инвариант сломали новые опции, поэтому починка тихая и не вызывает `onChangeActive` — как нативный `<select>`, который теряет выбранную опцию без события `change`. Если бы его сломал шаг, это была бы ошибка: строгий режим бросает исключение.

### 6. Тесты в node

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

`simulate` запускает виджет в строгом режиме и, как адаптер, превращает стрелки в направления по своим `orientation` и `rtl`. Он отклоняет вход, который не объявил ни один шаг, поэтому `tagList.send(key.escape)` бросает исключение: тест не пройдёт на клавише, которую страница никогда не доставит. Запишите каждую клавишу паттерна как список входов и снимков или действий, к которым они приводят.

### 7. React-компонент

Компонент — тонкий адаптер: он передаёт пропсы виджету, регистрирует элементы и раскладывает вывод. Условий про клавиши или фокус в нём нет.

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

- `useWidget(widget, options, widgetEnvironment)` создаёт виджет один раз и передаёт ему опции на каждом рендере. Здесь опции — функция от зарегистрированных элементов: теги приходят из DOM в порядке документа, записями `{ key, data }`.
- `useItem(handle, key, data)` регистрирует элемент вместе с его данными.
- `useOutput(handle, part, key)` рендерит часть и подписывается на неё, поэтому тег перерисовывается, только когда меняются его атрибуты.
- `handle.listen(attrs, props)` сливает вывод, пропсы пользователя и слушатели корня. `handle.merge(attrs, props)` сливает без слушателей — для части внутри корня.
- Обработчики пользователя срабатывают первыми: `event.preventDefault()` в пользовательском `onKeyDown` останавливает виджет.

Виджет лежит в `packages/widgets/src/tag-list/widget.ts` с `index.ts`, который его экспортирует, и папка сама становится точкой входа `@vega-ui/widgets/tag-list`. Тест в node лежит в `packages/widgets/src/tag-list/__tests__/widget.test.ts`, а браузерный тест компонента проверяет только то, чего не может тест в node: разметку, фокус и то, что слышит скринридер.

## Справочник

Полный список функций и полезных нагрузок — в [README `@vega-ui/core`](../../packages/core/README.md). Этот раздел объясняет, как устроены части и когда за какой тянуться.

### Состояние

`state({ options, owns, follows, internal, observes, collection, parts })` объявляет снимок.

| Поле | Кто владеет значением | Пример |
|---|---|---|
| `options` | Родитель, как передал на рендере | `items`, `disabled`, колбэки |
| `owns: { x: controlled(fallback, initial) }` | Родитель, если передаёт `x`, иначе виджет; изменения вызывают `onChangeX` | `value`, `active`, `open` |
| `internal: { x: internal(fallback) }` | Только виджет | буфер typeahead, якорь выделения |
| `observes: { x: matching(part, selector) }` | Браузер, читается перед каждым dispatch | `shown: matching('listbox', ':popover-open')` |
| `observes: { x: reading(read, fallback) }` | Что-то вне страницы, читается так же | «прогрета» ли группа подсказок |
| `follows` | Имена опций, изменение которых приходит как `lifecycle.options` | страница, за которой следит скроллер |
| `parts` | Имена элементов помимо элементов коллекции, до которых доходят действия | `['combobox', 'listbox']` |

- `controlled(fallback, initial)`: `initial(options)` задаёт неконтролируемому значению старт из опций вместо `defaultX`, как страну номера телефона по умолчанию. Шаг сброса вызывает ту же функцию.
- В снимке также лежат `id`, запущенные `timers` и `focused`. Значение с таким же именем, с именем метода формы или другого значения — ошибка типа.
- Производное не хранится. Id элемента — `idOf(state, 'option', key)`, точка табуляции — функция от снимка. Дорогое вычисление мемоизируйте по идентичности входа.
- С `parts` вызов `act.showPopover('listbx')` — ошибка типа. Шаг, общий для виджетов с разными частями, называет свою: `Step<State, KeyOfState<State>, 'dialog'>`.

### Входы

Вход — значение, а не строка: `key.enter`, `key.with(key.a, mod.mod)`, `nav.forward`, `pointer.press`, `focus.leave`, `text.edit`, `browser.toggle`, `measure.done`, `timer('typeahead')`, `lifecycle.options`. Опечатка не компилируется, а `input.key` типизирован ключом коллекции.

- **Клавиши и направления.** Адаптер превращает стрелки в `nav.forward`, `nav.backward`, `nav.up` и `nav.down` по `aria-orientation` и направлению письма корня, поэтому шаг ничего не знает про RTL. Объявляйте `nav.*` для списка и `key.*` для клавиши, которая значит одно и то же в любом направлении.
- **Указатель.** `pointer.down`, `press`, `drag`, `dragOver`, `release`, `cancel`, `hover`, `enter`, `leave`, `wheel` и `spin` несут `key` элемента и `part`, в которую попали.
- **Браузер.** `browser.toggle` — после того как поповер или диалог открылся или закрылся, `browser.cancel` / `close` / `submit` у `<dialog>`, `browser.reset` — после сброса формы, `browser.reveal` — когда поиск по странице вот-вот раскроет часть с `hidden="until-found"`, `browser.contextMenu` — от правого щелчка, долгого нажатия или клавиши контекстного меню, с точкой `point` и частью `part`, `browser.animationEnd` и `browser.flushed` — ответы на действия.
- **Жизненный цикл.** `lifecycle.connect` — когда адаптер подключён и элементы зарегистрированы; `lifecycle.options` — когда родитель меняет контролируемое значение или опцию из `follows`, с `changed` — именами изменившихся.
- `defineInput(type, name)` объявляет вход собственного вида для собственного адаптера.

### Команды

Команда — вход, который компонент отправляет сам из императивного метода. Кнопка, которая действует на виджет, — не команда: зарегистрируйте её частью через `handle.part` и обработайте `pointer.press` с этой `part`, как кнопки «назад» и «вперёд» календаря.

```ts
export const TOGGLE_ITEM = command('toggleItem')
export const SELECT_COUNTRY = command<{ readonly to: PhoneCountry }>()('selectCountry')

handle.send(createInput(SELECT_COUNTRY, { to: 'DE' }))

const selecting: Step<PhoneFieldSnapshot> = (state, input) => {
  if (!input.is(SELECT_COUNTRY)) return undefined

  return keep(phoneFieldShape.country.set(state, input.to))
}
```

`command<Payload>()(name)` объявляет полезную нагрузку команды: `createInput` не примет у отправителя другую, а `input.is(SELECT_COUNTRY)` типизирует `input.to` для шага, так что ни одна сторона не приводит типы. Команде, таймеру и входу жизненного цикла `listening` не нужен: их не даёт ни одно событие браузера.

### Шаги и ответы

Шаг — это `(state, input) → result | undefined`.

| Ответ | Действие браузера | Смысл |
|---|---|---|
| `handled(next, actions)` | отменено | Шаг взял вход |
| `keep(next, actions)` | сохранено | Шаг изменил состояние, браузер продолжает, как клик, который ещё и переводит фокус |
| `stop(next)` | сохранено | Вход заканчивается здесь без действий, как клавиша, которую игнорирует отключённый виджет |
| `undefined` | — | Передать вход следующему шагу, затем виджету выше |

Любой ответ, кроме `undefined`, завершает вход: ни шаги после, ни виджеты выше его не увидят.

- Держите шаг в несколько строк с ранним возвратом для входов, которые он не читает. Разрастающееся условие — признак двух шагов.
- Порядок важен: побеждает первый ответ. Охранный шаг вроде «отключённый виджет пропускает любой вход» идёт первым.
- Шаг, читающий браузер, оборачивается в `listening(inputs, step)`; `defineWidget` собирает объявления в `widget.listens`.
- Шаг читает всё из снимка, в том числе значения браузера, которые наблюдает форма. Он никогда не читает глобальные переменные, время или DOM: нужное шагу время приходит со входом, как `input.time`.

### Действия

Действие — данные, которые адаптер выполняет после фиксации, поэтому шаг остаётся чистым:

- **Фокус и прокрутка:** `act.focus(key)`, `focusInside(key, 'first' | 'next' | 'previous')`, `focusPart(part)`, `reveal(key)`, `scrollTo(part, options)`.
- **Попапы:** `showPopover(part)`, `hidePopover(part)`, `showModal(part)`, `closeDialog(part, returnValue)`.
- **Время:** `timer(name, ms)` возвращается входом `timer(name)`, `cancelTimer(name)`.
- **Геометрия:** `measure(request)` отвечает входом `measure.done` с простыми числами по частям и по элементам. Замеряйте, только когда это нужно шагу: адаптер читает все запросы момента разом, после того как DOM показал новое состояние.
- **Анимации:** `awaitAnimations(part)` отвечает входом `browser.animationEnd`, `flushStyles(part)` — входом `browser.flushed`, `scrub(part, ...)` перематывает приостановленную анимацию перетаскиванием, `animateHeight(part, open)`.
- **Текст:** `setText(part, value, selection)` записывает текст после маски, `commitText(part, value)` ещё и отправляет `change`, `commit(part)` отправляет только `change`.
- **Указатель и клавиши:** `claimPointer()` не даёт сенсорному перетаскиванию прокручивать страницу и глотает клик, которым оно заканчивается; `watchKeys()` / `unwatchKeys()` доставляют клавиши, нажатые в любом месте страницы, как Escape для подсказки, открытой наведением.
- **Наружу:** `click(key)`, `emit(name, value)` вызывает `on<Name>` из опций, `send(part, input)` доставляет вход виджету, чей корень — эта часть, `sendAt(key, input)` — виджету, чей корень — пункт `key` или содержит его.

Действие, которое пока не может выполниться, например фокус на ещё не отрисованном элементе, ждёт и выполняется, как только элемент зарегистрируется. Действие, бросившее исключение, сообщается в `onError`, а остальные всё равно выполняются.

### Каналы вывода

`shape.part(select, render)` строит часть. Помимо атрибутов у части может быть два канала, которые DOM-адаптер пишет сам, без рендера фреймворка:

```ts
const sheet = {
  ...shape.part((state) => [state.open] as const, ([open]) => ({ role: 'dialog', 'data-open': open })),
  live: shape.part((state) => [state.drag] as const, ([drag]) => ({ '--sheet-drag': drag === null ? undefined : `${drag}px` })),
  props: shape.part((state) => [state.mixed] as const, ([mixed]) => ({ indeterminate: mixed })),
}
```

- `live` хранит то, что меняется каждый кадр, например смещение при перетаскивании: имя, начинающееся с `--`, — CSS-переменная, любое другое — атрибут. Само движение — CSS, который читает переменную.
- `props` хранит то, что может выразить только свойство элемента, как `indeterminate` или `invalidAs` для собственного сообщения браузера о валидации. Он никогда не пишет `value`, `checked`, `open` или `selected`: ими владеют браузер и родитель, меняет их действие.
- Атрибут, запускающий анимации, которых ждёт шаг, тоже идёт в `live`: фреймворк может отрисовать его уже после того, как адаптер прочитал анимации.

### Инварианты

Инвариант — `{ check(state), repair(state, before) }`, проверяется после каждой фиксации начиная с первого снимка.

- Сломан шагом, при котором держался, — ошибка. Строгий режим (тесты) бросает исключение; в продакшене он чинится и сообщается в `onRepair`.
- Сломан опциями (первыми или новыми из `setOptions`) — изменение снаружи. Он чинится тихо и в строгом режиме, без `onChangeX`.
- Починка никогда не пишет значение, которое контролирует родитель. Ядро восстанавливает значение родителя, вывод отфильтровывает то, что не может показать, `onRepair` сообщает разработчику.

Типичные инварианты: активный элемент существует и включён, значение содержит только выбираемые элементы, буфер живёт, только пока идёт его таймер.

### Экземпляр виджета

```ts
const widget = createWidget(tagListWidget, options, { id, strict, onRepair, onError, onDispatch })

widget.dispatch(input, observed)
widget.observe({ focused: true })
widget.setOptions(options)
widget.render(tagListWidget.output.tag, 'red')
widget.subscribe(listener)
```

- `id` обязателен и приходит от фреймворка, как `useId` в React, поэтому сервер и клиент рендерят одинаковые id элементов.
- Каждый dispatch — транзакция. Шаг, инвариант, селектор или коллекция, бросившие исключение, оставляют состояние как было, отбрасывают действия и сообщают в `onError`; `render` сохраняет последние отрисованные атрибуты.
- Изменившееся собственное значение вызывает свой `onChangeX` один раз и держит новое значение до следующего `setOptions` с ответом родителя. Сам `setOptions` никогда не вызывает `onChangeX`: родитель задаёт опции во время рендера.
- `onDispatch` получает каждую транзакцию как `{ input, answer, actions, before, after }` — трассу виджета. В пакете ui эти хуки идут через `diagnostics` в `internals/widget`; сама библиотека никогда не пишет в консоль.

### DOM-адаптер

`connect(widget, elements, { onError })` — адаптер, которым пользуется любой фреймворк. `createElements()` — реестр элементов:

```ts
const elements = createElements<string, TagData>()
elements.setRoot(root)
elements.setItem('red', span, { label: 'Red', disabled: false })

const connection = connect(widget, elements, { onError })
connection.listen(root)
connection.send(createInput(lifecycle.connect))
```

- `connection.events` перечисляет события, нужные виджету. Фреймворк передаёт их в `connection.keydown`, `click`, `pointerdown` и остальные или вызывает `listen(root)`, чтобы подписаться нативно. Обработчик возвращает `true`, когда действие по умолчанию нужно отменить, и вызывающий отменяет его через своё событие.
- У виджета может быть несколько корней, как у триггера и поповера в верхнем слое: `setRoot(element, name)`. Событие внутри любого из них принадлежит виджету, а фокус, переходящий между ними, виджет не покидает.
- Событие, отменённое обработчиком пользователя, обработанное внутренним виджетом или с целью вне корня в DOM, пропускается.
- Адаптер ни на что не подписывается, пока не зарегистрирован корень, поэтому виджет, созданный на сервере, ничего не трогает.

React-адаптер в `packages/ui/src/internals/widget` оборачивает его: `useWidget` создаёт handle, синхронизирует опции во время рендера владельца и оповещает подписчиков после фиксации; `handle.root`, `handle.rootAt(name)` и `handle.part(name)` — рефы, регистрирующие элементы, а `usePart(handle, name, part, key)` регистрирует один из многих элементов части по ключу, например панель вкладки, и заново пишет его каналы после каждой фиксации, потому что React перерисовывает атрибут вроде `hidden="until-found"`; `handle.send(input)` отправляет команду; `useSnapshot(handle, select)` читает значение снимка для компонента, которому оно нужно.

### Фрагменты

Фрагмент — шаг, который может включить любой виджет, обобщённый по ключу и нужным ему полям. Про другие фрагменты он ничего не знает.

- `roving({ active, strategy, hover, page, wrap })` двигает активный ключ по `nav`, Home, End, PageUp и PageDown, по `pointer.down` и, с `hover`, под указателем. `strategy: 'focus'` двигает фокус DOM, `'activedescendant'` оставляет фокус на корне и показывает активный элемент.
- `selection({ value, active, anchor, mode, strategy, keys })` следует модели выбора APG в режимах `single`, `multiple` и `range`, в одном или двух измерениях. Возвращённый шаг несёт глаголы для собственных шагов виджета: `isSelected`, `toggle`, `extend`, `selectAll`.
- `typeahead({ active, typed, strategy, enabled, delay })` находит элемент по набранным буквам.
- `createGridLayout(...)`, `gridNeighbor(...)` и `gridBetween(...)` раскладывают сетку ячеек и ходят по ней.

Фрагмент принимает поля, а не имена: передайте `selectedKeys`, собственный `Field` с `get` и `set`, когда значение, которое видит родитель, отличается от ключей, с которыми работает фрагмент, — как у Listbox, чьё значение — значения опций, а коллекция построена по id элементов.

### Композиция

- **Оберните шаги.** Виджет, построенный на другом, включает шаги другого в свои, как пикеры периодов на сетке.
- **Управляйте виджетом внутри.** Виджет регистрирует корень внутреннего виджета как свою часть и отправляет ему входы через `act.send(part, input)`, как `Calendar` переводит фокус на день после выбора года. Виджеты никогда не делят состояние.
- **Общий код.** Логика, общая для двух виджетов, живёт в сегменте `packages/widgets/src/<segment>`, закрытом в `exports`, если это не самостоятельный виджет.

## Тестирование

- **Тесты в node** в `packages/widgets/src/<widget>/__tests__/widget.test.ts` на `simulate`: каждый путь клавиатуры и указателя из паттерна, каждое контролируемое и неконтролируемое значение, каждый инвариант, который могут сломать опции. Они быстрые и покрывают поведение.
- `simulate(widget, options, { orientation, rtl })` возвращает `send(input, payload)`, `setOptions(options)`, `observe(values)`, `pressAt(key)` и `type(text)` и показывает `state`, `answer` и `actions` последнего dispatch.
- **Браузерные тесты** в `packages/ui/src/<Component>/__tests__` проверяют только то, чего не может node: разметку и роли, настоящий фокус, нативные события и порядок обработчиков. Не повторяйте тест из node в браузере.
- Блоки `describe` верхнего уровня — `Critical User Paths`, `Error handling`, `Edge Cases`, `Accessibility` и `Performance`.
- Сломайте код, который охраняет новый тест, и убедитесь, что тест падает, прежде чем ему доверять.

## Чек-лист

1. Паттерн APG: части, роли, атрибуты, клавиши.
2. `state({...})`: чем владеет родитель, что внутреннее, чем владеет браузер, откуда берётся коллекция, до каких частей доходят действия.
3. Фрагменты, которые покрывают паттерн.
4. Шаги, которые фрагменты не покрывают, каждый с `listening` для читаемых входов браузера.
5. Части вывода с селекторами, читающими как можно меньше; `live` и `props` для кадров и свойств.
6. Инварианты, каждый с починкой.
7. Тесты в node на `simulate` для каждой клавиши паттерна.
8. Компонент: `useWidget`, `useOutput`, `useItem` и рефы, ничего больше.
9. Браузерные тесты на разметку и фокус и changeset для `@vega-ui/widgets` и `@vega-ui/react`.

## Частые ошибки

- **Логика в компоненте.** Условие про клавиши, выбор или фокус в `.tsx`-файле принадлежит шагу. Компонент, вызывающий `focus()` или `showPopover()` в эффекте, спорит с виджетом за элемент.
- **Вход браузера без `listening`.** Адаптер его не слушает, а `simulate` отклоняет, поэтому шаг никогда не запускается.
- **Запись значения, которым владеет браузер.** Поповер, закрытый light dismiss, закрыт: читайте это через `matching`, следуйте этому в выводе и отвечайте на `open` родителя, только когда он меняется.
- **Хранение производного значения.** Точка табуляции, id элемента или отфильтрованный список в состоянии устаревают; вычисляйте их из снимка.
- **Селектор, читающий всё состояние.** Часть перерисовывается при каждом изменении своего кортежа, поэтому селектор, возвращающий `state`, перерисовывает каждый элемент на каждом входе.
- **`onChangeX` из починки или из `lifecycle.options`.** Починка тихая и никогда не пишет контролируемое значение; шаг, отвечающий на `lifecycle.options`, следует опциям в том, что показывает, и никогда не меняет собственное значение.
- **Строка там, где нужен вход.** Сравнивайте через `input.is(spec)` и объявляйте команды через `command(name)`, чтобы опечатка была ошибкой типа, а не шагом, который никогда не отвечает.
