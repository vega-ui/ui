# CheckboxCard: паттерны

## Плитка выбора тарифа

Когда использовать:
Показать возможности тарифа или варианты пакета, где кликабельной должна быть вся карточка.

Заметки по композиции:
Держите заголовок и описание в `CheckboxCardContent`, а контрол рендерите у противоположного края.

Компромиссы:
Паттерн выразительный, но занимает больше места, чем обычная строка с чекбоксом.

<!-- example: checkbox-card/plan-option-tile.tsx -->
```tsx
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
  Fieldset,
  FieldsetLegend,
} from '@vega-ui/react';

const addons = [
  { value: 'priority-support', title: 'Priority support', description: 'Replies within 1 business hour, 24/7 incident line.' },
  { value: 'audit-log', title: 'Audit log', description: 'Keep a 365-day history of every change in the workspace.' },
  { value: 'sso', title: 'Single sign-on', description: 'SAML and OIDC login through Okta, Entra ID or Google.' },
];

export default function PlanOptionTile() {
  return (
    <Fieldset style={{ width: '100%' }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Add-ons</FieldsetLegend>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
        {addons.map((addon) => (
          <CheckboxCard key={addon.value}>
            <CheckboxCardContent>
              <CheckboxCardTitle>{addon.title}</CheckboxCardTitle>
              <CheckboxCardDescription>{addon.description}</CheckboxCardDescription>
            </CheckboxCardContent>
            <CheckboxCardControl>
              <CheckboxCardControlInput name='addons' value={addon.value} defaultChecked={addon.value === 'audit-log'} />
              <CheckboxIndicator>
                <CheckboxCardControlCheckedIcon />
                <CheckboxCardControlIndeterminateIcon />
              </CheckboxIndicator>
            </CheckboxCardControl>
          </CheckboxCard>
        ))}
      </div>
    </Fieldset>
  );
}
```
<!-- /example -->

## Плитка настройки с участием в нативной форме

Когда использовать:
Приложению нужен богатый UI плитки, но отправка по-прежнему идёт через нативную форму.

Заметки по композиции:
Передайте всем `CheckboxCardControlInput` общий `name` и собственный `value`, а выбор читайте через `FormData.getAll`.

Компромиссы:
Интеграция с формой упрощается, но раскладка и семантика всё равно должны сохранять читаемость всей карточки.

<!-- example: checkbox-card/form-data-submission.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
  Fieldset,
  FieldsetLegend,
  Text,
} from '@vega-ui/react';

const contents = [
  { value: 'projects', title: 'Projects', description: 'Boards, tasks and their history' },
  { value: 'files', title: 'Files', description: 'Attachments up to 2 GB each' },
  { value: 'members', title: 'Members', description: 'Names, roles and last activity' },
];

export default function FormDataSubmission() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const included = new FormData(event.currentTarget).getAll('include');
    setResult(`include=${included.join(',')}`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Export workspace data</FieldsetLegend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
          {contents.map((content) => (
            <CheckboxCard key={content.value} size='sm'>
              <CheckboxCardContent>
                <CheckboxCardTitle>{content.title}</CheckboxCardTitle>
                <CheckboxCardDescription>{content.description}</CheckboxCardDescription>
              </CheckboxCardContent>
              <CheckboxCardControl>
                <CheckboxCardControlInput name='include' value={content.value} defaultChecked />
                <CheckboxIndicator>
                  <CheckboxCardControlCheckedIcon />
                  <CheckboxCardControlIndeterminateIcon />
                </CheckboxIndicator>
              </CheckboxCardControl>
            </CheckboxCard>
          ))}
        </div>
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Start export</Button>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        </div>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>{result}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->
