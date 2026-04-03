# Label Comparison

## Quick Decision Rule

Use `Label` for form control labeling. Use `Text` or `Heading` for copy that does not name an input.

## `Label` vs `Text`

Use `Label` when:

- the text names a form control

Use `Text` when:

- the content is body copy, helper text, or static content

## `Label` vs `Heading`

Use `Label` when:

- the text names one control

Use `Heading` when:

- the text defines section or page structure

## `Label` vs `FieldsetLegend`

Use `Label` when:

- one field needs a visible semantic label

Use `FieldsetLegend` when:

- a group of related controls needs one shared semantic label

## Choose This Component When

- one field needs a visible semantic label
- native label click behavior matters
- the naming text should remain tightly coupled to one control

## Do Not Choose This Component When

- the content is a heading or paragraph
- you need to label a whole group rather than one control
