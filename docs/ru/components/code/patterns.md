# Code: паттерны

## Встроенная команда в инструкции

Когда использовать:

- документация или текст подсказки упоминает короткую команду

Заметки о композиции:

- оборачивайте в `Code` только саму команду
- окружающий текст инструкции оставляйте в `Text`

Компромиссы:

- легко найти взглядом
- не подходит для многострочных примеров

<!-- example: code/inline-command-in-instructional-copy.tsx -->
```tsx
import { Code, Text } from '@vega-ui/react';

export default function InlineCommandInInstructionalCopy() {
  return (
    <Text asChild size={3}>
      <p style={{ maxWidth: '60ch' }}>
        If the dev server fails to start, delete <Code>node_modules</Code>, run <Code>pnpm install</Code> and try
        again.
      </p>
    </Text>
  );
}
```
<!-- /example -->

## Встроенный идентификатор

Когда использовать:

- имя поля, переменная окружения или токен требуют выделения

Заметки о композиции:

- делайте идентификатор коротким
- не оборачивайте в `Code` целые поясняющие предложения

Компромиссы:

- проясняет машиночитаемые имена
- при чрезмерном использовании создаёт визуальный шум

<!-- example: code/inline-identifier.tsx -->
```tsx
import { Code, Text } from '@vega-ui/react';

const variables = [
  { name: 'DATABASE_URL', description: 'Postgres connection string for the primary database.' },
  { name: 'SENTRY_DSN', description: 'Error reporting endpoint. Leave empty to disable reporting.' },
  { name: 'VEGA_THEME', description: 'Forces the initial theme: light or dark.' },
];

export default function InlineIdentifier() {
  return (
    <dl style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', margin: 0 }}>
      {variables.map((variable) => (
        <div key={variable.name} style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <dt><Code size={2}>{variable.name}</Code></dt>
          <Text asChild size={2} style={{ color: 'var(--label-secondary)' }}>
            <dd style={{ margin: 0 }}>{variable.description}</dd>
          </Text>
        </div>
      ))}
    </dl>
  );
}
```
<!-- /example -->

## Текст вперемешку с кодом

Когда использовать:

- основной текст содержит один-два технических фрагмента

Заметки о композиции:

- абзац оставьте `Text`
- используйте `Code` только для фрагментов с семантикой кода

Компромиссы:

- сохраняет читаемость
- длинные технические отрывки лучше вынести в блочный пример

<!-- example: code/mixed-prose-and-code.tsx -->
```tsx
import { Code, Text } from '@vega-ui/react';

export default function MixedProseAndCode() {
  return (
    <Text asChild size={3}>
      <p style={{ maxWidth: '60ch' }}>
        The form sends the selected plan as <Code>plan_id</Code>. Read it on the server with{' '}
        <Code>formData.get('plan_id')</Code>; an empty value means the user kept the free tier.
      </p>
    </Text>
  );
}
```
<!-- /example -->
