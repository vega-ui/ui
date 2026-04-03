# ComponentName Styling

Use this file when a component exposes meaningful CSS variables, token hooks, or safe override points.

## Recommended Sections

## Overview

Describe how styling is split across the root and child parts.

## Public CSS Variables

Document only variables that look intentional and consumer-safe.

| Variable | Used By | Purpose |
| --- | --- | --- |

## Part-Level Variables

Break styling down by root and major child parts.

## State And Variant Interaction

Explain how variant, focus, open, disabled, or read-only states affect styling.

## Examples

Show a few override examples that reflect real source behavior.

## Do Not Override

Call out internal ratios, fragile selectors, or overrides that can break focus visibility or semantic clarity.

## Guidance

- Prefer source-driven variables over guessed public contracts.
- Distinguish component-local variables from global theme tokens.
- Do not imply long-term stability for clearly internal hooks.
