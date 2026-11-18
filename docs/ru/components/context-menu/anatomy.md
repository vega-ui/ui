# ContextMenu: анатомия

## Обзор

`ContextMenu` состоит из корня, области и меню с пунктами. Корень хранит состояние и рендерит только скрытую точку, в которой открывается меню, `ContextMenuTrigger` — область, которая открывает меню, а само меню — это `MenuContent` из [Menu](../menu/) с теми же пунктами. Пункты регистрируются в порядке рендера, и в этом же порядке по ним ходят стрелки и поиск при наборе.

## Обязательные части

### `ContextMenu`

Хранит, показано ли меню, и сообщает об этом через `onChangeOpen`, а также размер пунктов `size`. Рендерит только скрытую пустую точку в верхнем слое, к которой привязано меню, и `placement` у него нет: меню открывается в точке.

### `ContextMenuTrigger`

Рендерит `<div>` или, с `asChild`, ваш элемент: строку списка, карточку или обёртку холста. Принимает все HTML-атрибуты и `ref`. Меню открывают правый щелчок, долгое нажатие, а также клавиша контекстного меню или Shift+F10, когда фокус внутри области. У области нет роли, `aria-haspopup` и `aria-expanded`, потому что это не кнопка меню, а пока меню показано, у неё есть `data-open`. Она ставит `-webkit-touch-callout: none`, поэтому iOS не показывает выноску при долгом нажатии.

### `MenuContent`

Рендерит `<div popover="auto" role="menu" tabindex="-1">` в верхнем слое, а перед ним — пустой `<span aria-hidden>`, который отмечает точку открытия меню. В `ContextMenu` у него нет `aria-labelledby`, потому что нет кнопки, которая дала бы ему имя: передайте `aria-label` или `aria-labelledby` сами. Пока меню закрыто, элемент остаётся отрендеренным.

### `MenuItem`

Рендерит `<button type="button" role="menuitem" tabindex="-1">`, как в `Menu`. `disabled` ставит `aria-disabled="true"`, и пункт остаётся фокусируемым.

## Необязательные части

### `MenuCheckboxItem`, `MenuRadioGroup` и `MenuRadioItem`

