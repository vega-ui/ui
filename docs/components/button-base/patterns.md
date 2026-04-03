# ButtonBase Patterns

## Shared Action Primitive

When to use:
Build a product-specific action wrapper that still inherits VegaUI button styling.

Composition notes:
Wrap `ButtonBase` in a local component and keep `variant`, `appearance`, and `type` explicit.

Trade-offs:
You gain flexibility, but also take responsibility for accessible naming, layout, and semantic correctness.

```tsx
import { ButtonBase, type ButtonBaseProps } from '@vega-ui/react/ButtonBase';

function ToolbarAction(props: ButtonBaseProps) {
  return <ButtonBase appearance='ghost' variant='secondary' {...props} />;
}
```

## Polymorphic Navigation Action

When to use:
Render a navigation target that should visually look like a button.

Composition notes:
Use `asChild` with exactly one anchor or router link child.

Trade-offs:
The result keeps link semantics, so keyboard behavior and announcements differ from a native button.

```tsx
<ButtonBase asChild appearance='outline'>
  <a href='/members'>Manage members</a>
</ButtonBase>
```
