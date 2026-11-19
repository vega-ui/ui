# ToggleGroup: стилизация

## Обзор

`ToggleGroup` выкладывает элементы строкой `inline-flex` с `align-items: center` и промежутком `var(--spacing-1)`; своего фона, рамки и ориентации у неё нет. Элементы `ToggleGroupToggle` выглядят как [Toggle](../toggle/styling.md): отжатые и нажатые, через переменные кнопки.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--button-height` | элементы | Высота и ширина с `square`; её задаёт `size`. |
| `--button-color` | элементы | Цвет текста и иконки, с `--button-color-hover` и `--button-color-active`. |
| `--button-background-color` | элементы | Фон, с `--button-background-color-hover` и `--button-background-color-active`. |
| `--button-border-color` | элементы | Цвет рамки, с `-hover` и `-active`. |

## Переменные на уровне частей

- `ToggleGroup`: `display: inline-flex`, `align-items: center`, `gap: var(--spacing-1)`. Для столбца, например в вертикальной [Toolbar](../toolbar/), задайте `flex-direction: column` сами.
- Элементы: переменные отжатого и нажатого состояний [Toggle](../toggle/styling.md#переменные-на-уровне-частей).

## Взаимодействие состояний и вариантов

- `[role='radiogroup']` и `[role='group']` различают два режима группы.
- `[aria-checked='true']` отмечает нажатый элемент группы без `multiple`, а `[aria-pressed='true']` — нажатые элементы группы с `multiple`. `[data-pressed='true']` отмечает их все.
- `[data-variant='secondary']` и `[data-appearance='transparent']` элемента одинаковы в обоих состояниях: нажатые элементы выбирайте по `[data-pressed='true']`.
- `:disabled`, `:hover`, `:active` и `:focus-visible` работают как у кнопки.

## Примеры

Передайте группе без `multiple` `className='segmentedGroup'`, чтобы элементы слились на тонированной дорожке:

<!-- example: toggle-group/styling-examples.css -->
```css
.segmentedGroup[role='radiogroup'] {
  gap: 0;
  padding: var(--spacing-1);
  border-radius: var(--radius-4);
  background: var(--fills-tertiary);
}

.segmentedGroup [aria-checked='true'] {
  --button-color: var(--label-primary);
  --button-color-hover: var(--label-primary);
  --button-color-active: var(--label-primary);
  --button-background-color: var(--surface-primary);
  --button-background-color-hover: var(--surface-primary);
  --button-background-color-active: var(--surface-primary);
}
```
<!-- /example -->

## Что не переопределять

- Не убирайте кольцо фокуса: стрелки переносят фокус, не нажимая, так что кольцо — единственный признак элемента в фокусе.
- Не меняйте порядок элементов через `order` или `row-reverse`: стрелки следуют порядку в DOM.
- Не скрывайте доступный элемент через `display: none`: он остаётся элементом. Уберите его или отключите.
- Не делайте так, чтобы нажатый элемент отличался только оттенком: оставьте фон или заливку, которые видны без цвета.
