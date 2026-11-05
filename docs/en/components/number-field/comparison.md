# NumberField Comparison

## Quick Decision Rule

Use `NumberField` when bounds, stepping, or numeric-only interaction matter. Use `TextField` when the value is free-form text, even if it contains digits.

## `NumberField` vs `TextField`

Use `NumberField` when:

- the value is a real quantity, count, price input, or bounded numeric amount

Use `TextField` when:

- the value is an identifier, phone number, code, or other digit-containing text

## `NumberField` vs `Slider`

Use `NumberField` when:

- exact numeric entry matters

Use `Slider` when:

- fast approximate adjustment matters more than exact typing

## Choose This Component When

- users may type or step exact numbers
- min, max, and step matter
- the same value should be editable by typing and controls without drifting semantics

## Do Not Choose This Component When

- the value is not truly numeric
- the interaction should be approximate and gesture-first
