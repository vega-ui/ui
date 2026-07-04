---
"@vega-ui/hooks": patch
---

Fix inverted `useIsomorphicLayoutEffect`

The ternary picked `useLayoutEffect` on the server and `useEffect` in the browser — exactly backwards. On SSR this triggered React's "useLayoutEffect does nothing on the server" warning; in the browser, everything built on the hook (`useLatest`, and through it layout measurements in `useResize`/`useScrollSnap` consumers) ran after paint instead of before it, allowing a frame of stale layout.

Also renamed the file to fix the typo: `useIsomophicLayoutEffect.ts` → `useIsomorphicLayoutEffect.ts` (internal only — the exported name was always spelled correctly).
