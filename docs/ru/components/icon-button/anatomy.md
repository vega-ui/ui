# IconButton: анатомия

## Обзор

`IconButton` — одиночная поверхность действия только с иконкой, построенная на `ButtonBase`. Её анатомия — один интерактивный корень и иконка без видимой текстовой подписи.

## Обязательные части

### `IconButton`

Обязательная часть. Отвечает за размер и визуальные пропсы базовой кнопки, такие как вариант и оформление.

## Необязательные части

`IconButton` не предоставляет публичных дочерних частей, но обычно его комбинируют с `Icon`.

## Порядок композиции

1. `IconButton`
2. содержимое-иконка

## Допустимые варианты композиции

<!-- example: icon-button/basic-usage.tsx -->
```tsx
import { Icon, IconButton, Text } from '@vega-ui/react';
import { EllipsisIcon, PencilIcon, Share2Icon } from '@vega-ui/icons';
import { useState } from 'react';

export default function BasicUsage() {
  const [lastAction, setLastAction] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', width: '100%' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Text size={4} fontWeight={600} style={{ flex: 1, minWidth: 0 }}>Brand guidelines</Text>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='Rename document' onClick={() => setLastAction('Rename')}>
          <Icon><PencilIcon /></Icon>
        </IconButton>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='Share document' onClick={() => setLastAction('Share')}>
          <Icon><Share2Icon /></Icon>
        </IconButton>
        <IconButton type='button' size='sm' variant='secondary' appearance='transparent' aria-label='More actions' onClick={() => setLastAction('More')}>
          <Icon><EllipsisIcon /></Icon>
        </IconButton>
      </header>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        {lastAction === '' ? 'Updated 2 hours ago' : `Clicked: ${lastAction}`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Кнопка только с иконкой без доступной подписи

Действие становится непонятным для вспомогательных технологий, а часто и для зрячих пользователей.

### Длинный текст внутри `IconButton`

Если действию нужны видимые слова, используйте `Button`.
