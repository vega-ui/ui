---
"@vega-ui/react-kit": minor
---

New package `@vega-ui/react-kit` replaces `@vega-ui/react-context` and holds the React utils that Vega UI components are built with. Each part has its own entry point and there is no root import:

- `@vega-ui/react-kit/context`: `createContext` moved here unchanged from `@vega-ui/react-context`, which is no longer published
- `@vega-ui/react-kit/store`: `createStore` keeps state outside React and `useStore` reads a slice of it with `useSyncExternalStore`, so a component re-renders only when its slice changes. The selector returns a primitive or a stable reference: slices are compared with `Object.is`
- `@vega-ui/react-kit/registry`: `createRegistry` keeps items registered by id and returns them in DOM order, and `useRegistryItem` registers an element once per id and keeps its data fresh on every render without registering it again
