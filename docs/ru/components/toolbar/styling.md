# Toolbar: стилизация

## Обзор

`Toolbar` раскладывает дочерние элементы через flexbox: строкой с `align-items: center` и промежутком `var(--spacing-2)`, а с `orientation="vertical"` — столбцом, в котором дочерние элементы растягиваются. Своего фона, рамки и внутренних отступов у панели нет, поэтому она подходит для шапки, карточки или плавающей панели. `ToolbarItem` не добавляет стилей: каждый элемент выглядит как его контрол, например `Button` или [Toggle](../toggle/styling.md).

## Публичные CSS-переменные

Своих CSS-переменных у `Toolbar` нет. Элементы берут переменные своих контролов:

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--button-height` | элементы `Button`, `Toggle` и `ToggleGroupToggle` | Высота элемента и ширина элемента с `square`; её задаёт `size`. |
| `--button-color` | элементы | Цвет текста и иконки, с `-hover` и `-active`. |
| `--button-background-color` | элементы | Фон, с `-hover` и `-active`. |
| `--button-border-color` | элементы | Цвет рамки, с `-hover` и `-active`. |

## Переменные на уровне частей

- `Toolbar`: `display: flex`, `align-items: center` и `gap: var(--spacing-2)`; с `data-orientation="vertical"` — `flex-direction: column` и `align-items: stretch`.
- Прямой дочерний `Separator` с `aria-orientation="vertical"` получает `align-self: stretch`, `height: auto` и отступ `var(--spacing-2)` с обеих сторон; с `aria-orientation="horizontal"` — такой же отступ сверху и снизу.
- `ToolbarItem`: стилей нет.
- `ToggleGroup` внутри панели: `display: inline-flex` с промежутком `var(--spacing-1)`, строкой в обеих ориентациях.

## Взаимодействие состояний и вариантов

- `data-orientation` на корне — `horizontal` или `vertical`; вертикальную панель стилизуйте через `[data-orientation='vertical']`.
- `[aria-pressed='true']` отмечает нажатый `Toggle` или элемент `ToggleGroup` с `multiple`, а `[aria-checked='true']` — нажатый элемент `ToggleGroup`; `[data-pressed='true']` отмечает и то, и другое.
- `:disabled` отмечает отключённый элемент, `[aria-expanded='true']` — `MenuTrigger` с открытым меню, а `:focus-visible` — элемент, на который фокус перенесла клавиатура.

## Примеры

Передайте `Toolbar` `className='editorToolbar'`, чтобы получить тонированную панель с более плотными элементами и нейтральным нажатым состоянием:

<!-- example: toolbar/styling-examples.css -->
```css
.editorToolbar[role='toolbar'] {
  gap: var(--spacing-1);
  padding: var(--spacing-2);
  border-radius: var(--radius-4);
  background: var(--fills-tertiary);
}

.editorToolbar[data-orientation='vertical'] {
  width: max-content;
}

.editorToolbar [aria-pressed='true'],
.editorToolbar [aria-checked='true'] {
  --button-background-color: var(--fills-primary);
  --button-background-color-hover: var(--fills-primary-hover);
  --button-background-color-active: var(--fills-primary-active);
  --button-color: var(--label-primary);
  --button-color-hover: var(--label-primary);
  --button-color-active: var(--label-primary);
}
```
<!-- /example -->

## Что не переопределять

- Не скрывайте доступный элемент через `display: none` или `visibility: hidden`: он остаётся элементом, и стрелки пытаются перенести на него фокус. Уберите его из панели.
- Не меняйте порядок через `flex-direction: row-reverse` или `order`: стрелки следуют порядку в DOM, а не порядку на экране.
- Не убирайте кольцо фокуса у элементов: в панели фокус переносится стрелками, и кольцо — единственный признак текущего элемента.
- Не ставьте `tabindex` на элементы сами: панель сама переносит остановку табуляции между ними.
