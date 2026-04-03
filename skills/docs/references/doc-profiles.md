# Doc Profiles

Use `docs/components/structure.md` as the source of truth. This file is the fast working summary.

## Primitive

Required:

- `index.md`

Use when:

- the component is mostly single-surface
- composition is not the main consumer concern

## Form-Control

Required:

- `index.md`
- `examples.md`
- `api.md`
- `accessibility.md`

Use when:

- the component is field-like
- validation, labeling, and integration matter more than anatomy

## Compound

Required:

- `index.md`
- `anatomy.md`
- `examples.md`
- `api.md`

Use when:

- the component exports public child parts
- valid composition and part order matter

## Advanced Interactive

Usually needs:

- `index.md`
- `anatomy.md` when compound
- `examples.md`
- `api.md`
- `styling.md`
- `comparison.md`
- `patterns.md`
- `troubleshooting.md`
- `accessibility.md` when relevant

Use when:

- the component has meaningful state, layout, or interaction complexity
- examples and troubleshooting are important to safe integration
