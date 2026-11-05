# Heading Patterns

## Section Heading

When to use:

- a page or panel needs a visible structural title

Composition notes:

- choose `as` from the document outline first
- choose `size` second based on visual rhythm

Trade-offs:

- preserves semantics and visual flexibility
- requires discipline when multiple headings are present

<!-- example: heading/document-outline.tsx -->
```tsx
import { Heading, Text } from '@vega-ui/react';

export default function DocumentOutline() {
  return (
    <article style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: '60ch' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h1'>Getting started</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Set up your workspace in three steps.</Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h2'>Invite your team</Heading>
        <Text size={3}>Members get access to every public project.</Text>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Heading as='h3'>Roles and permissions</Heading>
        <Text size={3}>Admins manage billing; editors can create projects.</Text>
      </div>
    </article>
  );
}
```
<!-- /example -->

## Compact Hierarchy In Dense Panels

When to use:

- a dense settings page needs smaller visual headings without changing semantic level

Composition notes:

- keep the correct `as`
- reduce `size` only if the hierarchy remains clear

Trade-offs:

- saves space
- can weaken visual hierarchy if overused

<!-- example: heading/compact-hierarchy-in-dense-panels.tsx -->
```tsx
import { Card, Heading, Text } from '@vega-ui/react';

const keys = [
  { name: 'Production', created: 'Created Jan 12', lastUsed: 'Used 2 minutes ago' },
  { name: 'CI pipeline', created: 'Created Feb 3', lastUsed: 'Used yesterday' },
];

export default function CompactHierarchyInDensePanels() {
  return (
    <Card asChild size='sm' style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <section aria-labelledby='api-keys-title'>
        <Heading as='h3' size={4} id='api-keys-title'>API keys</Heading>
        {keys.map((key) => (
          <div key={key.name} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
            <Heading as='h4' size={3} fontWeight={500}>{key.name}</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{key.created} · {key.lastUsed}</Text>
          </div>
        ))}
      </section>
    </Card>
  );
}
```
<!-- /example -->

## Heading With Supporting Copy

When to use:

- the section title needs a short description

Composition notes:

- keep `Heading` as the title only
- place supporting text in `Text`

Trade-offs:

- clear separation of roles
- requires one extra text element

`<hgroup>` keeps the description tied to the heading without making it part of the heading text.

<!-- example: heading/heading-with-supporting-copy.tsx -->
```tsx
import { Heading, Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function HeadingWithSupportingCopy() {
  return (
    <hgroup style={{ display: 'grid', gap: 'var(--spacing-2)', width: '100%', margin: 0 }}>
      <Heading as='h2' size={6}>Billing contacts</Heading>
      <Text asChild size={3} style={{ '--t-color': 'var(--label-secondary)' } as CSSProperties}>
        <p>Invoices and payment reminders are sent to these people.</p>
      </Text>
    </hgroup>
  );
}
```
<!-- /example -->
