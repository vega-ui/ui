# Status And Feedback

Use this page when the UI should communicate state, loading, progress, measurement, or identity display and the main choice is between compact metadata, feedback messaging, or quantitative indicators.

## Quick Decision Rules

- Use [Badge](../components/badge/) for compact status or category metadata.
- Use [Alert](../components/alert/) for short semantic feedback messages.
- Use [Spinner](../components/spinner/) for compact indeterminate loading.
- Use [Progress](../components/progress/) for temporal completion.
- Use [Meter](../components/meter/) for bounded descriptive measurement.
- Use [MeterStack](../components/meter-stack/) when one measurement is composed of meaningful parts.
- Use [Avatar](../components/avatar/) for one person or entity identity surface.
- Use [AvatarStack](../components/avatar-stack/) for a compact group identity signal.

## By Meaning

- Compact metadata: [Badge](../components/badge/)
- Short feedback message: [Alert](../components/alert/)
- Unknown-duration loading: [Spinner](../components/spinner/)
- Known or bar-like completion: [Progress](../components/progress/)
- Bounded score, capacity, or level: [Meter](../components/meter/)
- Segmented composition breakdown: [MeterStack](../components/meter-stack/)
- One identity: [Avatar](../components/avatar/)
- Group identity preview: [AvatarStack](../components/avatar-stack/)

## Common Misclassifications

- Do not use [Badge](../components/badge/) for full messages that need hierarchy or explanation.
- Do not use [Alert](../components/alert/) as a neutral layout container.
- Do not use [Spinner](../components/spinner/) when exact progress is known.
- Do not use [Progress](../components/progress/) for static scores or quotas.
- Do not use [Meter](../components/meter/) for async completion.
- Do not use [AvatarStack](../components/avatar-stack/) when explicit names or roles matter more than compactness.

## Start Here

- Feedback near content or forms: [Alert](../components/alert/), [Badge](../components/badge/)
- Loading states: [Spinner](../components/spinner/), [Progress](../components/progress/)
- Metrics and usage displays: [Meter](../components/meter/), [MeterStack](../components/meter-stack/)
- Identity surfaces: [Avatar](../components/avatar/), [AvatarStack](../components/avatar-stack/)
