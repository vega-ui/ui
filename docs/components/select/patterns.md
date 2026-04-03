# Select Patterns

## Searchable Select

When to use:

- the option list is long
- users need text filtering before making a choice
- keeping the field compact still matters

Composition notes:

- render a text input inside `SelectListbox`
- disable built-in typeahead with `typeMatchEnabled={false}`
- filter the rendered `SelectOption` list from external state

Trade-offs:

- improves discoverability for long lists
- increases keyboard complexity compared with a plain select

```tsx
const [search, setSearch] = useState('');

<Select typeMatchEnabled={false}>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select country' />
    <SelectIcon />
  </SelectCombobox>
  <SelectPortal>
    <SelectListbox>
      <TextField>
        <TextFieldInput
          placeholder='Search country'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </TextField>
      <SelectOption value='fr'>France</SelectOption>
      <SelectOption value='de'>Germany</SelectOption>
      <SelectOption value='jp'>Japan</SelectOption>
    </SelectListbox>
  </SelectPortal>
</Select>
```

## Clearable Controlled Select

When to use:

- the selected value can be reset
- the field must sync with URL state, filters, or external form logic

Composition notes:

- store selection in React state
- pass `value` and `onSelectValue`
- provide a separate clear action

Trade-offs:

- keeps state explicit and predictable
- adds parent-state complexity compared with uncontrolled usage

```tsx
const [value, setValue] = useState<string | number | undefined>('medium');

<>
  <Button
    variant='secondary'
    appearance='ghost'
    disabled={value === undefined}
    onClick={() => setValue(undefined)}
  >
    Clear
  </Button>

  <Select value={value} onSelectValue={setValue}>
    <SelectHiddenSelect />
    <SelectCombobox>
      <SelectValue placeholder='Select incident priority' />
      <SelectIcon />
    </SelectCombobox>
    <SelectPortal>
      <SelectListbox>
        <SelectOption value='low'>Low</SelectOption>
        <SelectOption value='medium'>Medium</SelectOption>
        <SelectOption value='high'>High</SelectOption>
      </SelectListbox>
    </SelectPortal>
  </Select>
</>
```

## Select Inside Overlay

When to use:

- a modal, drawer, or sheet contains a single-choice field
- the listbox must coexist with another overlay system

Composition notes:

- render `Select` normally inside the overlay content
- keep `SelectPortal` so the listbox does not get clipped
- retest focus restoration and dismissal in the real overlay

Trade-offs:

- preserves normal field behavior inside overlays
- requires more integration testing than isolated component usage

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open settings</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Template</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>

        <Select defaultValue='template-a'>
          <SelectHiddenSelect />
          <SelectCombobox>
            <SelectValue placeholder='Select template' />
            <SelectIcon />
          </SelectCombobox>
          <SelectPortal>
            <SelectListbox>
              <SelectOption value='template-a'>Template A</SelectOption>
              <SelectOption value='template-b'>Template B</SelectOption>
              <SelectOption value='template-c'>Template C</SelectOption>
            </SelectListbox>
          </SelectPortal>
        </Select>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Inline Sentence Select

When to use:

- the control belongs inside readable sentence-like copy
- the choice is lightweight and should feel embedded

Composition notes:

- use `variant='inline'`
- surround the field with meaningful text
- avoid using inline variant without context

Trade-offs:

- feels lightweight and embedded
- depends on surrounding copy for clarity and labeling

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
  <Text size={3}>Notify me</Text>
  <Select variant='inline' defaultValue='weekly'>
    <SelectHiddenSelect />
    <SelectCombobox>
      <SelectValue placeholder='frequency' />
      <SelectIcon />
    </SelectCombobox>
    <SelectPortal>
      <SelectListbox>
        <SelectOption value='daily'>Daily</SelectOption>
        <SelectOption value='weekly'>Weekly</SelectOption>
        <SelectOption value='monthly'>Monthly</SelectOption>
      </SelectListbox>
    </SelectPortal>
  </Select>
  <Text size={3}>about updates.</Text>
</div>
```

## Rich Option Content

When to use:

- options need iconography or secondary copy
- visual scanning matters more than minimal row density

Composition notes:

- keep the `value` scalar
- make the whole option row the selectable unit
- do not split the option into multiple interactive controls

Trade-offs:

- improves scanability for complex choices
- increases row height and semantic complexity

```tsx
<Select defaultValue='pro'>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select a plan' />
    <SelectIcon />
  </SelectCombobox>
  <SelectPortal>
    <SelectListbox>
      <SelectOption value='basic'>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text size={2}>Basic</Text>
          <Text size={1}>For simple use cases</Text>
        </div>
      </SelectOption>
      <SelectOption value='pro'>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text size={2}>Pro</Text>
          <Text size={1}>Most common choice</Text>
        </div>
      </SelectOption>
    </SelectListbox>
  </SelectPortal>
</Select>
```

## Native Form Select

When to use:

- the selected value should be submitted through normal form mechanisms
- the integration relies on `FormData`

Composition notes:

- include `SelectHiddenSelect`
- keep the select inside the form boundary

Trade-offs:

- improves native form interoperability
- adds one more required part to the composition

```tsx
<form>
  <Label htmlFor='framework'>Framework</Label>
  <Select defaultValue='react'>
    <SelectHiddenSelect />
    <SelectCombobox id='framework'>
      <SelectValue placeholder='Select framework' />
      <SelectIcon />
    </SelectCombobox>
    <SelectPortal>
      <SelectListbox>
        <SelectOption value='react'>React</SelectOption>
        <SelectOption value='vue'>Vue</SelectOption>
      </SelectListbox>
    </SelectPortal>
  </Select>
  <Button type='submit'>Submit</Button>
</form>
```

Notes:

- without `SelectHiddenSelect`, the control may still render correctly but the native form contract is weaker
