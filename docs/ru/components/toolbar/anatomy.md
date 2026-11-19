# Toolbar: анатомия

## Обзор

`Toolbar` состоит из корня и элементов. Корень — элемент с `role="toolbar"`, которому принадлежат остановка табуляции и стрелки, а каждый `ToolbarItem` регистрирует один контрол как элемент. Элементы `ToggleGroup` внутри панели регистрируются сами. Элементы регистрируются в порядке рендера, и в этом же порядке по ним ходят стрелки.

## Обязательные части

### `Toolbar`

Рендерит `<div role="toolbar" aria-orientation>` с `data-orientation`. Принимает все HTML-атрибуты и `ref`. Раскладывает дочерние элементы в строку, а с `orientation="vertical"` — в столбец, с промежутком между ними. Своего имени у панели нет: передайте `aria-label` или `aria-labelledby`.

### `ToolbarItem`

Рендерит `<button type="button">`, а с `asChild` — свой единственный дочерний элемент, например `Button`, `Toggle`, `MenuTrigger` или `TextFieldInput`. Даёт контролу `tabIndex={0}`, когда на нём остановка табуляции панели, и `-1` в остальных случаях, и обрабатывает на нём стрелки. `disabled` отключает контрол нативно, и стрелки его пропускают. Вне `Toolbar` рендерит контрол как есть, без своего `tabIndex`.

## Необязательные части

### `Toggle`

Компонент [Toggle](../toggle/) — самостоятельная кнопка с `aria-pressed`. Положите его в `ToolbarItem` с `asChild`; переключателю только с иконкой нужны `square` и `aria-label`.

### `ToggleGroup`

Компонент [ToggleGroup](../toggle-group/) с элементами `ToggleGroupToggle`. Внутри панели у него нет своей остановки табуляции и своих стрелок: его элементы — элементы панели, на своём месте среди остальных. Он сохраняет свою роль, `radiogroup` или `group` с `multiple`, и своё значение.

### `Menu` и `MenuTrigger`

[Menu](../menu/), у которого `MenuTrigger` лежит в `ToolbarItem`, например кнопка «Ещё». `Menu` оборачивает `ToolbarItem`, а `MenuContent` идёт после него.

### `TextField` и `TextFieldInput`

[TextField](../text-field/), у которого `TextFieldInput` лежит в `ToolbarItem`. Поле оставляет себе стрелки влево и вправо, Home и End для каретки.

### `Separator`

Компонент [Separator](../separator/) — линия с `role="separator"` между группами элементов. Вертикальный разделитель, который лежит прямо в панели, растягивается на её высоту.

## Порядок композиции

1. `Toolbar`
2. `ToolbarItem`, `ToggleGroup`, `Menu` и `Separator` в том порядке, в котором они показаны
3. Внутри `ToolbarItem` с `asChild`: `Button`, `Toggle`, `MenuTrigger` (со своей кнопкой внутри) или `TextFieldInput`

## Корректные варианты композиции

Панель форматирования над текстом, который она форматирует: `ToggleGroup` с `multiple` для полужирного, курсива и подчёркивания, `ToggleGroup` для выравнивания и `Menu` «Ещё»; группы разделены вертикальным разделителем. Стрелки проходят по всем семи элементам, а стрелка вниз на «Ещё» открывает его меню.

<!-- example: toolbar/text-editor.tsx -->
```tsx
import { useState, type CSSProperties } from 'react';
import {
  Icon,
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuItemIndicator,
  MenuTrigger,
  Separator,
  Text,
  ToggleGroup,
  ToggleGroupToggle,
  Toolbar,
  ToolbarItem,
} from '@vega-ui/react';
import {
  BoldIcon,
  CheckIcon,
  EllipsisIcon,
  ItalicIcon,
  TextAlignCenterIcon,
  TextAlignEndIcon,
  TextAlignStartIcon,
  UnderlineIcon,
} from '@vega-ui/icons';

type Alignment = 'start' | 'center' | 'end';

export default function TextEditor() {
  const [marks, setMarks] = useState<string[]>(['bold']);
  const [alignment, setAlignment] = useState<Alignment>('start');
  const [struckThrough, setStruckThrough] = useState(false);

  const clearFormatting = () => {
    setMarks([]);
    setAlignment('start');
    setStruckThrough(false);
  };

  const decorations: string[] = [];
  if (marks.includes('underline')) decorations.push('underline');
  if (struckThrough) decorations.push('line-through');

  const preview: CSSProperties = {
    margin: 0,
    padding: 'var(--spacing-8)',
    textAlign: alignment,
    fontWeight: marks.includes('bold') ? 700 : 400,
    fontStyle: marks.includes('italic') ? 'italic' : 'normal',
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
        <ToggleGroup aria-label='Text style' size='xs' multiple value={marks} onChangeValue={setMarks}>
          <ToggleGroupToggle value='bold' square aria-label='Bold'><Icon><BoldIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='italic' square aria-label='Italic'><Icon><ItalicIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='underline' square aria-label='Underline'><Icon><UnderlineIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
        <Separator orientation='vertical' />
        <ToggleGroup aria-label='Alignment' size='xs' value={alignment} onChangeValue={(value) => setAlignment(value as Alignment)}>
          <ToggleGroupToggle value='start' square aria-label='Align start'><Icon><TextAlignStartIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='center' square aria-label='Align center'><Icon><TextAlignCenterIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='end' square aria-label='Align end'><Icon><TextAlignEndIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
        <Menu placement='bottom-end' size='sm'>
          <ToolbarItem asChild>
            <MenuTrigger asChild>
              <Button square size='xs' variant='secondary' appearance='transparent' aria-label='More formatting' style={{ marginInlineStart: 'auto' }}>
                <Icon><EllipsisIcon /></Icon>
              </Button>
            </MenuTrigger>
          </ToolbarItem>
          <MenuContent>
            <MenuCheckboxItem checked={struckThrough} onChangeChecked={setStruckThrough}>
              <MenuItemIndicator><CheckIcon /></MenuItemIndicator>
              Strikethrough
            </MenuCheckboxItem>
            <Separator />
            <MenuItem onClick={clearFormatting}>Clear formatting</MenuItem>
          </MenuContent>
        </Menu>
      </Toolbar>
      <Text asChild size={3}>
        <p style={preview}>Ship the toolbar first, then write its docs and examples.</p>
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Контрол без `ToolbarItem`

`Button` или `Toggle`, положенный прямо в панель, сохраняет свою остановку табуляции, и стрелки его пропускают. Оберните его в `ToolbarItem` с `asChild`.

### `ToolbarItem` вокруг `ToggleGroup` или его элементов

Элементы `ToggleGroupToggle` внутри `ToggleGroup` регистрируются в панели сами. `ToolbarItem` вокруг одного из них регистрирует его второй раз, а вокруг всей группы делает элементом сам элемент группы: стрелки останавливаются там, где не должны. В `ToolbarItem` кладут только `Toggle` вне группы.

### `ToolbarItem` вокруг обёртки

`ToolbarItem` с `asChild` отдаёт свои атрибуты единственному дочернему элементу. Вокруг `<div>` или `TextField` остановку табуляции получает обёртка, а не контрол: ставьте `ToolbarItem` прямо вокруг фокусируемого элемента, например `TextFieldInput` внутри `TextField`.

### Панель без имени

Без `aria-label` или `aria-labelledby` скринридер объявляет только «панель инструментов». Назовите её по тому, на что она действует, например «Formatting».
