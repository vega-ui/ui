# Menu: паттерны

## Действия строки или карточки

Когда использовать:

- У строки списка, карточки или строки таблицы больше действий, чем помещается рядом, например переименовать, дублировать и удалить.

Заметки о композиции:

- Сделайте триггером `IconButton` с иконкой «⋯» и дайте ему `aria-label`, который называет объект, например «Actions for Q3 report.pdf»; эта подпись даёт имя и меню.
- Ставьте `placement='bottom-end'`, чтобы меню выравнивалось по концу строки.
- Разрушительное действие ставьте последним, после `Separator`.

Компромиссы:

- Строки выглядят спокойнее, но действия скрыты: самое частое оставьте видимой кнопкой рядом с триггером.

<!-- example: menu/row-actions.tsx -->
```tsx
import { useState } from 'react';
import { Icon, IconButton, Menu, MenuContent, MenuItem, MenuTrigger, Separator, Text } from '@vega-ui/react';
import { EllipsisIcon } from '@vega-ui/icons';

export default function RowActions() {
  const [status, setStatus] = useState('Edited 2 hours ago');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 420,
        padding: 'var(--spacing-6) var(--spacing-6) var(--spacing-6) var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={3} fontWeight={500}>Q3 report.pdf</Text>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{status}</Text>
      </div>
      <Menu placement='bottom-end' size='sm'>
        <MenuTrigger asChild>
          <IconButton size='sm' aria-label='Actions for Q3 report.pdf' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>
            <Icon><EllipsisIcon /></Icon>
          </IconButton>
        </MenuTrigger>
        <MenuContent>
          <MenuItem onClick={() => setStatus('Renamed just now')}>Rename</MenuItem>
          <MenuItem onClick={() => setStatus('Copy saved as Q3 report (1).pdf')}>Duplicate</MenuItem>
          <MenuItem onClick={() => setStatus('Download started')}>Download</MenuItem>
          <Separator />
          <MenuItem style={{ color: 'var(--color-error)' }} onClick={() => setStatus('Moved to trash')}>Move to trash</MenuItem>
        </MenuContent>
      </Menu>
    </div>
  );
}
```
<!-- /example -->

## Настройки вида

Когда использовать:

- Панель инструментов предлагает настройки текущего вида, например что показывать и как сортировать, и они применяются сразу.

Заметки о композиции:

- Для независимых переключателей используйте `MenuCheckboxItem`, для выбора одного из нескольких — `MenuRadioGroup`, в каждом пункте — `MenuItemIndicator`.
- Подпишите группу радиопунктов заголовком внутри неё через `aria-labelledby`.
- Показывайте текущие настройки вне меню, чтобы их было видно без открытия.

Компромиссы:

- Компактно и быстро, когда меняют одну настройку; для многих взаимосвязанных настроек понятнее [Popover](../popover/) с формой.

<!-- example: menu/view-options.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';

const sorts = [
  { value: 'due', label: 'Due date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
];

const groupHeading: CSSProperties = {
  display: 'block',
  paddingInline: 'var(--spacing-8)',
  paddingBlock: 'var(--spacing-2)',
  color: 'var(--label-secondary)',
};

export default function ViewOptions() {
  const sortHeadingId = useId();
  const [showCompleted, setShowCompleted] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [sort, setSort] = useState('due');
  const sortLabel = sorts.find((item) => item.value === sort)?.label ?? '';

  const hidden: string[] = [];
  if (!showCompleted) hidden.push('completed');
  if (!showSubtasks) hidden.push('subtasks');

  const sorted = `Sorted by ${sortLabel.toLowerCase()}`;
  const summary = hidden.length === 0 ? sorted : `${sorted} · ${hidden.join(' and ')} hidden`;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)', width: '100%', maxWidth: 480 }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{summary}</Text>
      <Menu placement='bottom-end'>
        <MenuTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>View</Button>
        </MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem checked={showCompleted} onChangeChecked={setShowCompleted}>
            <MenuItemIndicator />
            Show completed
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showSubtasks} onChangeChecked={setShowSubtasks}>
            <MenuItemIndicator />
            Show subtasks
          </MenuCheckboxItem>
          <Separator />
          <MenuRadioGroup aria-labelledby={sortHeadingId} value={sort} onChangeValue={setSort}>
            <Text id={sortHeadingId} size={2} fontWeight={500} style={groupHeading}>Sort by</Text>
            {sorts.map((item) => (
              <MenuRadioItem key={item.value} value={item.value}>
                <MenuItemIndicator />
                {item.label}
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
    </div>
  );
}
```
<!-- /example -->

## Меню аккаунта

Когда использовать:

- В шапке показан вошедший пользователь, а от него открываются несколько страниц аккаунта и выход.

Заметки о композиции:

- Страницы рендерите ссылками через `MenuItem asChild` вокруг `<a href>`, чтобы их, как любую ссылку, можно было открыть в новой вкладке с клавишей-модификатором.
- Выход оставьте обычным пунктом после `Separator`.

Компромиссы:

- Привычно и компактно, но страницы, куда ходят часто, должны быть в основной навигации, а не за меню.

<!-- example: menu/account-menu.tsx -->
```tsx
import { useState } from 'react';
import { Button, Menu, MenuContent, MenuItem, MenuTrigger, Separator, Text } from '@vega-ui/react';

export default function AccountMenu() {
  const [signedOut, setSignedOut] = useState(false);

  if (signedOut) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>You are signed out.</Text>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setSignedOut(false)}>Sign in</Button>
      </div>
    );
  }

  return (
    <Menu placement='bottom-end'>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Maria Chen</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem asChild><a href='#profile'>Profile</a></MenuItem>
        <MenuItem asChild><a href='#billing'>Billing</a></MenuItem>
        <MenuItem asChild><a href='#shortcuts'>Keyboard shortcuts</a></MenuItem>
        <Separator />
        <MenuItem onClick={() => setSignedOut(true)}>Sign out</MenuItem>
      </MenuContent>
    </Menu>
  );
}
```
<!-- /example -->

## Меню создания с группами

Когда использовать:

- Кнопка «Создать» или «Новый» предлагает несколько видов объектов, которые делятся на пару групп.

Заметки о композиции:

- Оберните каждую группу в `MenuGroup` с текстовым заголовком внутри и подпишите её через `aria-labelledby`.
- Разделите группы `Separator`.

Компромиссы:

- Выдерживает около десятка пунктов; дальше диалог со списком и поиском просматривать проще, чем длинное меню.

<!-- example: menu/create-menu-groups.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import { Button, Menu, MenuContent, MenuGroup, MenuItem, MenuTrigger, Separator, Text } from '@vega-ui/react';

const groupHeading: CSSProperties = {
  display: 'block',
  paddingInline: 'var(--spacing-8)',
  paddingBlock: 'var(--spacing-2)',
  color: 'var(--label-secondary)',
};

export default function CreateMenuGroups() {
  const documentsId = useId();
  const workspaceId = useId();

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm'>Create</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuGroup aria-labelledby={documentsId}>
          <Text id={documentsId} size={2} fontWeight={500} style={groupHeading}>Documents</Text>
          <MenuItem>Document</MenuItem>
          <MenuItem>Spreadsheet</MenuItem>
          <MenuItem>Presentation</MenuItem>
        </MenuGroup>
        <Separator />
        <MenuGroup aria-labelledby={workspaceId}>
          <Text id={workspaceId} size={2} fontWeight={500} style={groupHeading}>Workspace</Text>
          <MenuItem>Project</MenuItem>
          <MenuItem>Team</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
```
<!-- /example -->
