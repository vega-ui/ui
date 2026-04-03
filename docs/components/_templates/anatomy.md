# ComponentName Anatomy

Use this file for compound components that expose multiple public parts or rely on a strict composition contract.

## Recommended Sections

## Overview

One short paragraph describing what the root owns and why the component is compound.

## Required Parts

Document parts that must exist for the component to function correctly.

For each part, include:

- whether it is required
- what it owns or renders
- where it should be placed

## Optional Parts

Document parts that improve UX, form behavior, or overlay behavior but are not always mandatory.

## Composition Order

List the normal production-safe order:

1. `Root`
2. `Required child`
3. `Optional child`

## Valid Composition Patterns

Show the minimal safe composition and, if useful, one richer production pattern.

## Invalid Composition Patterns

Call out integrations that break context, registration, keyboard behavior, or semantics.

## Guidance

- Focus on composition contract, not on prop tables.
- Explain what breaks when a part is omitted or moved.
- Prefer behavior-oriented notes over implementation details.
