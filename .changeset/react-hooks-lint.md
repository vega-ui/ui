---
"@vega-ui/hooks": minor
"@vega-ui/react": patch
---

Enable `react-hooks` lint rules repo-wide; fix all stale-closure findings; add `useEventCallback`

`eslint-plugin-react-hooks` was installed but none of its rules were enabled — the class of bugs behind the recent Slider and Calendar stale closures was invisible to CI. `rules-of-hooks` and `exhaustive-deps` now run as errors (with `rules-of-hooks` off for Storybook CSF `render` functions, which are false positives).

- new `@vega-ui/hooks` export: `useEventCallback` — a stable-identity wrapper that always calls the latest handler (the industry "latest ref" pattern à la MUI/Radix/Floating UI), throws in development if called during render
- `useScrollSnap`: `onSnapChanging`/`onSnapChange`/`getSnapPoint` go through `useEventCallback`, so inline consumer callbacks no longer resubscribe the `scrollend` listener and observers on every render; the remaining deps are honest
- `Calendar`: `onSelectDay` no longer freezes the first `onChange` — it reads the latest callback through `useEventCallback` while keeping a stable identity (regression-tested by swapping `onChange` between renders)
- `NumberField`: `decrement` no longer clamps against a stale `max`; the native non-passive `wheel` listener is attached only while `changeOnWheel` is enabled and no longer resubscribes when `min`/`max`/`step` or the value change
- `useSelection`: a consumer-provided `resolveRange` no longer cascades identity changes into `select`/`expand`/`toggle`
- `Collapsible`: `onChangeHidden` fires only when `hidden` actually changes — an inline callback no longer re-triggers the notification effect on every parent render
- all remaining findings were stable-value dependencies added for free, plus three documented intentional suppressions (`useMutationObserver` per-field options deps, `createContext` shallow-by-value memoization, `SnapScrollerContent` unmount-only unregistration)
