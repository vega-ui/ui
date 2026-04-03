# AvatarStack Examples

## Basic

### Basic: team preview

```tsx
<AvatarStack>
  <AvatarStackItem><AvatarFallback>AL</AvatarFallback></AvatarStackItem>
  <AvatarStackItem><AvatarFallback>BK</AvatarFallback></AvatarStackItem>
  <AvatarStackItem><AvatarFallback>CM</AvatarFallback></AvatarStackItem>
</AvatarStack>
```

## Controlled/Stateful

### Controlled/Stateful: participant count in parent state

```tsx
const [participants] = useState(['AL', 'BK', 'CM']);

<AvatarStack>
  {participants.map((name) => (
    <AvatarStackItem key={name}>
      <AvatarFallback>{name}</AvatarFallback>
    </AvatarStackItem>
  ))}
</AvatarStack>
```

## Form/Integration

### Form/Integration: selected reviewers preview

```tsx
<AvatarStack>
  <AvatarStackItem><AvatarFallback>PM</AvatarFallback></AvatarStackItem>
  <AvatarStackItem><AvatarFallback>UX</AvatarFallback></AvatarStackItem>
  <AvatarStackItem><AvatarFallback>QA</AvatarFallback></AvatarStackItem>
</AvatarStack>
```

## Layout/Overlay

### Layout/Overlay: compact stack in a modal header

```tsx
<AvatarStack size='sm'>
  <AvatarStackItem><AvatarFallback>AL</AvatarFallback></AvatarStackItem>
  <AvatarStackItem><AvatarFallback>BK</AvatarFallback></AvatarStackItem>
</AvatarStack>
```

## Error

### Error: mixed unavailable avatars

```tsx
<>
  <AvatarStack>
    <AvatarStackItem><AvatarFallback>AL</AvatarFallback></AvatarStackItem>
    <AvatarStackItem><AvatarFallback>??</AvatarFallback></AvatarStackItem>
  </AvatarStack>
  <HelperText error>Some reviewers do not have profile photos yet.</HelperText>
</>
```

## Disabled

### Disabled: inactive member group

```tsx
<div style={{ opacity: 0.6 }}>
  <AvatarStack>
    <AvatarStackItem><AvatarFallback>AL</AvatarFallback></AvatarStackItem>
    <AvatarStackItem><AvatarFallback>BK</AvatarFallback></AvatarStackItem>
  </AvatarStack>
</div>
```

## Edge

### Edge: mixed image and fallback avatars

```tsx
<AvatarStack size='sm'>
  <AvatarStackItem>
    <AvatarImage src='/user-1.png' alt='Alice' />
    <AvatarFallback>AL</AvatarFallback>
  </AvatarStackItem>
  <AvatarStackItem>
    <AvatarFallback>BK</AvatarFallback>
  </AvatarStackItem>
</AvatarStack>
```
