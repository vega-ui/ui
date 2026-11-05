# Option: паттерны

## Богатая строка селектора

Когда использовать:

- варианту нужны иконки или дополнительный визуальный контекст

Заметки о композиции:

- оставьте строку одной поверхностью выбора

Компромиссы:

- легко просматривается и выразительна
- сложнее, чем строки с простым текстом

<!-- example: option/rich-option-content.tsx -->
```tsx
import { Icon, Option, Text } from '@vega-ui/react';
import { CopyIcon, LinkIcon, MailIcon, Share2Icon } from '@vega-ui/icons';

const actions = [
  { value: 'link', label: 'Copy link', hint: 'Anyone with the link can view', icon: LinkIcon },
  { value: 'email', label: 'Send by email', hint: 'Up to 20 recipients', icon: MailIcon },
  { value: 'duplicate', label: 'Duplicate', hint: 'Creates a private copy', icon: CopyIcon },
  { value: 'export', label: 'Export to Drive', hint: 'PDF or DOCX', icon: Share2Icon },
];

export default function RichOptionContent() {
  return (
    <div
      role='listbox'
      aria-label='Share options'
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-3)',
        padding: 'var(--spacing-4)',
        width: '100%',
        maxWidth: 300,
        boxSizing: 'border-box',
        borderRadius: 'var(--spacing-8)',
        background: 'var(--surface-secondary)',
        border: '1px solid var(--separator-opaque)',
        boxShadow: 'var(--surface-shadow)',
      }}
    >
      {actions.map((action) => (
        <Option
          key={action.value}
          selected={action.value === 'link'}
          style={{ height: 'auto', paddingBlock: 'var(--spacing-5)', gap: 'var(--spacing-8)' }}
        >
          <Icon size='sm'>
            <action.icon />
          </Icon>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <Text size={3}>{action.label}</Text>
            <Text size={2} style={{ opacity: 0.75 }}>{action.hint}</Text>
          </span>
        </Option>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Выбор под управлением родителя

Когда использовать:

- состояние списка живёт в собственном родительском контроле

Заметки о композиции:

- вычисляйте `selected` и обработчики клика из родительского состояния
- держите поведение клавиатуры на списке: он держит фокус и указывает на активную строку через `aria-activedescendant`

Компромиссы:

- гибко
- нужна настоящая родительская модель выбора

<!-- example: option/selected-state-from-parent.tsx -->
```tsx
import { Option, Text } from '@vega-ui/react';
import { KeyboardEvent, useId, useState } from 'react';

const statuses = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'progress', label: 'In progress' },
  { value: 'review', label: 'In review' },
  { value: 'done', label: 'Done' },
];

export default function SelectedStateFromParent() {
  const id = useId();
  const [selected, setSelected] = useState('review');
  const [active, setActive] = useState<string | null>(null);
  const current = statuses.find((status) => status.value === selected);

  const moveActive = (step: number) => {
    const index = statuses.findIndex((status) => status.value === active);
    const next = Math.min(Math.max(index + step, 0), statuses.length - 1);
    setActive(statuses[next].value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveActive(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveActive(-1);
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (active === null) return;

    event.preventDefault();
    setSelected(active);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%', maxWidth: 260 }}>
      <div
        role='listbox'
        tabIndex={0}
        aria-label='Issue status'
        aria-activedescendant={active === null ? undefined : `${id}-${active}`}
        onKeyDown={onKeyDown}
        onFocus={() => setActive(selected)}
        onBlur={() => setActive(null)}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}
      >
        {statuses.map((status) => (
          <Option
            key={status.value}
            id={`${id}-${status.value}`}
            selected={status.value === selected}
            active={status.value === active}
            onClick={() => setSelected(status.value)}
          >
            {status.label}
          </Option>
        ))}
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Status: {current?.label}</Text>
    </div>
  );
}
```
<!-- /example -->

## Отключение по бизнес-правилу

Когда использовать:

- вариант виден, но недоступен

Заметки о композиции:

- показывайте причину в самой строке и связывайте её через `aria-describedby`
- оставьте строку неинтерактивной

Компромиссы:

- вариант остаётся обнаруживаемым
- недоступным вариантам всё равно нужен поясняющий контекст

<!-- example: option/unavailable-plan-hint.tsx -->
```tsx
import { Option } from '@vega-ui/react';
import { useId } from 'react';

const plans = [
  { value: 'starter', label: 'Starter', reason: '' },
  { value: 'team', label: 'Team', reason: '' },
  { value: 'legacy', label: 'Legacy Pro', reason: 'No longer available for new workspaces' },
  { value: 'enterprise', label: 'Enterprise', reason: 'Requires a sales contract' },
];

export default function UnavailablePlanHint() {
  const id = useId();

  return (
    <div role='listbox' aria-label='Plan' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}>
      {plans.map((plan) => (
        <Option
          key={plan.value}
          selected={plan.value === 'team'}
          disabled={plan.reason !== ''}
          aria-describedby={plan.reason === '' ? undefined : `${id}-${plan.value}`}
          style={plan.reason === '' ? undefined : { height: 'auto', paddingBlock: 'var(--spacing-5)' }}
        >
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            {plan.label}
            {plan.reason !== '' && (
              <span id={`${id}-${plan.value}`} style={{ fontSize: 'var(--font-size-2)' }}>
                {plan.reason}
              </span>
            )}
          </span>
        </Option>
      ))}
    </div>
  );
}
```
<!-- /example -->
