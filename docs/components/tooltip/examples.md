# Tooltip Examples

## Basic

### Basic: icon button tooltip

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <IconButton aria-label='Support'>
      <Icon><HeartIcon /></Icon>
    </IconButton>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipArrow />
    <Text size={2}>Support</Text>
  </TooltipContent>
</Tooltip>
```

## Controlled/Stateful

### Controlled/Stateful: stateful copy feedback

```tsx
const [copied, setCopied] = useState(false);

<Tooltip delayOpen={0}>
  <TooltipTrigger asChild>
    <Button onClick={() => setCopied((value) => !value)}>
      {copied ? 'Copied' : 'Copy invite link'}
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipArrow />
    <Text size={2}>{copied ? 'Invite link copied.' : 'Copy the current invite link.'}</Text>
  </TooltipContent>
</Tooltip>
```

## Form/Integration

### Form/Integration: field helper tooltip

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Label htmlFor='role'>Role</Label>
  <Tooltip>
    <TooltipTrigger asChild>
      <IconButton appearance='transparent' aria-label='Role info'>
        <Icon><InfoIcon /></Icon>
      </IconButton>
    </TooltipTrigger>
    <TooltipContent>
      <TooltipArrow />
      <Text size={2}>Admins can manage billing and workspace settings.</Text>
    </TooltipContent>
  </Tooltip>
</div>
```

## Layout/Overlay

### Layout/Overlay: tooltip inside dialog

```tsx
<Dialog>
  <DialogTrigger asChild><Button>Open access form</Button></DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <TextField>
          <TextFieldInput />
          <Tooltip>
            <TooltipTrigger asChild>
              <IconButton appearance='transparent' aria-label='Info'>
                <Icon><InfoIcon /></Icon>
              </IconButton>
            </TooltipTrigger>
            <TooltipContent>
              <TooltipArrow />
              <Text size={2}>Info</Text>
            </TooltipContent>
          </Tooltip>
        </TextField>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Error

### Error: warning tooltip for risky action

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant='secondary'>Delete</Button>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipArrow />
    <Text size={2}>Deleting this record removes linked exports.</Text>
  </TooltipContent>
</Tooltip>
```

## Disabled

### Disabled: disabled trigger wrapper

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <span>
      <Button disabled>Invite</Button>
    </span>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipArrow />
    <Text size={2}>Unavailable until billing is verified.</Text>
  </TooltipContent>
</Tooltip>
```

## Edge

### Edge: content-rich descriptive tooltip

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button>Info</Button>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipArrow />
    <Text size={2}>Workspace members only see projects assigned to their team.</Text>
  </TooltipContent>
</Tooltip>
```
