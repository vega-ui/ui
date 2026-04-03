# PageControl Examples

## Basic

### Basic: onboarding step dots

```tsx
<PageControl>
  <PageControlItem index={0} />
  <PageControlItem index={1} />
  <PageControlItem index={2} />
  <PageControlItem index={3} />
</PageControl>
```

## Controlled/Stateful

### Controlled/Stateful: controlled active index

```tsx
const [active, setActive] = useState(1);

<PageControl active={active} onChangeActive={setActive}>
  <PageControlItem index={0} />
  <PageControlItem index={1} />
  <PageControlItem index={2} />
</PageControl>
```

## Form/Integration

### Form/Integration: step indicator above form pages

```tsx
<PageControl active={2}>
  <PageControlItem index={0} />
  <PageControlItem index={1} />
  <PageControlItem index={2} />
</PageControl>
```

## Layout/Overlay

### Layout/Overlay: carousel indicator row

```tsx
<PageControl>
  <PageControlItem index={0} />
  <PageControlItem index={1} />
  <PageControlItem index={2} />
  <PageControlItem index={3} />
</PageControl>
```

## Error

### Error: autoplay hint mismatch

```tsx
<>
  <PageControl>
    <PageControlProgress index={0} />
    <PageControlProgress index={1} />
    <PageControlProgress index={2} />
  </PageControl>
  <HelperText error>Autoplay is paused until the current step is confirmed.</HelperText>
</>
```

## Disabled

### Disabled: locked current item

```tsx
<PageControl active={0}>
  <PageControlItem index={0} current />
  <PageControlItem index={1} />
  <PageControlItem index={2} />
</PageControl>
```

## Edge

### Edge: timed progress indicators

```tsx
<PageControl active={0}>
  <PageControlProgress index={0} duration={5000} />
  <PageControlProgress index={1} duration={5000} />
  <PageControlProgress index={2} duration={5000} />
</PageControl>
```
