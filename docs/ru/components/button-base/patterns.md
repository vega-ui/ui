# ButtonBase: паттерны

## Общий примитив действия

Когда использовать:
Создайте продуктовую обёртку для действия, которая всё равно наследует стили кнопок VegaUI.

Заметки по композиции:
Оберните `ButtonBase` в локальный компонент и задавайте `variant`, `appearance` и `type` явно.

Компромиссы:
Вы получаете гибкость, но берёте на себя ответственность за доступное имя, раскладку и корректность семантики.

<!-- example: button-base/shared-action-primitive.tsx -->
```tsx
import { ButtonBase, type ButtonBaseProps, Icon } from '@vega-ui/react';
import { BoldIcon, ItalicIcon, UnderlineIcon } from '@vega-ui/icons';
import { useState } from 'react';

function ToolbarAction({ style, ...props }: ButtonBaseProps) {
  return (
    <ButtonBase
      type='button'
      variant='secondary'
      appearance='transparent'
      style={{ display: 'flex', padding: 'var(--spacing-3)', borderRadius: 'var(--radius-2)', ...style }}
      {...props}
    />
  );
}

export default function SharedActionPrimitive() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
        overflow: 'hidden',
      }}
    >
      <div
        role='toolbar'
        aria-label='Text formatting'
        style={{
          display: 'flex',
          gap: 'var(--spacing-2)',
          padding: 'var(--spacing-3)',
          borderBlockEnd: '1px solid var(--separator-opaque)',
        }}
      >
        <ToolbarAction aria-label='Bold' aria-pressed={bold} appearance={bold ? 'ghost' : 'transparent'} onClick={() => setBold(!bold)}>
          <Icon size='sm'><BoldIcon /></Icon>
        </ToolbarAction>
        <ToolbarAction aria-label='Italic' aria-pressed={italic} appearance={italic ? 'ghost' : 'transparent'} onClick={() => setItalic(!italic)}>
          <Icon size='sm'><ItalicIcon /></Icon>
        </ToolbarAction>
        <ToolbarAction aria-label='Underline' aria-pressed={underline} appearance={underline ? 'ghost' : 'transparent'} onClick={() => setUnderline(!underline)}>
          <Icon size='sm'><UnderlineIcon /></Icon>
        </ToolbarAction>
      </div>
      <p
        style={{
          margin: 0,
          padding: 'var(--spacing-8)',
          fontWeight: bold ? 700 : 400,
          fontStyle: italic ? 'italic' : 'normal',
          textDecoration: underline ? 'underline' : 'none',
        }}
      >
        Release notes for version 2.4
      </p>
    </div>
  );
}
```
<!-- /example -->

## Полиморфное навигационное действие

Когда использовать:
Нужно отрендерить цель навигации, которая визуально выглядит как кнопка.

Заметки по композиции:
Используйте `asChild` ровно с одной дочерней ссылкой или ссылкой роутера.

Компромиссы:
Результат сохраняет семантику ссылки, поэтому поведение клавиатуры и объявления скринридера отличаются от нативной кнопки.

<!-- example: button-base/polymorphic-navigation-action.tsx -->
```tsx
import { ButtonBase, Icon } from '@vega-ui/react';
import { UsersIcon } from '@vega-ui/icons';

export default function PolymorphicNavigationAction() {
  return (
    <ButtonBase asChild variant='secondary' appearance='ghost'>
      <a
        href='/settings/members'
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--spacing-4)',
          padding: 'var(--spacing-3) var(--spacing-8)',
          borderRadius: 'var(--radius-3)',
          fontSize: 'var(--font-size-2)',
        }}
      >
        <Icon size='sm'><UsersIcon /></Icon>
        Manage members
      </a>
    </ButtonBase>
  );
}
```
<!-- /example -->
