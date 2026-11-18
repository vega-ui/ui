# ContextMenu

## Профиль документа

`advanced interactive`

## Кратко

`ContextMenu` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для меню, которое открывается там, где пользователь его попросил: правым щелчком, долгим нажатием или клавишей контекстного меню на области. `ContextMenuTrigger` — эта область, а само меню собирается из частей [Menu](../menu/): `MenuContent` и его пунктов. Оно открывается в точке вместо меню браузера, переносит фокус на первый пункт, а стрелки, поиск при наборе и вложенные меню работают так же, как в `Menu`.

## Импорт

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuGroup,
  MenuItemIndicator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  type ContextMenuProps,
  type ContextMenuTriggerProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `ContextMenuProps`
- `ContextMenuTriggerProps`

## Минимальная композиция

<!-- example: context-menu/minimal-composition.tsx -->
```tsx
import { ContextMenu, ContextMenuTrigger, MenuContent, MenuItem, Separator, Text } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <ContextMenu>
      <ContextMenuTrigger
        style={{
          display: 'grid',
          placeItems: 'center',
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: 360,
          height: 160,
          padding: 'var(--spacing-8)',
          border: '1px dashed var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Right click or long press here</Text>
      </ContextMenuTrigger>
      <MenuContent aria-label='Edit'>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem disabled>Paste</MenuItem>
        <Separator />
        <MenuItem>Select all</MenuItem>
      </MenuContent>
    </ContextMenu>
  );
}
```
<!-- /example -->

## Обязательные части

- `ContextMenu`: корень, который хранит состояние открытия и размер; рендерит только скрытую точку, в которой открывается меню
- `ContextMenuTrigger`: область, которая открывает меню, — `<div>` или ваш элемент через `asChild`
- `MenuContent`: поповер с `role="menu"`, в котором лежат пункты; имя ему даёт ваш `aria-label`
- `MenuItem`: `<button role="menuitem">`, который выполняет действие

## Необязательные части

- `MenuCheckboxItem`, `MenuRadioGroup` с `MenuRadioItem`, `MenuGroup` и `MenuItemIndicator` — как в [Menu](../menu/anatomy.md)
- `MenuSubmenu` и `MenuSubmenuTrigger`: вложенное меню
- [Separator](../separator/): линия между группами пунктов

## Порядок композиции

1. `ContextMenu`
2. `ContextMenuTrigger`
3. `MenuContent`
4. Пункты, группы, разделители и `MenuSubmenu` в том порядке, в котором они показаны

## Варианты

- Отслеживается через `onChangeOpen`; `open` и `defaultOpen` нет, потому что меню открывается только в точке, которую задаёт пользователь
- Размеры через `size`: `xs`, `sm`, `md`, `lg`, `xl`
- Область — `<div>` или, через `asChild`, ваш элемент: строка списка, карточка или обёртка холста
- Обычные пункты, пункты-флажки, группы радиопунктов и вложенные меню — как в `Menu`

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

- Долгое нажатие открывает меню через 700 мс, если палец остаётся на месте и сдвигается меньше чем на 10 px. Это работает и на iOS, где события `contextmenu` нет. Долгое нажатие забирает касание у страницы, поэтому страница не прокручивается, и глотает клик, которым оно заканчивается.
- Клавиша контекстного меню и Shift+F10 открывают меню, пока фокус внутри области: для них браузер отправляет `contextmenu`. На macOS клавиши контекстного меню нет. Меню, открытое с клавиатуры, появляется у элемента в фокусе.
- Меню браузера не показывается ни внутри области, ни внутри открытого меню. Текстовое поле, select или редактируемый элемент внутри области его сохраняют, со вставкой и проверкой орфографии, а долгое нажатие на них выделяет текст как обычно.
- Правый щелчок в другом месте области, пока меню открыто, переносит меню в новую точку.
- У краёв окна меню переворачивается вверх, к началу строки или в обе стороны, чтобы остаться видимым.
- Библиотека не переносит фокус при закрытии меню: браузер возвращает его на элемент, который был в фокусе, когда меню открылось. Если перед правым щелчком по области ничего не было в фокусе, фокус уходит на страницу.
- Контекстного меню из области, вложенной в область другого контекстного меню, и строки меню (menubar) в этой версии нет.

## Частые ошибки

- Единственный путь к действию — через контекстное меню. Контекстное меню не найти глазами, и многие пользователи никогда не нажимают правую кнопку: каждое его действие должно быть доступно и по-другому, например видимой кнопкой или [Menu](../menu/) на кнопке «Ещё».
- `MenuContent` без `aria-label` или `aria-labelledby`: у меню нет кнопки, которая дала бы ему имя, а компоненты сами подписи не ставят.
- Ожидание семантики кнопки меню у области: у `ContextMenuTrigger` нет роли, `aria-haspopup` и `aria-expanded`.
- Поиск пропа `placement`: меню открывается в точке.
- Поля, слайдеры и другие контролы внутри `MenuContent`: в меню лежат только пункты. Для интерактивного содержимого есть [Popover](../popover/).
