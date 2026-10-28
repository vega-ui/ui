---
"@vega-ui/hooks": major
---

- New `useInputValue(ref, onValue)`: calls the latest `onValue` when the text of the input changes — checked after every render, so a controlled `value` set outside or a rejected keystroke is seen, on a form reset, and from the returned handler, which goes to the `onInput` of the input. The copy is updated inside React's event handling, so a controlled input keeps every keystroke.
- **Breaking:** `useIsomorphicLayoutEffect` is removed; use `useLayoutEffect`, which React 19 runs without a warning on the server.
