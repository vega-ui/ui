# Fieldset Patterns

## Settings Section

When to use:

- a settings screen contains several related toggles
- the group should read as one preference area

Composition notes:

- keep `FieldsetLegend` short and stable
- use `FieldsetHeader` for extra guidance
- render the actual toggles directly after the header

Trade-offs:

- improves semantic grouping and scanability
- adds more vertical structure than a loose list of controls

```tsx
<Fieldset appearance='outlined'>
  <FieldsetLegend>Notifications</FieldsetLegend>
  <FieldsetHeader>Choose which updates should trigger alerts.</FieldsetHeader>
  <Checkbox>Email</Checkbox>
  <Checkbox>Slack</Checkbox>
</Fieldset>
```

## Transparent Group In Existing Panel

When to use:

- the parent layout already provides the visible container
- only the grouping semantics are missing

Composition notes:

- switch to `appearance='transparent'`
- keep the legend even when border and padding are removed

Trade-offs:

- preserves semantics without duplicating containers
- makes the group boundary depend on surrounding layout

```tsx
<Fieldset appearance='transparent'>
  <FieldsetLegend>Session security</FieldsetLegend>
  <Switch>Require device approval</Switch>
</Fieldset>
```

## Grouped Validation Copy

When to use:

- several related controls fail one business rule
- the error belongs to the group rather than a single input

Composition notes:

- keep the legend as the stable group name
- place the explanatory copy in `FieldsetHeader`
- let child controls still render their own local state if needed

Trade-offs:

- clarifies group-level validation
- can become noisy if every child control also repeats the same message

```tsx
<Fieldset appearance='outlined' aria-invalid='true'>
  <FieldsetLegend>Contact methods</FieldsetLegend>
  <FieldsetHeader>Choose at least one channel before saving.</FieldsetHeader>
  <Checkbox>Email</Checkbox>
  <Checkbox>SMS</Checkbox>
</Fieldset>
```
