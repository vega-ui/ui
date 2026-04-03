# Selection Controls

Use this page when the user must choose, toggle, or combine values and the first decision is about interaction shape rather than API details.

## Quick Decision Rules

- Use [Switch](../components/switch/) for one immediate binary setting.
- Use [Checkbox](../components/checkbox/) for independent or combinable choices.
- Use [Radio](../components/radio/) for one choice from a small visible set.
- Use [SegmentedControl](../components/segmented-control/) for a short, always-visible exclusive set.
- Use [Select](../components/select/) for a compact single-choice field with hidden options.
- Use [CheckboxCard](../components/checkbox-card/) for rich multi-select option tiles.

## By Interaction Model

- Immediate binary state: [Switch](../components/switch/)
- Deferred or form-like binary selection: [Checkbox](../components/checkbox/)
- Exclusive visible choice: [Radio](../components/radio/), [SegmentedControl](../components/segmented-control/)
- Exclusive compact field: [Select](../components/select/)
- Rich descriptive multi-select: [CheckboxCard](../components/checkbox-card/)

## Common Misclassifications

- Do not use [Switch](../components/switch/) for a deferred form choice that should read like selection.
- Do not use [Checkbox](../components/checkbox/) for mutually exclusive options.
- Do not use [SegmentedControl](../components/segmented-control/) when labels are long or options are numerous.
- Do not use [Select](../components/select/) when users benefit from seeing all options at once.
- Do not use [CheckboxCard](../components/checkbox-card/) when the UI only needs a compact row.

## Start Here

- Dense forms: [Select](../components/select/), [Radio](../components/radio/), [Checkbox](../components/checkbox/)
- Settings pages: [Switch](../components/switch/), [Checkbox](../components/checkbox/)
- Short view or mode toggles: [SegmentedControl](../components/segmented-control/)
- Pricing or feature option tiles: [CheckboxCard](../components/checkbox-card/)
