# Architecture

VegaUI is a `pnpm` workspace orchestrated with Turborepo. The important architectural idea is not just the folder tree, but the dependency flow across packages.

## System Layers

The repository is built as a layered design-system stack:

1. `packages/tokens`
   Raw design tokens such as colors, spacing, radius, shadows, typography, and layers.
2. `packages/theme`
   Semantic theme variables built on top of tokens. This is where `.light` and `.dark` are defined.
3. `packages/ui`
   React components and component CSS modules that consume theme semantics.
4. `docs/` and Storybook
   Human-facing documentation, examples, and integration guidance built on top of the published API.

Read this stack left to right:

`tokens -> theme -> ui -> stories/tests/docs`

## Workspace Packages

- `packages/ui`: main React package published as `@vega-ui/react`
- `packages/theme`: global semantic theme layer published as `@vega-ui/theme-core`
- `packages/tokens`: raw design tokens published as `@vega-ui/tokens-core`
- `packages/icons`: icon assets and icon exports
- `packages/hooks`: shared hooks such as controlled state, selection, and resize helpers
- `packages/utils`: low-level utilities such as prop merging, refs, dates, and small data helpers
- `packages/react-context`: shared context helpers used by compound components

## Dependency Model

The important dependency direction is:

- `ui` depends on `hooks`, `icons`, `react-context`, and `utils`
- `theme` depends on `tokens`
- components in `ui` are styled against semantic variables from `theme`

That means:

- token changes affect the whole styling system
- theme changes remap semantic meaning without rewriting every component
- component-local CSS variables should stay local and not replace the theme layer

## UI Package Structure

Most components in `packages/ui/src/<Component>/` follow a repeatable structure:

- `Component.tsx`: public component implementation
- `types.ts`: exported types and unions when needed
- `index.ts`: public exports for the package entrypoint
- `style.module.css`: component-local styling
- `components/`: exported child parts for compound components
- `contexts/`: shared local context for compound state
- `__tests__/*.browser.test.tsx`: browser interaction tests
- `*.stories.tsx`: story-driven usage examples

Example:

- [packages/ui/src/TextField/TextField.tsx](/Users/slava/WebstormProjects/ui/packages/ui/src/TextField/TextField.tsx)
- [packages/ui/src/TextField/components/TextFieldInput/TextFieldInput.tsx](/Users/slava/WebstormProjects/ui/packages/ui/src/TextField/components/TextFieldInput/TextFieldInput.tsx)
- [packages/ui/src/TextField/style.module.css](/Users/slava/WebstormProjects/ui/packages/ui/src/TextField/style.module.css)
- [packages/ui/src/TextField/__tests__/TextField.browser.test.tsx](/Users/slava/WebstormProjects/ui/packages/ui/src/TextField/__tests__/TextField.browser.test.tsx)

## Stories, Tests, And Docs

These three layers serve different purposes and should stay aligned:

- stories describe realistic supported usage and visual states
- tests describe behavior, interactions, and edge cases
- docs describe the consumer contract: when to use a component, how to compose it, and what commonly breaks

In this repository, stories mostly live next to components in `packages/ui/src/**`, while Storybook configuration lives in `.storybook/`.

## Documentation Sources Of Truth

When documenting a component, use these priorities:

1. source code for public exports and type shape
2. stories for supported examples and variants
3. tests for edge cases and behavioral guarantees
4. CSS modules for styling hooks and component-local variables

This prevents docs from drifting into patterns the source does not actually support.

See [Glossary](./glossary.md#source-of-truth) for the shared definition of [Source Of Truth](./glossary.md#source-of-truth).
