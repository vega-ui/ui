# Toggle: стилизация

## Обзор

`Toggle` выглядит как [Button](../button/styling.md), с `square` или без, в двух состояниях. Он рендерит `variant="secondary"` и `appearance="transparent"`, а нажатое состояние рисует переменными `primary` `ghost` на `[data-pressed='true']`, поэтому своих `variant` и `appearance` не принимает. Меняйте вид через переменные кнопки на нажатом и отжатом состояниях. Раскладка [ToggleGroup](../toggle-group/styling.md) описана на её странице.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--button-height` | `Toggle` | Высота и ширина с `square`; её задаёт `size`. |
| `--button-br-ratio` | `Toggle` | Радиус скругления как доля высоты. |
| `--button-color` | `Toggle` | Цвет текста и иконки, с `--button-color-hover` и `--button-color-active`. |
| `--button-background-color` | `Toggle` | Фон, с `--button-background-color-hover` и `--button-background-color-active`. |
| `--button-border-color` | `Toggle` | Цвет рамки, с `-hover` и `-active`. |

## Переменные на уровне частей

- Отжат: переменные `secondary` `transparent` — прозрачный фон и цвет подписи.
- Нажат: переменные `primary` `ghost` — оттенок `--color-primary-500` за основным цветом текста и иконки.
- Отключён: цвета отключённой кнопки в обоих состояниях.

## Взаимодействие состояний и вариантов

- `[aria-pressed='true']` и `[data-pressed='true']` отмечают нажатый переключатель.
- `[data-variant='secondary']` и `[data-appearance='transparent']` одинаковы в обоих состояниях: нажатое выбирайте по `[data-pressed='true']`.
- `:disabled`, `:hover`, `:active` и `:focus-visible` работают как у кнопки.

## Примеры

Передайте переключателю `className='markToggle'`, чтобы получить нейтральное нажатое состояние вместо основного оттенка:

<!-- example: toggle/styling-examples.css -->
```css
.markToggle[data-pressed='true'] {
  --button-color: var(--label-primary);
  --button-color-hover: var(--label-primary);
  --button-color-active: var(--label-primary);
  --button-background-color: var(--fills-primary);
  --button-background-color-hover: var(--fills-primary-hover);
  --button-background-color-active: var(--fills-primary-active);
}
```
<!-- /example -->

## Что не переопределять

- Не передавайте `variant` или `appearance` дочернему элементу с `asChild`: они перебивают состояние, и нажатый и отжатый виды совпадают.
- Не делайте так, чтобы нажатое состояние отличалось только оттенком: оставьте фон или заливку, которые видны без цвета.
- Не убирайте кольцо фокуса: фокус остаётся на переключателе после нажатия, и кольцо — единственный признак того, что фокус на нём.
