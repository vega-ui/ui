# AvatarStack Patterns

## Reviewer Preview

When to use:

- a card or row needs a compact preview of people involved

Composition notes:

- keep the group small
- add a nearby label or count when exact membership matters

Trade-offs:

- fast visual recognition
- less explicit than showing full names

```tsx
<AvatarStack>
  <AvatarStackItem><AvatarFallback>PM</AvatarFallback></AvatarStackItem>
  <AvatarStackItem><AvatarFallback>UX</AvatarFallback></AvatarStackItem>
  <AvatarStackItem><AvatarFallback>QA</AvatarFallback></AvatarStackItem>
</AvatarStack>
```

## Mixed Photo And Fallback Group

When to use:

- some users have profile images and others only have initials

Composition notes:

- keep all items at the same size and variant
- provide reasonable `alt` text for images

Trade-offs:

- robust against incomplete profile data
- visual balance can vary across image/fallback mixes

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

## Modal Header Participants

When to use:

- an overlay header needs a compact participant cue

Composition notes:

- prefer `sm` or `md` sizes
- keep the group visually secondary to the main heading

Trade-offs:

- compact and polished
- easy to overload if too many avatars are shown

```tsx
<AvatarStack size='sm'>
  <AvatarStackItem><AvatarFallback>AL</AvatarFallback></AvatarStackItem>
  <AvatarStackItem><AvatarFallback>BK</AvatarFallback></AvatarStackItem>
</AvatarStack>
```
