---
"@vega-ui/hooks": patch
---

Fix crash paths and null/undefined confusion in `useScrollSnap`

`getPointed()` returns `undefined` when the scroller ref is not attached, but `measure()` dereferenced its result unconditionally (TypeError on mount when the scroller renders later, or when calling the public `measure()` too early), and `commit()` destructured it unconditionally (TypeError when the scroller leaves the DOM while a debounced commit is pending). With an empty scroller (no registered items) `onSnapChange`/`onSnapChanging` fired with `(undefined, undefined)` despite their `(el: HTMLElement, key: K)` signatures, and the `key !== null` guard in `commit` never worked because `key` was `K | undefined`, never `null`.

Now: `getPointed` normalizes misses to `null` and all callers guard against an absent scroller; snap callbacks only fire with a real element and key; `measure()` skips items whose snap point cannot be computed instead of storing `undefined` in the points map; `scrollToElement` no longer looks up points with an `undefined` key.
