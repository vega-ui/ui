# Code: примеры

## Базовый

### Базовый: команды в шагах установки

Каждый шаг — пункт списка, отрендеренный через `Text asChild`, и в `Code` обёрнута только сама команда. Окружающая фраза остаётся обычным читаемым текстом.

<!-- example: code/inline-command.tsx -->
```tsx
import { Code, Text } from '@vega-ui/react';

const steps = [
  { text: 'Install the package:', command: 'pnpm add @vega-ui/react' },
  { text: 'Import the styles once in your entry file:', command: 'import \'@vega-ui/react/style.css\'' },
  { text: 'Start the dev server:', command: 'pnpm dev' },
];

export default function InlineCommand() {
  return (
    <ol style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', margin: 0, paddingInlineStart: 'var(--spacing-10)' }}>
      {steps.map((step) => (
        <Text key={step.command} asChild size={3}>
          <li>
            {step.text} <Code>{step.command}</Code>
          </li>
        </Text>
      ))}
    </ol>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: копирование в буфер обмена

У кнопки копирования есть небольшое состояние: иконка меняется на галочку, сообщение с `role='status'` подтверждает копирование и через две секунды сбрасывается. Если вызов `navigator.clipboard` не удался, показывается запасная инструкция, а не тихая ошибка.

<!-- example: code/copy-command.tsx -->
```tsx
import { Code, Icon, IconButton, Text } from '@vega-ui/react';
import { Check, Copy } from '@vega-ui/icons';
import { useEffect, useState } from 'react';

const command = 'npx @vega-ui/cli init --template dashboard';

type CopyStatus = 'idle' | 'copied' | 'failed';

