---
'@vega-ui/react': major
'@vega-ui/icons': patch
---

**`Heading` whitespace.** BREAKING: `Heading` no longer sets `white-space: pre-line` and collapses whitespace like a native heading, as `Text` does. Set `whiteSpace: 'pre-line'` where a newline in the string must break the line.

**Indeterminate `Progress`.** An indeterminate `Progress` leaves out `aria-valuenow`, also when it gets a `value`, so a screen reader does not announce a number for work whose amount is unknown.

**Flag references.** `FlagCC`, `FlagCI`, `FlagHR`, `FlagKP`, `FlagKR`, `FlagNZ`, `FlagVG` and `FlagVI` no longer carry `mask` references to masks they do not contain. The browsers ignored them, so the flags look the same.
