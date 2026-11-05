# Link

## Doc Profile

`primitive`

## Summary

`Link` is the navigational text action component for inline and standalone navigation affordances. It is the default choice when the interaction changes location rather than mutating state.

## Imports

```tsx
import { Link, type LinkProps } from '@vega-ui/react';
```

## Exported Types

- `LinkProps`

## Basic Usage

<!-- example: link/basic-usage.tsx -->
```tsx
import { Link, Text } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <Text size={3} style={{ width: '100%' }}>
      Exports include every invoice from the selected period. Read how we calculate{' '}
      <Link href='/docs/billing/taxes'>VAT for EU customers</Link>{' '}
      before sharing the file with your accountant.
    </Text>
  );
}
```
<!-- /example -->

## Variants

- Inline text link versus standalone navigational action
- Default anchor rendering versus `asChild` composition

## Related Docs

- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Use real navigation targets, not button-like behavior disguised as links.
- `asChild` is useful for router integrations while preserving link styling.
- Focus and underline behavior should be checked against surrounding typography.
- If the desired presentation is a strong call-to-action surface, `Button asChild` may be clearer than a plain text link.

## Common Mistakes

- Using `Link` for actions that mutate state.
- Styling a link like a button without considering semantics.
- Using vague link text such as "Click here".
