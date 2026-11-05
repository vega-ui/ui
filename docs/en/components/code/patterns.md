# Code Patterns

## Inline Command In Instructional Copy

When to use:

- documentation or helper copy references a short command

Composition notes:

- wrap only the command itself in `Code`
- keep surrounding instructional text in `Text`

Trade-offs:

- easy to scan
- not suitable for multiline examples

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

## Inline Identifier

When to use:

- a field name, environment variable, or token needs emphasis

Composition notes:

- keep the identifier short
- avoid wrapping full explanatory sentences in `Code`

Trade-offs:

- clarifies machine-readable names
- can become noisy if overused

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

## Mixed Prose And Code

When to use:

- body copy contains one or two technical fragments

Composition notes:

- let `Text` handle the paragraph
- use `Code` only for the fragments with code semantics

Trade-offs:

- preserves readability
- long technical passages should move to a block example

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
