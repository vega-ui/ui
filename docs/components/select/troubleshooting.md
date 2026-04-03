# Select Troubleshooting

## Selected Value Is Not Submitted With The Form

### Symptom

The control renders and updates visually, but the selected value is missing from native form submission.

### Likely Cause

`SelectHiddenSelect` is missing from the composition.

### How To Verify

- submit the surrounding form
- inspect the resulting `FormData`
- confirm that the expected field name or value is absent

### Fix

Render `SelectHiddenSelect` inside the root `Select`.

```tsx
<Select>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select framework' />
    <SelectIcon />
  </SelectCombobox>
</Select>
```

## Typing In The Search Field Also Changes Option Focus

### Symptom

Typing into an embedded search field unexpectedly moves option focus or changes the active option.

### Likely Cause

Built-in typeahead is still enabled while a real text input is rendered inside `SelectListbox`.

### How To Verify

- place a `TextFieldInput` inside the listbox
- type into the field
- observe whether option focus jumps unexpectedly

### Fix

Disable built-in typeahead for this pattern.

```tsx
<Select typeMatchEnabled={false}>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select country' />
    <SelectIcon />
  </SelectCombobox>
  <SelectPortal>
    <SelectListbox>
      <TextField size='sm'>
        <TextFieldInput placeholder='Search country' />
      </TextField>
      <SelectOption value='DE'>Germany</SelectOption>
      <SelectOption value='GB'>United Kingdom</SelectOption>
    </SelectListbox>
  </SelectPortal>
</Select>
```

## The Listbox Is Clipped Or Hidden Behind Layout Containers

### Symptom

The listbox opens, but part of it is hidden by parent overflow, clipping, or stacking context issues.

### Likely Cause

The listbox is rendered inside a clipping or stacking context without `SelectPortal`.

### How To Verify

- inspect parent containers for `overflow`, transforms, or stacking issues
- remove the clipping container temporarily
- see whether the listbox becomes visible

### Fix

Wrap the listbox in `SelectPortal`.

```tsx
<SelectPortal>
  <SelectListbox>
    <SelectOption value='starter'>Starter</SelectOption>
    <SelectOption value='pro'>Pro</SelectOption>
    <SelectOption value='enterprise'>Enterprise</SelectOption>
  </SelectListbox>
</SelectPortal>
```

## The Select Works Visually But Keyboard Behavior Feels Broken In A Dialog

### Symptom

The select opens, but focus movement, close behavior, or keyboard navigation feels inconsistent inside an overlay.

### Likely Cause

The composed overlay behavior was validated in isolation but not retested inside `Dialog`, `Drawer`, or `Sheet`.

### How To Verify

- render the exact integration inside the real overlay
- test open, close, focus return, and option navigation from the keyboard

### Fix

- keep the standard `Select` composition intact
- retest with the real overlay stack
- avoid custom trigger or option structures that interfere with focus flow

## The Placeholder Never Appears

### Symptom

`placeholder` is configured, but the trigger always shows some other content.

### Likely Cause

An initial value is already selected, or custom `SelectValue` children always render content.

### How To Verify

- remove `value` and `defaultValue`
- remove custom children from `SelectValue`
- check whether the placeholder becomes visible

### Fix

- use `placeholder` only when no selected value is present
- ensure custom value rendering respects the empty state

## Clearing The Value Does Not Update The UI

### Symptom

The parent clears the value logically, but the UI still shows the old selection.

### Likely Cause

The component is used in controlled mode, but the parent state is not updated to `undefined` or another empty state.

### How To Verify

- inspect the current `value` prop
- confirm whether `onSelectValue` updates the same source of truth

### Fix

Use one source of truth for the controlled value and update it directly.

```tsx
const [value, setValue] = useState<string | number | undefined>();

<Select value={value} onSelectValue={setValue}>
  <SelectHiddenSelect />
  <SelectCombobox>
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
```

## Options Render Correctly But Selection Does Not Change

### Symptom

Options are visible and clickable, but the selected value does not update as expected.

### Likely Cause

`SelectOption` values do not match the expected scalar value model, or custom option composition broke the selectable row.

### How To Verify

- confirm each `SelectOption` has a `string` or `number` value
- check whether the whole option row remains the selectable unit

### Fix

- keep option values scalar
- avoid splitting one option into multiple competing interactive elements

## Read-Only And Disabled Behave Differently Than Expected

### Symptom

The control state looks right visually, but focusability or interaction does not match product expectations.

### Likely Cause

`readOnly` and `disabled` were treated as visual variants rather than behavior variants.

### How To Verify

- test focusability and interaction in both states
- confirm whether the control should still receive focus

### Fix

- use `disabled` when interaction must stop entirely
- use `readOnly` when the field should remain focusable but immutable

## Object Values Cause Type Or Behavior Problems

### Symptom

Type errors, unstable selection, or mismatched values appear when passing full objects as option values.

### Likely Cause

The public API is built for `string` and `number` values, not object payloads.

### How To Verify

- inspect the `value` passed to `Select`
- confirm whether `SelectOption value={...}` is scalar

### Fix

Store a scalar key in `Select` and resolve the full object in the parent layer.

## The Select Looks Correct But The Composition Still Feels Fragile

### Symptom

The component appears to work, but small customization changes keep breaking behavior.

### Likely Cause

Too much behavior was pushed into custom wrappers instead of the shipped parts.

### How To Verify

- compare the current composition to the standard layout in `index.md` and `anatomy.md`
- remove custom wrappers incrementally

### Fix

- return to the standard composition first
- reintroduce custom wrappers only where the built-in parts are insufficient
- use `useSelectContext` only for advanced cases
