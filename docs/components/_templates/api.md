# API

Use this file for components whose public API is large enough that `index.md` becomes noisy.

## Recommended Sections

## Root Props

Document the primary component props in a compact table:

| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |

## Child Parts

List exported subcomponents and the role each one plays.

## Types

Document exported helper types, unions, and generics that matter to consumers.

## State Model

Call out:

- controlled vs uncontrolled props
- callback semantics
- value shape
- integration with forms or overlays

## Guidance

- Keep the table concise and source-driven.
- Do not mirror every internal type.
- Include defaults only when they are stable and consumer-relevant.
