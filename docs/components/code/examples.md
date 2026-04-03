# Code Examples

## Basic

### Basic: inline command

```tsx
<Code>pnpm docs:validate</Code>
```

## Controlled/Stateful

### Controlled/Stateful: dynamic code token

```tsx
const [env] = useState('production');

<Text size={2}>
  Current environment: <Code>{env}</Code>
</Text>
```

## Form/Integration

### Form/Integration: inline identifier in helper copy

```tsx
<Text size={2}>
  The value will be stored under <Code>workspace_slug</Code>.
</Text>
```

## Layout/Overlay

### Layout/Overlay: command in a dialog body

```tsx
<Text size={2}>
  Run <Code>pnpm storybook</Code> to inspect component states locally.
</Text>
```

## Error

### Error: invalid token name

```tsx
<Text size={2}>
  <Code>VEGA_THEME</Code> is missing from the current environment.
</Text>
```

## Disabled

### Disabled: unavailable command hint

```tsx
<Text size={2} style={{ color: 'var(--disable-label-text-color)' }}>
  <Code>pnpm release</Code> is restricted in local development.
</Text>
```

## Edge

### Edge: long inline path

```tsx
<Code>/packages/ui/src/components/very-long-generated-name.ts</Code>
```
