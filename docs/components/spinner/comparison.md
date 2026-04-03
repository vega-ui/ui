# Spinner Comparison

## Quick Decision Rule

Use `Spinner` when a temporary pending state needs a compact animated indicator. Do not use it as a substitute for preserving layout or showing final status.

## `Spinner` vs retained content

Use `Spinner` when:

- progress is brief and the action is already obvious

Keep content in place when:

- preserving layout matters more than motion

## `Spinner` vs progress indicators

Use `Spinner` when:

- exact progress is unknown

Use `Progress` when:

- progress can be quantified

## Choose This Component When

- loading is indeterminate
- a compact indicator is enough
- the UI does not need to show a numeric or bar-like amount of completion

## Do Not Choose This Component When

- exact progress is known
- the UI needs more context than a small animated ring can provide
