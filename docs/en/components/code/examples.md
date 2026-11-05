# Code Examples

## Basic

### Basic: commands in setup steps

Each step is a list item rendered through `Text asChild`, and only the command itself is wrapped in `Code`. The surrounding sentence stays readable prose.

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

## Controlled/Stateful

### Controlled/Stateful: copy to clipboard

The copy button keeps a small status: the icon switches to a check and a `role='status'` message confirms the copy, then resets after two seconds. A failed `navigator.clipboard` call shows a fallback instruction instead of failing silently.

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

## Form/Integration

### Form/Integration: derived identifier in helper text

The workspace URL is derived from the name as the user types and shown in `Code` inside the `HelperText` that the input references with `aria-describedby`. The slug is submitted through a hidden input and read with `FormData`; an empty slug disables the submit.

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

## Layout/Overlay

### Layout/Overlay: commands in a dialog

Commands sit inside dialog body copy. `Code` defaults to size 3, so inside the size 2 note it gets `size={2}` to match the surrounding text.

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

## Error

### Error: invalid variable name

The name is checked against the pattern on submit. An invalid name turns the hint into an error, which shows the expected format as `Code`, and sets `aria-invalid`; typing clears the error.

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

## Disabled

### Disabled: why a command is unavailable

The deploy button is disabled and the reason, with the branch and the command in `Code`, is linked with `aria-describedby`.

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

## Edge

### Edge: long paths and hashes

`Code` is an inline block with `word-wrap: break-word`, so a long path or commit hash breaks inside the chip instead of overflowing a narrow column. The whole chip moves to a new line first, which leaves a gap at the end of the previous line.

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

### Edge: multi-line snippet

`Code` inherits `white-space: pre-line` from `Text`, which collapses indentation. For a snippet, wrap it in `<pre>`, set `whiteSpace: 'pre'` and `display: 'block'` on `Code`, and let the `<pre>` scroll horizontally.

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

### Edge: code inside right-to-left text

Inside an Arabic sentence a command like `--filter=@acme/web` gets reordered by the bidi algorithm. `dir='ltr'` on `Code` keeps the command in its original order.

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
