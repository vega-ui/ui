# Button: паттерны

## Основное действие формы

Когда использовать:

- Форме нужно одно ясное основное действие.

Заметки по композиции:

- Делайте основное действие визуально сильнее соседних второстепенных.
- Используйте `type='submit'` осознанно.

Компромиссы:

- Действие выглядит однозначно.
- Интерфейс становится визуально шумным, если слишком много кнопок соревнуются за внимание.

<!-- example: button/form-footer-actions.tsx -->
```tsx
import { Button, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useState } from 'react';

export default function FormFooterActions() {
  const [submitted, setSubmitted] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(`${data.get('workspace')} (${data.get('slug')})`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() => setSubmitted('')}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', width: '100%' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='workspace-name'>Workspace name</Label>
          <TextField>
            <TextFieldInput id='workspace-name' name='workspace' defaultValue='Acme Design' required />
          </TextField>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='workspace-slug'>URL slug</Label>
          <TextField>
            <TextFieldInput id='workspace-slug' name='slug' defaultValue='acme-design' pattern='[a-z0-9-]+' required />
          </TextField>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
          <Button type='submit'>Save workspace</Button>
        </div>
        <output style={{ color: 'var(--label-secondary)', textAlign: 'end', overflowWrap: 'anywhere' }}>
          {submitted === '' ? 'Not saved yet' : `Saved: ${submitted}`}
        </output>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Пара с второстепенным действием

Когда использовать:

- Локальному сценарию нужны основное и второстепенное действия рядом.

Заметки по композиции:

- Для отмены или возврата используйте менее акцентное оформление.
- Тексты кнопок должны дополнять друг друга, а не путать.

Компромиссы:

- Легко считывается.
- Сбивает с толку, если обе кнопки одинаково акцентны.

<!-- example: button/action-hierarchy.tsx -->
```tsx
import { Button } from '@vega-ui/react';

export default function ActionHierarchy() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: '100%' }}>
      <Button type='button' fullWidth>Publish article</Button>
      <Button type='button' fullWidth variant='secondary' appearance='ghost'>Save draft</Button>
      <Button type='button' fullWidth variant='secondary' appearance='ghost'>Preview</Button>
      <Button type='button' fullWidth variant='secondary' appearance='transparent'>Discard</Button>
    </div>
  );
}
```
<!-- /example -->

## Навигация с видом кнопки

Когда использовать:

- Навигация должна выглядеть как кнопка, но семантически оставаться навигацией.

Заметки по композиции:

- Используйте `asChild` с настоящей ссылкой.
- Сохраняйте семантику ссылки, если взаимодействие действительно ведёт на другую страницу.

Компромиссы:

- Сильный визуальный акцент для навигации.
- Легко злоупотребить там, где обычная ссылка была бы понятнее.

<!-- example: button/navigation-with-button-visuals.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { ArrowRightIcon, ExternalLinkIcon } from '@vega-ui/icons';
import './examples.css';

export default function NavigationWithButtonVisuals() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
      <Button asChild>
        <a href='/onboarding/import'>
          Import contacts
          <Icon size='sm' className='directionalIcon'><ArrowRightIcon /></Icon>
        </a>
      </Button>
      <Button asChild variant='secondary' appearance='ghost'>
        <a href='https://status.example.com' target='_blank' rel='noreferrer'>
          Status page
          <Icon size='sm'><ExternalLinkIcon /></Icon>
        </a>
      </Button>
    </div>
  );
}
```
<!-- /example -->
