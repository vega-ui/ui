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
const [open, setOpen] = useState(false);
const [copied, setCopied] = useState(false);

const changeOpen = (value: boolean) => {
  setOpen(value);
  if (!value) setCopied(false);
};

const copy = () => {
  setCopied(true);
  setOpen(true);
};

<Tooltip delayOpen={0} open={open} onChangeOpen={changeOpen}>
  <TooltipTrigger asChild>
    <Button onClick={copy}>
      {copied ? 'Copied' : 'Copy invite link'}
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipArrow />
    <Text size={2}>{copied ? 'Invite link copied.' : 'Copy the current invite link.'}</Text>
  </TooltipContent>
</Tooltip>
```

### Controlled/Stateful: controlled open state

```tsx
const [open, setOpen] = useState(false);

<Tooltip open={open} onChangeOpen={setOpen}>
  <TooltipTrigger asChild>
    <Button>Save draft</Button>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipArrow />
    <Text size={2}>Saved automatically every minute.</Text>
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
  <DialogContent aria-label='Access form'>
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
    <span tabIndex={0}>
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
