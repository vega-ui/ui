# Toolbar

## Профиль документа

`advanced interactive`

## Кратко

`Toolbar` — [составной компонент](../../glossary.md#составной-компонент-compound-component), который собирает контролы, например кнопки форматирования редактора, в одну остановку табуляции по [паттерну WAI-ARIA toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/). `ToolbarItem` делает контрол одним из её элементов: стрелки оси `orientation` переносят фокус между элементами и с краёв переходят на противоположный конец, Home и End переходят к первому и последнему элементу, а Tab возвращает на элемент, который был в фокусе последним. Элементы [ToggleGroup](../toggle-group/) внутри панели входят в ту же навигацию.

## Импорт

```tsx
import {
  Toolbar,
  ToolbarItem,
  type ToolbarProps,
  type ToolbarItemProps,
  type ToolbarOrientation,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `ToolbarProps`
- `ToolbarItemProps`
- `ToolbarOrientation`

## Минимальная композиция

<!-- example: toolbar/minimal-composition.tsx -->
```tsx
import { Button, Icon, Separator, Toggle, Toolbar, ToolbarItem } from '@vega-ui/react';
import { BoldIcon, ItalicIcon, LinkIcon, UnderlineIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Toolbar aria-label='Formatting'>
      <ToolbarItem asChild>
        <Toggle square size='sm' aria-label='Bold'><Icon><BoldIcon /></Icon></Toggle>
      </ToolbarItem>
      <ToolbarItem asChild>
        <Toggle square size='sm' aria-label='Italic'><Icon><ItalicIcon /></Icon></Toggle>
      </ToolbarItem>
      <ToolbarItem asChild>
        <Toggle square size='sm' aria-label='Underline'><Icon><UnderlineIcon /></Icon></Toggle>
      </ToolbarItem>
      <Separator orientation='vertical' />
      <ToolbarItem asChild>
        <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Insert link'>
          <Icon><LinkIcon /></Icon>
        </Button>
      </ToolbarItem>
    </Toolbar>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле и импортируйте этот компонент везде. `MyToolbarToggle` передаёт свои пропсы квадратному `Toggle`, который становится `ToolbarItem`, берёт имя из `label` и оборачивает дочернюю иконку в `Icon`. См. [Рецепты компонентов](../../recipes.md).

<!-- example: toolbar/recipe.tsx -->
```tsx
import { useState, type CSSProperties } from 'react';
import {
  Icon,
  Text,
  Toggle,
  Toolbar,
  ToolbarItem,
  type ToggleProps,
} from '@vega-ui/react';
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from '@vega-ui/icons';

interface MyToolbarToggleProps extends ToggleProps {
  label: string
}

export function MyToolbarToggle({ label, children, ...props }: MyToolbarToggleProps) {
  return (
    <ToolbarItem asChild>
      <Toggle square size='xs' aria-label={label} {...props}>
        <Icon>{children}</Icon>
      </Toggle>
    </ToolbarItem>
  );
}

export default function Recipe() {
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strikethrough, setStrikethrough] = useState(false);

  const decorations: string[] = [];
  if (underline) decorations.push('underline');
  if (strikethrough) decorations.push('line-through');

  const preview: CSSProperties = {
    margin: 0,
    padding: 'var(--spacing-8)',
    fontWeight: bold ? 700 : 400,
    fontStyle: italic ? 'italic' : 'normal',
    textDecoration: decorations.length === 0 ? 'none' : decorations.join(' '),
    overflowWrap: 'anywhere',
  };

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 480,
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
        overflow: 'hidden',
      }}
    >
      <Toolbar aria-label='Formatting' style={{ padding: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>
        <MyToolbarToggle label='Bold' pressed={bold} onChangePressed={setBold}><BoldIcon /></MyToolbarToggle>
        <MyToolbarToggle label='Italic' pressed={italic} onChangePressed={setItalic}><ItalicIcon /></MyToolbarToggle>
        <MyToolbarToggle label='Underline' pressed={underline} onChangePressed={setUnderline}><UnderlineIcon /></MyToolbarToggle>
        <MyToolbarToggle label='Strikethrough' pressed={strikethrough} onChangePressed={setStrikethrough}><StrikethroughIcon /></MyToolbarToggle>
      </Toolbar>
      <Text asChild size={3}>
        <p style={preview}>Ship the toolbar first, then write its docs and examples.</p>
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Toolbar`: корень с `role="toolbar"`, которому принадлежат остановка табуляции и стрелки; имя ему даёт ваш `aria-label`
- `ToolbarItem`: делает контрол одним из элементов — `<button>` или ваш контрол через `asChild`

## Необязательные части

- [Toggle](../toggle/): кнопка, которая остаётся нажатой, внутри `ToolbarItem`
- [ToggleGroup](../toggle-group/) с `ToggleGroupToggle`: набор переключателей, элементы которого сами входят в навигацию панели
- [Menu](../menu/) с `MenuTrigger` внутри `ToolbarItem`: кнопка «Ещё», которая открывает меню
- [TextField](../text-field/) с `TextFieldInput` внутри `ToolbarItem`: поле, например поиск
- [Separator](../separator/): линия между группами элементов

## Порядок композиции

1. `Toolbar`
2. `ToolbarItem`, `ToggleGroup` и `Separator` в том порядке, в котором они показаны
3. Внутри `ToolbarItem` с `asChild` — контрол: `Button`, `Toggle`, `MenuTrigger` или `TextFieldInput`

## Варианты

- Ориентация через `orientation`: `horizontal` (по умолчанию) со стрелками влево и вправо или `vertical` со стрелками вверх и вниз
- Элементы — обычный `<button>` или, через `asChild`, ваш `Button`, `Toggle`, `MenuTrigger` или `TextFieldInput`
- Отключённые элементы через `disabled` на `ToolbarItem`, на `ToggleGroup` или на его элементах
- Группы переключателей через `ToggleGroup`: один нажатый за раз или каждый сам по себе с `multiple`

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Остановка табуляции стоит на первом доступном элементе, пока фокус не вошёл в панель, а потом — на элементе, который был в фокусе последним. Если этот элемент становится отключённым, остановка возвращается на первый доступный элемент.
- `disabled` на `ToolbarItem` отключает контрол нативно, и стрелки его пропускают. О `disabled`, заданном только на дочернем элементе, панель не знает.
- Текстовое поле оставляет себе стрелки влево и вправо, Home и End для каретки, поэтому в горизонтальной панели стрелки никогда не выводят из него фокус. Ставьте его последним, чтобы стрелки доходили до всех остальных элементов.
- Стрелка вниз на элементе с `MenuTrigger` открывает его меню, а стрелка вверх — открывает его на последнем пункте, как у триггера [Menu](../menu/). Пока меню открыто, стрелки работают внутри него; Escape закрывает его и возвращает фокус на элемент.
- Стрелки следуют направлению письма: на странице с письмом справа налево стрелка влево переносит на следующий элемент.
- Элементы `ToggleGroup` внутри панели — элементы панели: Tab входит в панель на её первом элементе или на том, что был в фокусе последним, а не на нажатом элементе группы.
- Вертикальный `Separator`, который лежит прямо в панели, растягивается на её высоту, а горизонтальный в вертикальной панели получает отступы.

## Частые ошибки

- Панель без `aria-label` или `aria-labelledby`: компоненты сами подписи не ставят, и скринридер объявляет только «панель инструментов».
- Контрол в панели без `ToolbarItem`: у него остаётся своя остановка табуляции, и стрелки до него не доходят.
- `ToolbarItem` вокруг элементов `ToggleGroup`: они уже элементы панели.
- `disabled` на дочернем элементе вместо `ToolbarItem`: панель всё ещё считает элемент доступным, и остановка табуляции может оказаться на контроле, который не принимает фокус.
- Панель для одного контрола или для навигационных ссылок: панель инструментов — для набора из трёх и более контролов, которые действуют на что-то одно, например на текст редактора.
