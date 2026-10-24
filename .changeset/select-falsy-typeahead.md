---
"@vega-ui/react": patch
---

Fix Select typeahead skipping options with falsy values

`onMatch` (typeahead selection while the listbox is closed) guarded the matched value with `if (!value) return`, so options whose value is `0` or an empty string could be highlighted but never actually selected — common with numeric IDs. The guard now checks for `undefined` (a missing map entry) only. Covered with a regression test that selects a `value={0}` option by typing.
