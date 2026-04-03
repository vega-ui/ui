# VegaUI Documentation

This directory is the starting point for project-level documentation outside Storybook. It is intended to explain how VegaUI is structured, how to integrate it into an app, and how each component should be used in production code.

## Documentation Sources of Truth

- `packages/ui/src/*`: public API, exported types, and composition model
- `*.stories.tsx`: realistic usage examples and visual states
- `__tests__/*.browser.test.tsx`: interaction behavior and edge cases
- `packages/*/README.md`: package-level installation and setup notes

## Structure

- `getting-started.md`: install, styles, fonts, and local development
- `architecture.md`: monorepo layout and package responsibilities
- `glossary.md`: shared terminology used across component documentation
- `families/`: decision-oriented navigation across related component groups
- `styling/`: global theming, tokens, and CSS variable model
- `components/`: component usage, API notes, type exports, and edge cases
- `components/structure.md`: declared file structure for per-component documentation
- `component-template.md`: template for documenting the remaining components

## Component Doc Structure

Component docs now use a directory-based layout under `docs/components/<component>/`.

The canonical structure is declared in `docs/components/structure.md`.

Core files:

- `index.md`: entry page, purpose, minimal composition, variants, related docs
- `examples.md`: scenario examples grouped by the shared taxonomy
- `api.md`: props, exported parts, types, and state model
- `styling.md`: CSS variables, theming hooks, and override guidance
- `accessibility.md`: keyboard, focus, labeling, and screen-reader contract
- `comparison.md`: when to choose this component instead of similar ones
- `patterns.md`: reusable product integration patterns
- `troubleshooting.md`: common failure modes, diagnosis, and fixes
- `anatomy.md`: compound-component structure, required parts, and invalid compositions

Required usage now follows doc profiles declared in `docs/components/structure.md`:

- `primitive`: `index.md`
- `form-control`: `index.md`, `examples.md`, `api.md`, `accessibility.md`
- `compound`: `index.md`, `anatomy.md`, `examples.md`, `api.md`
- `advanced interactive`: full component set including `styling.md`, `comparison.md`, `patterns.md`, and `troubleshooting.md`

## Coverage Status

Current status:

- project-level docs are in place
- family-level navigation docs are in place for major interaction areas
- all current public UI components are documented in `docs/components/`
- `Stepper` is intentionally excluded because `packages/ui/src/Stepper/` is empty and not exported publicly

## Documentation Rules

- Prefer examples that match existing Storybook stories.
- Every component page should include at least one concrete example.
- For consumer-facing components, prefer 2-4 scenario-driven examples instead of one minimal snippet.
- Scenario headings inside `More Examples` should use the shared taxonomy when applicable:
  `Basic`, `Controlled/Stateful`, `Form/Integration`, `Layout/Overlay`, `Error`, `Disabled`, `Edge`.
- Every component page should call out supported variants or composition variants.
- Document composition patterns, not only flat prop lists.
- Call out controlled vs uncontrolled behavior when relevant.
- Include accessibility and integration edge cases when they affect API usage.
- Include a short "Common Mistakes" section for predictable integration errors.
- Keep examples aligned with real exports from `@vega-ui/react`.
