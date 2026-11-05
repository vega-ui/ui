# VisuallyHidden: паттерны

## Подпись элемента управления с одной иконкой

Когда использовать:

- элемент управления визуально состоит только из иконки, но ему всё равно нужно доступное имя

Заметки о композиции:

- делайте скрытую подпись краткой
- предпочитайте одну ясную скрытую фразу

Компромиссы:

- сохраняет компактный внешний вид
- видимая ясность по-прежнему зависит от узнаваемости иконки

<!-- example: visually-hidden/icon-only-control-label.tsx -->
```tsx
import { Icon, IconButton, VisuallyHidden } from '@vega-ui/react';
import { BellIcon } from '@vega-ui/icons';
import { useState } from 'react';

export default function IconOnlyControlLabel() {
  const [unread, setUnread] = useState(4);

  return (
    <IconButton type='button' variant='secondary' appearance='ghost' onClick={() => setUnread(0)} style={{ position: 'relative' }}>
      <Icon><BellIcon /></Icon>
      <VisuallyHidden asChild>
        <span>Notifications, {unread} unread</span>
      </VisuallyHidden>
      {unread > 0 && (
        <span
          aria-hidden='true'
          style={{
            position: 'absolute',
            insetBlockStart: 'var(--spacing-1)',
            insetInlineEnd: 'var(--spacing-1)',
            minWidth: 'var(--spacing-8)',
            paddingInline: 'var(--spacing-2)',
            boxSizing: 'border-box',
            borderRadius: 999,
            background: 'var(--color-error)',
            color: 'var(--color-white)',
            fontSize: 'var(--font-size-1)',
            lineHeight: 'var(--spacing-8)',
            textAlign: 'center',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {unread}
        </span>
      )}
    </IconButton>
  );
}
```
<!-- /example -->

## Скрытое ARIA-описание

Когда использовать:

- полю нужен дополнительный контекст только для вспомогательных технологий

Заметки о композиции:

- задайте скрытому узлу id
- сошлитесь на него из элемента управления через `aria-describedby`

Компромиссы:

- гибко и переиспользуемо
- легко забыть обновить скрытый текст

<!-- example: visually-hidden/hidden-helper-description.tsx -->
```tsx
import { Button, Label, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { FormEvent, useState } from 'react';

export default function HiddenHelperDescription() {
  const [budget, setBudget] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBudget(String(new FormData(event.currentTarget).get('budget')));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='monthly-budget'>Monthly budget</Label>
      <TextField style={{ paddingInlineStart: 'var(--spacing-8)', gap: 'var(--spacing-2)' }}>
        <span aria-hidden='true' style={{ color: 'var(--label-secondary)' }}>$</span>
        <TextFieldInput
          id='monthly-budget'
          name='budget'
          type='number'
          min={0}
          step={50}
          defaultValue={500}
          aria-describedby='monthly-budget-currency'
          required
          style={{ paddingInlineStart: 0, fontVariantNumeric: 'tabular-nums' }}
        />
      </TextField>
      <VisuallyHidden asChild>
        <span id='monthly-budget-currency'>Amount in US dollars</span>
      </VisuallyHidden>
      <Button type='submit' style={{ alignSelf: 'flex-start', marginBlockStart: 'var(--spacing-9)' }}>Save budget</Button>
      <output style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {budget === '' ? '' : `Budget set to $${budget}`}
      </output>
    </form>
  );
}
```
<!-- /example -->

## Скрытый текст статуса

Когда использовать:

- визуальному индикатору загрузки или статуса нужен текст только для вспомогательных технологий

Заметки о композиции:

- держите текст синхронизированным с реальным состоянием
- не дублируйте вводящие в заблуждение устаревшие сообщения

Компромиссы:

- улучшает ясность для невизуального восприятия
- состояние легко рассинхронизировать, если логика родителя небрежна

<!-- example: visually-hidden/hidden-status-text.tsx -->
```tsx
import { Button, Icon, VisuallyHidden } from '@vega-ui/react';
import { ShoppingCartIcon } from '@vega-ui/icons';
import { useState } from 'react';

const products = ['Linen shirt', 'Canvas tote', 'Wool socks'];

export default function HiddenStatusText() {
  const [cart, setCart] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState('');

  const add = (product: string) => {
    const next = [...cart, product];
    setCart(next);
    setAnnouncement(`${product} added. Cart has ${next.length} items.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        {products.map((product) => (
          <Button key={product} type='button' size='sm' variant='secondary' appearance='ghost' onClick={() => add(product)}>
            Add {product}
          </Button>
        ))}
      </div>
      <span aria-hidden='true' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', fontVariantNumeric: 'tabular-nums' }}>
        <Icon size='sm'><ShoppingCartIcon /></Icon>
        {cart.length}
      </span>
      <VisuallyHidden asChild>
        <p role='status'>{announcement}</p>
      </VisuallyHidden>
    </div>
  );
}
```
<!-- /example -->