export default function CopyCommand() {
  const [status, setStatus] = useState<CopyStatus>('idle');

  useEffect(() => {
    if (status === 'idle') return;

    const timer = window.setTimeout(() => setStatus('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Code style={{ flex: 1, minWidth: 0, overflowX: 'auto', whiteSpace: 'nowrap', paddingBlock: 'var(--spacing-3)' }}>
          {command}
        </Code>
        <IconButton aria-label='Copy command' variant='secondary' appearance='ghost' onClick={copy}>
          <Icon>{status === 'copied' ? <Check /> : <Copy />}</Icon>
        </IconButton>
      </div>
      <Text size={2} role='status' style={{ minHeight: 'var(--line-height-2)', color: 'var(--label-secondary)' }}>
        {status === 'copied' && 'Copied to clipboard'}
        {status === 'failed' && 'Copy failed. Select the command and copy it manually.'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: вычисляемый идентификатор в подсказке

URL пространства вычисляется из названия по мере ввода и показывается в `Code` внутри `HelperText`, на который поле ссылается через `aria-describedby`. Слаг отправляется через скрытое поле и читается через `FormData`; пустой слаг отключает отправку.

<!-- example: code/inline-identifier-in-helper-copy.tsx -->
```tsx
import { Button, Code, HelperText, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useState, type FormEvent } from 'react';

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function InlineIdentifierInHelperCopy() {
  const [name, setName] = useState('Acme Marketing');
  const [saved, setSaved] = useState('');
  const slug = toSlug(name);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Workspace created at ${data.get('slug')}.vega.app`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='workspace-name'>Workspace name</Label>
      <TextField>
        <TextFieldInput
          id='workspace-name'
          name='name'
          value={name}
          aria-describedby='workspace-url'
          onChange={(event) => setName(event.target.value)}
          required
        />
      </TextField>
      <HelperText id='workspace-url'>
        Your URL will be <Code size={2}>{slug === '' ? '…' : slug}.vega.app</Code>
      </HelperText>
      <input type='hidden' name='slug' value={slug} />
      <Button type='submit' disabled={slug === ''} style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-9)' }}>
        Create workspace
      </Button>
      {saved && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{saved}</Text>}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: команды в диалоге

Команды стоят внутри текста диалога. По умолчанию у `Code` размер 3, поэтому в примечании размера 2 он получает `size={2}`, чтобы совпадать с окружающим текстом.

<!-- example: code/command-in-a-dialog-body.tsx -->
```tsx
import {
  Button,
  Code,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import type { CSSProperties } from 'react';

export default function CommandInADialogBody() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Connect the CLI</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='connect-cli-title' style={{ display: 'grid', gap: 'var(--spacing-12)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading as='h2' size={5} id='connect-cli-title'>Connect the CLI</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <Text asChild size={3}>
            <p>
              Run <Code>vega login</Code>, then link this project with <Code>vega link --project web-app</Code>.
            </p>
          </Text>
          <Text asChild size={2} style={{ color: 'var(--label-secondary)' }}>
            <p>
              The token is stored in <Code size={2}>~/.vega/credentials</Code> and expires after 30 days.
            </p>
          </Text>
        </div>
        <DialogClose asChild>
          <Button style={{ justifySelf: 'end' }}>Done</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: невалидное имя переменной

Имя проверяется по шаблону при отправке. Невалидное имя превращает подсказку в ошибку, которая показывает ожидаемый формат в `Code`, и выставляет `aria-invalid`; ввод снимает ошибку.

<!-- example: code/invalid-token-name.tsx -->
```tsx
import { Button, Code, HelperText, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useState, type FormEvent } from 'react';

const namePattern = /^[A-Z_][A-Z0-9_]*$/;

export default function InvalidTokenName() {
  const [invalid, setInvalid] = useState(false);
  const [added, setAdded] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get('variable'));

    if (!namePattern.test(name)) {
      setInvalid(true);
      setAdded('');
      return;
    }

    setInvalid(false);
    setAdded(name);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='env-variable-name'>Variable name</Label>
      <TextField error={invalid}>
        <TextFieldInput
          id='env-variable-name'
          name='variable'
          defaultValue='api-key'
          autoComplete='off'
          spellCheck={false}
          aria-invalid={invalid}
          aria-describedby='env-variable-hint'
          onChange={() => setInvalid(false)}
        />
      </TextField>
      <HelperText id='env-variable-hint' error={invalid}>
        Use uppercase letters, digits and underscores, for example <Code size={2}>STRIPE_API_KEY</Code>.
      </HelperText>
      <Button type='submit' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-9)' }}>Add variable</Button>
      {added && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          <Code size={2}>{added}</Code> added to Production.
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: почему команда недоступна

Кнопка деплоя отключена, а причина — с веткой и командой в `Code` — связана с ней через `aria-describedby`.

<!-- example: code/unavailable-command-hint.tsx -->
```tsx
import { Button, Code, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function UnavailableCommandHint() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', justifyItems: 'start', width: '100%' }}>
      <Button disabled aria-describedby='deploy-blocked-reason'>Deploy to production</Button>
      <Text
        id='deploy-blocked-reason'
        size={2}
        style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}
      >
        Deploys are blocked until the <Code size={2}>main</Code> branch passes <Code size={2}>pnpm test</Code>.
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: длинные пути и хеши

`Code` — строчно-блочный элемент с `word-wrap: break-word`, поэтому длинный путь или хеш коммита переносится внутри плашки, а не вылезает за узкую колонку. Сначала вся плашка уходит на новую строку, поэтому в конце предыдущей строки остаётся пустое место.

<!-- example: code/long-inline-path.tsx -->
```tsx
import { Code, Text } from '@vega-ui/react';

export default function LongInlinePath() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text asChild size={2}>
        <p>
          Edit <Code size={2} style={{ overflowWrap: 'anywhere' }}>packages/ui/src/DataGrid/components/DataGridColumnHeader/DataGridColumnHeader.tsx</Code>{' '}
          to change the sort icon.
        </p>
      </Text>
      <Text asChild size={2}>
        <p>
          Deployed commit <Code size={2} style={{ overflowWrap: 'anywhere' }}>9f3c2a7e4b1d08c6f5a2e9d7b3c1f0a8e6d4b2c9</Code>
        </p>
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: многострочный фрагмент

`Code` наследует от `Text` `white-space: pre-line`, который схлопывает отступы. Для фрагмента кода оберните его в `<pre>`, задайте `Code` `whiteSpace: 'pre'` и `display: 'block'`, а горизонтальную прокрутку оставьте `<pre>`.

<!-- example: code/multiline-snippet.tsx -->
```tsx
import { Code } from '@vega-ui/react';

const snippet = `{
  "extends": "@vega-ui/eslint-config",
  "rules": {
    "react/jsx-quotes": ["error", "prefer-single"]
  }
}`;

export default function MultilineSnippet() {
  return (
    <pre style={{ margin: 0, width: '100%', overflowX: 'auto' }}>
      <Code size={2} style={{ display: 'block', padding: 'var(--spacing-6)', whiteSpace: 'pre' }}>
        {snippet}
      </Code>
    </pre>
  );
}
```
<!-- /example -->

### Пограничный случай: код внутри текста справа налево

Внутри арабской фразы команда вроде `--filter=@acme/web` переставляется алгоритмом двунаправленного текста. `dir='ltr'` на `Code` сохраняет исходный порядок символов.

<!-- example: code/code-in-rtl-text.tsx -->
```tsx
import { Code, Text } from '@vega-ui/react';

export default function CodeInRtlText() {
  return (
    <Text asChild size={3}>
      <p dir='rtl' lang='ar'>
        شغّل الأمر <Code dir='ltr'>pnpm build --filter=@acme/web</Code> قبل النشر.
      </p>
    </Text>
  );
}
```
<!-- /example -->
