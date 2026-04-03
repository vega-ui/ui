# Pagination Examples

## Basic

### Basic: compact pagination

```tsx
<Pagination>
  <PaginationListItem>
    <PaginationText>Page 3 of 20</PaginationText>
  </PaginationListItem>
</Pagination>
```

## Controlled/Stateful

### Controlled/Stateful: button-based pagination

```tsx
const [page, setPage] = useState(1);

<Pagination>
  <PaginationListItem>
    <PaginationTriggerIconButton disabled={page === 1} onClick={() => setPage(page - 1)} />
  </PaginationListItem>
  <PaginationListItem>
    <PaginationItem current={page === 1} onClick={() => setPage(1)}>1</PaginationItem>
  </PaginationListItem>
  <PaginationListItem>
    <PaginationItem current={page === 2} onClick={() => setPage(2)}>2</PaginationItem>
  </PaginationListItem>
</Pagination>
```

## Form/Integration

### Form/Integration: link-based pagination

```tsx
<Pagination>
  <PaginationListItem>
    <PaginationItem asChild current>
      <a href='?page=1'>1</a>
    </PaginationItem>
  </PaginationListItem>
  <PaginationListItem>
    <PaginationItem asChild>
      <a href='?page=2'>2</a>
    </PaginationItem>
  </PaginationListItem>
</Pagination>
```

## Layout/Overlay

### Layout/Overlay: dense footer controls

```tsx
<Pagination>
  <PaginationListItem>
    <PaginationTriggerIconButton />
  </PaginationListItem>
  <PaginationListItem>
    <PaginationItem current>3</PaginationItem>
  </PaginationListItem>
  <PaginationListItem>
    <PaginationTriggerIconButton />
  </PaginationListItem>
</Pagination>
```

## Error

### Error: stale page hint after filter change

```tsx
<>
  <Pagination>
    <PaginationListItem>
      <PaginationText>Page 9 of 9</PaginationText>
    </PaginationListItem>
  </Pagination>
  <HelperText error>The current page may be invalid after filters change.</HelperText>
</>
```

## Disabled

### Disabled: boundary triggers

```tsx
<Pagination>
  <PaginationListItem>
    <PaginationTriggerIconButton disabled />
  </PaginationListItem>
  <PaginationListItem>
    <PaginationItem current>1</PaginationItem>
  </PaginationListItem>
</Pagination>
```

## Edge

### Edge: truncated large range

```tsx
<Pagination>
  <PaginationListItem><PaginationItem>1</PaginationItem></PaginationListItem>
  <PaginationListItem><PaginationEllipsis /></PaginationListItem>
  <PaginationListItem><PaginationItem current>12</PaginationItem></PaginationListItem>
  <PaginationListItem><PaginationEllipsis /></PaginationListItem>
  <PaginationListItem><PaginationItem>20</PaginationItem></PaginationListItem>
</Pagination>
```
