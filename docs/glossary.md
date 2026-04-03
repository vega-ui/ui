# Glossary

This glossary defines common terms used across VegaUI documentation so component pages can stay concise and consistent.

## Controlled

A component is controlled when the parent owns its current state through props such as `value`, `open`, or `checked`, and updates that state through callbacks.

## Uncontrolled

A component is uncontrolled when it owns its internal state after an initial prop such as `defaultValue`, `defaultOpen`, or `defaultChecked`.

## Compound Component

A component built from a root plus exported child parts that share state through context. `Select`, `Dialog`, and `Calendar` are typical compound components.

## Primitive

A low-level building block with a small API surface and little or no composition contract. Primitives are usually easier to document with only `index.md`.

## Portal

A rendering pattern that mounts overlay content outside the normal DOM location to avoid clipping, stacking, or overflow issues.

## Typeahead

Keyboard matching behavior that moves focus or selection based on typed characters. It can conflict with an actual text input rendered inside a listbox or menu.

## Form Participation

The ability for a custom component to behave like a field in native HTML form flows, including `FormData` submission and browser form tooling.

## Read-Only

A state where the component can still receive focus but its value should not change.

## Disabled

A state where the component should not be interactive. It usually blocks focus, pointer interaction, and value changes.

## Variant

A named visual or behavioral mode such as `field`, `inline`, `secondary`, or `ghost`.

## Size Token

A named size mode such as `sm`, `md`, or `lg` that maps to spacing, height, radius, or typography decisions.

## Composition Contract

The required structure of root and child parts that makes a compound component function correctly.

## Source Of Truth

The file category that should be trusted for a given kind of documentation:

- source code for public API and types
- stories for realistic usage and visible states
- tests for behavior and edge cases
- styles for CSS variables and theming hooks