Пункты, которые отмечаются и снимаются, и группа, в которой отмечен один пункт, — как в [Menu](../menu/anatomy.md#menucheckboxitem).

### `MenuGroup` и `MenuItemIndicator`

Подписанная группа `role="group"` вокруг связанных пунктов и галочка пункта-флажка или радиопункта — как в `Menu`.

### `MenuSubmenu` и `MenuSubmenuTrigger`

Вложенное меню: `MenuSubmenuTrigger` — его пункт, а `MenuContent`, который идёт за ним внутри того же `MenuSubmenu`, открывается рядом с этим пунктом — как в `Menu`.

### `Separator`

Компонент [Separator](../separator/) — линия с `role="separator"` между группами пунктов.

## Порядок композиции

1. `ContextMenu`
2. `ContextMenuTrigger` с содержимым области внутри
3. `MenuContent` после области
4. Пункты, группы, разделители и `MenuSubmenu` в том порядке, в котором они показаны

## Корректные варианты композиции

Каждая строка списка — свой `ContextMenu`, а областью служит `<div>` внутри `<li>`: `MenuContent` рендерится там, где вы его поставили, а в `<ul>` могут лежать только `<li>`. Те же действия лежат в `Menu` за кнопкой «⋯» в строке, поэтому их находят и те, кто никогда не нажимает правую кнопку.

<!-- example: context-menu/file-list.tsx -->
```tsx
import { useState, type CSSProperties, type ReactNode } from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
  Icon,
  IconButton,
  Menu,
  MenuContent,
  MenuItem,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';
import {
  ChevronRightIcon,
  CopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  LinkIcon,
  MailIcon,
  PencilIcon,
  PresentationIcon,
  Share2Icon,
  Trash2Icon,
} from '@vega-ui/icons';

const files = [
  { id: 'report', name: 'Q3 report.pdf', meta: 'Edited 2 hours ago', icon: <FileTextIcon /> },
  { id: 'budget', name: 'Budget 2027.xlsx', meta: 'Edited yesterday', icon: <FileSpreadsheetIcon /> },
  { id: 'deck', name: 'Kickoff deck.key', meta: 'Edited 12 Nov', icon: <PresentationIcon /> },
];

const muted: CSSProperties = { color: 'var(--label-secondary)' };

function Lead({ children }: { children: ReactNode }) {
  return <Icon size='sm' style={muted}>{children}</Icon>;
}

function FileActions({ onAction }: { onAction: (status: string) => void }) {
  return (
    <>
      <MenuItem onClick={() => onAction('Opened in a new tab')}><Lead><ExternalLinkIcon /></Lead>Open</MenuItem>
      <MenuItem onClick={() => onAction('Renamed just now')}><Lead><PencilIcon /></Lead>Rename</MenuItem>
      <MenuItem onClick={() => onAction('Copy saved')}><Lead><CopyIcon /></Lead>Duplicate</MenuItem>
      <MenuSubmenu>
        <MenuSubmenuTrigger>
          <Lead><Share2Icon /></Lead>
          Share
          <Icon size='xs' style={{ ...muted, marginInlineStart: 'auto' }}><ChevronRightIcon /></Icon>
        </MenuSubmenuTrigger>
        <MenuContent>
          <MenuItem onClick={() => onAction('Link copied')}><Lead><LinkIcon /></Lead>Copy link</MenuItem>
          <MenuItem onClick={() => onAction('Sent by email')}><Lead><MailIcon /></Lead>Email</MenuItem>
        </MenuContent>
      </MenuSubmenu>
      <Separator />
      <MenuItem style={{ color: 'var(--color-error)' }} onClick={() => onAction('Moved to trash')}>
        <Icon size='sm'><Trash2Icon /></Icon>Delete
      </MenuItem>
    </>
  );
}

export default function FileList() {
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  return (
    <ul style={{ display: 'grid', gap: 'var(--spacing-1)', boxSizing: 'border-box', width: '100%', maxWidth: 440, margin: 0, padding: 0, listStyle: 'none' }}>
      {files.map((file) => {
        const report = (status: string) => setStatuses((current) => ({ ...current, [file.id]: status }));

        return (
          <li key={file.id}>
            <ContextMenu size='sm'>
              <ContextMenuTrigger
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-6)',
                  padding: 'var(--spacing-4) var(--spacing-4) var(--spacing-4) var(--spacing-8)',
                  borderRadius: 'var(--radius-4)',
                  background: 'var(--surface-primary)',
                  border: '1px solid var(--separator-opaque)',
                }}
              >
                <Icon size='lg' style={muted}>{file.icon}</Icon>
                <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                  <Text size={3} fontWeight={500}>{file.name}</Text>
                  <Text size={2} role='status' style={{ ...muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {statuses[file.id] ?? file.meta}
                  </Text>
                </div>
                <Menu placement='bottom-end' size='sm'>
                  <MenuTrigger asChild>
                    <IconButton size='sm' aria-label={`Actions for ${file.name}`} variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
                      <Icon><EllipsisIcon /></Icon>
                    </IconButton>
                  </MenuTrigger>
                  <MenuContent>
                    <FileActions onAction={report} />
                  </MenuContent>
                </Menu>
              </ContextMenuTrigger>
              <MenuContent aria-label={file.name}>
                <FileActions onAction={report} />
              </MenuContent>
            </ContextMenu>
          </li>
        );
      })}
    </ul>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Пункты вне `MenuContent`

Пункт вне меню не входит в `role="menu"`, и меню не обрабатывает его щелчки и клавиши. Держите все пункты внутри `MenuContent`.

### `MenuTrigger` внутри `ContextMenu`

`MenuTrigger` — кнопка `Menu`. `ContextMenu` открывается из своей области: используйте `ContextMenuTrigger`, а `Menu` со своим `MenuTrigger` оставьте как видимый путь к тем же действиям.

### `MenuContent` без имени

Без `aria-label` или `aria-labelledby` у меню нет имени: скринридер объявит просто «меню». Называйте его по объекту, с которым оно работает, например по имени файла.

### Контролы прямо в меню

В `role="menu"` лежат пункты, группы и разделители. Текстовое поле или кнопка, которая не является пунктом, стрелками недоступны; интерактивное содержимое выносите в [Popover](../popover/).
