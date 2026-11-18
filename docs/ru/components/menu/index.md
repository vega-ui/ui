# Menu

## Профиль документа

`advanced interactive`

## Кратко

`Menu` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для списка действий или настроек, который открывается кнопкой. `MenuTrigger` — кнопка меню, `MenuContent` — поповер с `role="menu"` в верхнем слое, а `MenuItem`, `MenuCheckboxItem` и `MenuRadioItem` — его пункты. Компонент следует паттернам WAI-ARIA «кнопка меню» и «меню»: при открытии фокус переходит на пункт, стрелки и поиск при наборе переносят его между пунктами, а выполненный пункт закрывает меню и возвращает фокус на триггер.

## Импорт

```tsx
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuGroup,
  MenuItemIndicator,
  type MenuProps,
  type MenuTriggerProps,
  type MenuContentProps,
  type MenuItemProps,
  type MenuCheckboxItemProps,
  type MenuRadioGroupProps,
  type MenuRadioItemProps,
  type MenuGroupProps,
  type MenuItemIndicatorProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `MenuProps`
- `MenuTriggerProps`
- `MenuContentProps`
- `MenuItemProps`
- `MenuCheckboxItemProps`
- `MenuRadioGroupProps`
- `MenuRadioItemProps`
- `MenuGroupProps`
- `MenuItemIndicatorProps`
- `MenuSize`

## Минимальная композиция

<!-- example: menu/minimal-composition.tsx -->
```tsx
import { Button, Menu, MenuContent, MenuItem, MenuTrigger, Separator } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Edit</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Undo</MenuItem>
        <MenuItem disabled>Redo</MenuItem>
        <Separator />
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </MenuContent>
    </Menu>
  );
}
```
<!-- /example -->

## Обязательные части

- `Menu`: корень, который хранит состояние открытия, расположение и размер; своего элемента не рендерит
- `MenuTrigger`: `<button aria-haspopup="menu">`, который открывает меню
- `MenuContent`: поповер с `role="menu"`, в котором лежат пункты
- `MenuItem`: `<button role="menuitem">`, который выполняет действие, или ссылка через `asChild`

## Необязательные части

- `MenuCheckboxItem`: пункт, который отмечается и снимается (`menuitemcheckbox`)
- `MenuRadioGroup` и `MenuRadioItem`: группа пунктов, из которых отмечен один (`menuitemradio`)
- `MenuGroup`: `role="group"` вокруг связанных пунктов
- `MenuItemIndicator`: галочка пункта-флажка или радиопункта
- [Separator](../separator/): линия между группами пунктов

## Порядок композиции

1. `Menu`
2. `MenuTrigger`
3. `MenuContent`
4. `MenuItem`, `MenuCheckboxItem`, `MenuRadioGroup` с `MenuRadioItem`, `MenuGroup` и `Separator` — в том порядке, в котором они показаны
5. `MenuItemIndicator` внутри пункта-флажка или радиопункта

## Варианты

- Неконтролируемое через `defaultOpen` или [контролируемое](../../glossary.md#контролируемый-controlled) через `open` и `onChangeOpen`
- Расположение через `placement`: сторона (`top`, `right`, `bottom`, `left`) с необязательным `-start` или `-end`; по умолчанию `bottom-start`
- Размеры через `size`: `xs`, `sm`, `md`, `lg`, `xl`
- Обычные пункты с действием, пункты-флажки, группы радиопунктов и пункты-ссылки через `asChild`
- Вложенные меню через `MenuSubmenu` и `MenuSubmenuTrigger` любой глубины

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

- Отключённый пункт получает `aria-disabled="true"`, а не нативный `disabled`: стрелки и поиск при наборе до него доходят, но его `onClick` не вызывается, и меню остаётся открытым.
- `preventDefault()` в `onClick` пункта оставляет меню открытым. Ваш `onClick` выполняется раньше, чем реагирует меню.
- Пробел на пункте-флажке или радиопункте меняет его состояние и оставляет меню открытым; Enter или щелчок меняют состояние и закрывают меню.
- `MenuContent` и его пункты остаются отрендеренными, пока меню закрыто: состояние внутри них сохраняется, а триггер может открыть меню сразу на последнем пункте.
- Срабатывание пункта вложенного меню закрывает все меню и возвращает фокус на кнопку меню. Escape и стрелка из вложенного меню закрывают только его.
- Пока указатель идёт от пункта к его открытому вложенному меню, пункты на пути не забирают фокус, и вложенное меню остаётся открытым.
- Строки меню (menubar) и контекстного меню по правому щелчку в этой версии нет.

## Частые ошибки

- Триггер из одной иконки без `aria-label`: меню получает имя от триггера, поэтому без имени остаются оба. Компоненты сами подписи не ставят.
- `Menu` для выбора значения, которое отправляется с формой; для этого есть [Select](../select/). Радиопункты в меню — это настройки вида, например порядок сортировки, которые применяются сразу.
- Поля, слайдеры и другие контролы внутри `MenuContent`: в меню лежат только пункты. Для интерактивного содержимого есть [Popover](../popover/).
- Ожидание нативного `disabled` у пункта: отключённые пункты меню остаются фокусируемыми, поэтому стилизуйте `[aria-disabled="true"]`, а не `:disabled`.
- `MenuGroup` или `MenuRadioGroup` без имени, хотя у группы есть видимый заголовок; укажите этот заголовок в `aria-labelledby`.
