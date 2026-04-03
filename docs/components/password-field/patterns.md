# PasswordField Patterns

## Sign-In Password Row

When to use:

- users enter an existing account password

Composition notes:

- set `autoComplete='current-password'`
- keep the toggle visible and close to the input

Trade-offs:

- familiar pattern
- reveal affordance adds one extra action in the row

```tsx
<PasswordField>
  <PasswordFieldInput autoComplete='current-password' />
  <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
    <PasswordFieldShownIcon />
    <PasswordFieldHiddenIcon />
  </PasswordFieldToggleIconButton>
</PasswordField>
```

## New Password Creation

When to use:

- users create or reset a password

Composition notes:

- set `autoComplete='new-password'`
- pair the field with helper copy or strength guidance

Trade-offs:

- improves clarity during onboarding or reset flows
- can encourage overreliance on visual strength hints

```tsx
<>
  <PasswordField>
    <PasswordFieldInput autoComplete='new-password' />
    <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
      <PasswordFieldShownIcon />
      <PasswordFieldHiddenIcon />
    </PasswordFieldToggleIconButton>
  </PasswordField>
  <HelperText>Use 12+ characters and at least one symbol.</HelperText>
</>
```

## Custom Visibility Iconography

When to use:

- product language calls for custom security iconography

Composition notes:

- keep the accessible button label generic and clear
- swap icons inside the shipped toggle part

Trade-offs:

- fits product language
- easy to over-style if the icons dominate the field

```tsx
<PasswordField>
  <PasswordFieldInput />
  <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
    <PasswordFieldShownIcon><Lock /></PasswordFieldShownIcon>
    <PasswordFieldHiddenIcon><LockOpen /></PasswordFieldHiddenIcon>
  </PasswordFieldToggleIconButton>
</PasswordField>
```
