# Menu: анатомия

## Обзор

`Menu` состоит из корня, триггера, самого меню и его пунктов. Корень хранит состояние и ничего не рендерит, `MenuTrigger` открывает меню, а `MenuContent` переносит фокус между пунктами. Пункты регистрируются в порядке рендера, и в этом же порядке по ним ходят стрелки и поиск при наборе; группы и разделители его не меняют.

## Обязательные части

### `Menu`

Хранит, показано ли меню (`open`, `defaultOpen`, `onChangeOpen`), а также `placement` и `size`. Собственного элемента не рендерит.

### `MenuTrigger`

Рендерит `<button type="button">` с `aria-haspopup="menu"`, `aria-expanded`, `aria-controls` и `popovertarget`, указывающим на меню. С `asChild` рендерит вашу кнопку, например `Button` или `IconButton`. Это CSS-якорь, к которому привязано меню, и он же даёт меню имя.

### `MenuContent`

Рендерит `<div popover="auto" role="menu" tabindex="-1">`, подписанный триггером через `aria-labelledby`, если вы не передали свой `aria-label` или `aria-labelledby`. Браузер показывает его в верхнем слое, поэтому `overflow` и контексты наложения его не обрезают. Пока меню закрыто, элемент остаётся отрендеренным.

### `MenuItem`

Рендерит `<button type="button" role="menuitem" tabindex="-1">`. С `asChild` рендерит вместо него ваш элемент, например `<a href>` для перехода. `disabled` ставит `aria-disabled="true"`, и пункт остаётся фокусируемым.

## Необязательные части

### `MenuCheckboxItem`

Рендерит `<button role="menuitemcheckbox">` с `aria-checked`. Сам хранит `checked`, `defaultChecked` и `onChangeChecked`.

### `MenuRadioGroup` и `MenuRadioItem`

`MenuRadioGroup` рендерит `<div role="group">` и хранит `value`, `defaultValue` и `onChangeValue` своих пунктов. Каждый `MenuRadioItem` рендерит `<button role="menuitemradio">` с `aria-checked` и значением `value`. Дайте группе имя через `aria-label` или `aria-labelledby`.

### `MenuGroup`

Рендерит `<div role="group">` вокруг связанных пунктов. Дайте ей имя через `aria-labelledby`, указывающий на видимый заголовок внутри группы, или через `aria-label`.

### `MenuItemIndicator`

Рендерит иконку галочки с `aria-hidden`. Внутри пункта-флажка или радиопункта занимает своё место в каждом пункте, а видна только в отмеченном, поэтому подписи отмеченных и неотмеченных пунктов стоят ровно. Дочерние элементы заменяют иконку.

### `MenuSubmenu` и `MenuSubmenuTrigger`

`MenuSubmenu` держит вложенное меню внутри `MenuContent`: показано ли оно (`open`, `defaultOpen`, `onChangeOpen`); своего элемента не рендерит. `MenuSubmenuTrigger` рендерит `<button role="menuitem" aria-haspopup="menu">` с `aria-expanded` и `aria-controls`: это пункт окружающего меню, и он даёт имя вложенному меню. Вложенное меню — это `MenuContent`, который идёт за ним внутри того же `MenuSubmenu`; оно открывается рядом с пунктом, в конце строки по направлению письма, и берёт размер окружающего меню. Вложенное меню может содержать ещё один `MenuSubmenu`.

### `Separator`

Компонент [Separator](../separator/) — линия с `role="separator"` между группами пунктов. Меню добавляет отступы вокруг неё.

## Порядок композиции

1. `Menu`
2. `MenuTrigger`
3. `MenuContent`
4. Пункты, группы, разделители и `MenuSubmenu` в том порядке, в котором они показаны
5. Внутри `MenuSubmenu`: `MenuSubmenuTrigger`, затем `MenuContent` вложенного меню
6. `MenuItemIndicator` и подпись внутри пункта-флажка или радиопункта

## Корректные варианты композиции

В одном меню можно сочетать обычные пункты, подписанную группу пунктов-флажков и группу радиопунктов, разделив их разделителями. Здесь индикаторы стоят в конце пунктов, поэтому все подписи начинаются там же, где у обычных пунктов выше.

<!-- example: menu/valid-composition-patterns.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';

const groupHeading: CSSProperties = {
  display: 'block',
  paddingInline: 'var(--spacing-8)',
  paddingBlock: 'var(--spacing-2)',
  color: 'var(--label-secondary)',
};

const indicatorEnd: CSSProperties = { marginInlineStart: 'auto' };

export default function ValidCompositionPatterns() {
  const panelsId = useId();
  const widthId = useId();

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Editor</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Focus mode</MenuItem>
        <MenuItem>Full screen</MenuItem>
        <Separator />
        <MenuGroup aria-labelledby={panelsId}>
          <Text id={panelsId} size={2} fontWeight={500} style={groupHeading}>Panels</Text>
          <MenuCheckboxItem defaultChecked>Outline<MenuItemIndicator style={indicatorEnd} /></MenuCheckboxItem>
          <MenuCheckboxItem>Comments<MenuItemIndicator style={indicatorEnd} /></MenuCheckboxItem>
        </MenuGroup>
        <Separator />
        <MenuRadioGroup aria-labelledby={widthId} defaultValue='standard'>
          <Text id={widthId} size={2} fontWeight={500} style={groupHeading}>Page width</Text>
          <MenuRadioItem value='standard'>Standard<MenuItemIndicator style={indicatorEnd} /></MenuRadioItem>
          <MenuRadioItem value='wide'>Wide<MenuItemIndicator style={indicatorEnd} /></MenuRadioItem>
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Пункты вне `MenuContent`

Пункт вне меню не входит в `role="menu"`, и меню не обрабатывает его щелчки и клавиши. Держите все пункты внутри `MenuContent`.

### `MenuRadioItem` вне `MenuRadioGroup`

Значение радиопункта хранит его группа; вне группы пункт никогда не отмечается.

### `MenuSubmenuTrigger` вне `MenuSubmenu`

Пункт, который открывает вложенное меню, принадлежит своему `MenuSubmenu`; вне него он занимает место кнопки окружающего меню. Кладите его и `MenuContent` вложенного меню в один `MenuSubmenu`.

### Заголовки и контролы прямо в меню

В `role="menu"` лежат пункты, группы и разделители. Элемент заголовка прямо в меню, текстовое поле или кнопка, которая не является пунктом, для скринридера не пункт меню, и стрелками до них не дойти. Заголовок группы ставьте обычным текстом внутрь `MenuGroup` и указывайте его в её `aria-labelledby`; интерактивное содержимое выносите в [Popover](../popover/).
