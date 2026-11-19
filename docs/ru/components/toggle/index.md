# Toggle

## Профиль документа

`advanced interactive`

## Кратко

`Toggle` — кнопка, которая остаётся нажатой: клик, Enter или Space включают и выключают её, а `aria-pressed` сообщает её состояние вспомогательным технологиям по [паттерну WAI-ARIA button](https://www.w3.org/WAI/ARIA/apg/patterns/button/). Это [Button](../button/), с `square` — для одной иконки, прозрачный, когда отжат, и с оттенком основного цвета, когда нажат. Используйте её для состояния, которое применяется сразу: полужирный текст, выключенный микрофон, показанная линейка. Несколько переключателей, которые составляют один выбор или один набор фильтров, положите в [ToggleGroup](../toggle-group/).

## Импорт

```tsx
import { Toggle, type ToggleProps } from '@vega-ui/react';
```

## Экспортируемые типы

- `ToggleProps`

## Базовое использование

<!-- example: toggle/minimal-composition.tsx -->
```tsx
import { Icon, Toggle } from '@vega-ui/react';
import { RulerIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Toggle size='sm'>
      <Icon size='sm'><RulerIcon /></Icon>
      Show ruler
    </Toggle>
  );
}
```
<!-- /example -->

## Обязательные части

- `Toggle`: переключатель

## Необязательные части

- `Icon`: рядом с текстом или один с `square` и `aria-label`
- [Toolbar](../toolbar/) вокруг переключателей: каждый кладут в `ToolbarItem` с `asChild`

## Порядок композиции

1. `Toggle`
2. Его содержимое: `Icon` и текст или один `Icon` с `square`

## Варианты

- Неконтролируемый через `defaultPressed` или контролируемый через `pressed` и `onChangePressed`
- Размеры через `size`: `xs`, `sm`, `md`, `lg`, `xl`, как у `Button`
- Отключение через `disabled`
- Текст, иконка с текстом или одна иконка с `square` и `aria-label`
- Один вид: `secondary` и `transparent`, пока отжат, цвета `primary` `ghost`, пока нажат; пропов `variant` и `appearance` нет

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)
- [ToggleGroup](../toggle-group/)

## Пограничные случаи

- `Toggle` рендерит `<button type="button">`, поэтому никогда не отправляет форму вокруг. С `asChild` он передаёт `type="button"` и дочернему элементу, если тот не задаёт свой `type`.
- С `asChild` `variant` и `appearance`, заданные на дочернем элементе, перебивают вид переключателя, и нажатое состояние больше не видно. Не задавайте их на дочернем элементе.
- `disabled` отключает нативную кнопку; нажатый переключатель остаётся нажатым, пока отключён.
- `Toggle` самостоятельный: он не бывает элементом [ToggleGroup](../toggle-group/). Для переключателей, которые составляют один выбор, используйте `ToggleGroup` с элементами `ToggleGroupToggle`.
- Внутри [Toolbar](../toolbar/) оберните переключатель в `ToolbarItem` с `asChild`, чтобы он стал элементом панели.

## Частые ошибки

- Подпись, которая меняется вместе с состоянием, например «Mute» и «Unmute»: скринридер уже объявляет «нажата», а новая подпись заставляет его объявить другую кнопку. Оставьте одну подпись и меняйте, если нужно, только иконку.
- Переключатель только с иконкой без `aria-label`: компоненты сами подписи не ставят.
- Переключатель для действия, которое выполняется один раз, например «Save»: используйте [Button](../button/).
- Переключатель для значения, которое отправляет форма: используйте [Switch](../switch/) или [Checkbox](../checkbox/).
- Набор взаимоисключающих переключателей из отдельных переключателей со своими `pressed`: используйте [ToggleGroup](../toggle-group/) с элементами `ToggleGroupToggle`, который хранит одно значение и одну остановку табуляции.
