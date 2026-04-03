# Slot Patterns

## Polymorphic Trigger

When to use:

- a low-level trigger primitive should render as a consumer-chosen element

Composition notes:

- guarantee exactly one child
- preserve the correct semantic element for the task

Trade-offs:

- flexible
- easier to misuse than fixed rendering

```tsx
<DialogTrigger asChild>
  <button type='button'>Open dialog</button>
</DialogTrigger>
```

## Styled Link Action

When to use:

- navigation should keep link semantics but borrow button styling

Composition notes:

- choose an `<a>` element intentionally
- keep navigation semantics explicit

Trade-offs:

- preserves link behavior
- easy to overuse when a plain link would be clearer

```tsx
<Button asChild>
  <a href='/docs'>Docs</a>
</Button>
```

## Low-Level Wrapper Authoring

When to use:

- design-system internals need to merge behavior into one child

Composition notes:

- test event-handler merging carefully
- keep semantics explicit in the chosen child

Trade-offs:

- foundational for polymorphism
- easy to create subtle semantic regressions

```tsx
<Slot onClick={handleClick}>
  <a href='/pricing'>Pricing</a>
</Slot>
```
