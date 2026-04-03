# Review Checklist

## Highest Priority Findings

- invented public API
- stale prop names or types
- wrong required composition
- missing required parts in anatomy
- placeholder or pseudo-code snippets

## Medium Priority Findings

- examples too weak to teach correct usage
- misleading minimal composition
- styling guidance that implies unsupported hooks
- troubleshooting that misses likely integration failure

## Lower Priority Findings

- wording that is vague but still technically correct
- examples that are valid but could be stronger

## Always Check

- source exports
- stories
- tests for edge behavior
- doc profile completeness

## Search Patterns

- `rg -n "\\{\\/\\*.*\\*\\/\\}|TODO|same .* composition" docs/components/<component>`
- `rg -n "<[A-Z][A-Za-z0-9]+\\s*/>" docs/components/<component>`
