# Alert API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `variant` | `AlertVariant` | `'info'` | No | Visual style of the alert. |
| `appearance` | `AlertAppearance` | `'fill'` | No | Visual appearance of the badge. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `AlertIcon`: semantic icon slot.
- `AlertMain`: main text wrapper.
- `AlertTitle`: optional title text.
- `AlertContent`: supporting message text.

## Types

- `AlertProps`
- `AlertIconProps`
- `AlertMainProps`
- `AlertTitleProps`
- `AlertContentProps`

## State Model

- `Alert` is stateless from the component API perspective.
- Consumer state usually decides whether the alert is rendered, dismissed, or replaced.
- `useAlertContext` is available for advanced wrappers and custom child parts.
