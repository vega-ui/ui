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

```tsx
<Text size={2}>
  Run <Code>pnpm docs:validate</Code> before opening a PR.
</Text>
```

## Inline Identifier

When to use:

- a field name, environment variable, or token needs emphasis

Composition notes:

- keep the identifier short
- avoid wrapping full explanatory sentences in `Code`

Trade-offs:

- clarifies machine-readable names
- can become noisy if overused

```tsx
<Text size={2}>
  Set <Code>VEGA_THEME</Code> to force the initial theme.
</Text>
```

## Mixed Prose And Code

When to use:

- body copy contains one or two technical fragments

Composition notes:

- let `Text` handle the paragraph
- use `Code` only for the fragments with code semantics

Trade-offs:

- preserves readability
- long technical passages should move to a block example

```tsx
<Text size={2}>
  The API stores the value in <Code>workspace_slug</Code> and syncs it to <Code>FormData</Code>.
</Text>
```
