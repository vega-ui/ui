# @vega-ui/react-store

High-performance value state for React  
Designed for large, interactive UI components in Vega UI Kit

---

## Overview

`@vega-ui/react-store` is a minimal, low-level state management library for React, built for performance-critical UI components.

It provides a thin abstraction over `useSyncExternalStore` that enables:

- fine-grained updates
- tag-based subscriptions
- controlled / uncontrolled state without `useState`
- state sharing without React Context or Providers

The library is intended as **infrastructure**, not as a general application state manager.

---

## Why this library exists

React’s built-in state tools (`useState`, `useContext`) become inefficient when:

- thousands of components depend on the same value
- updates happen frequently (keyboard navigation, focus movement)
- only a small subset of components should update
- state must be shared across composition layers without mass re-renders

`@vega-ui/react-store` solves this by **decoupling state from React**.

> State lives outside React.  
> React only subscribes to it.

---

## Core concepts

### Store is not React state

State is stored in a plain object:

```ts
const store = new Store<T, Tag>(initialValue)
```

### Tag-based subscriptions

Each update can notify:

- all subscribers
- or only subscribers of specific tags

```ts
store.setValue(next, {
  notify: { tags: ['cell:2:3', 'cell:2:4'] }
})
```

This allows precise, minimal re-renders.

### No Context, no Provider (by default)

Stores can be:
- created with useStore
- passed via props
- shared freely across components

Context is optional and not required.

## Installation

```bash
pnpm add @vega-ui/react-store
```

## Basic usage

### Creating a store

```ts
import { useStore } from '@vega-ui/react-store'

const store = useStore<number>(0)

// Reading value
store.getValue()

// Updating
store.setValue(1)
```

### Hooks

#### useStoreValue

Subscribe to the entire store value.

```ts
const value = useStoreValue(store)
```

Re-renders on any store update.

#### useStoreSelector

Subscribe to a derived value.

```ts
const count = useStoreSelector(store, v => v.count)
```

Re-renders only if the selected value changes.

#### useStoreTagSelector

Subscribe to a specific tag.

```ts
const isActive = useStoreTagSelector(
  store,
  cellKey,
  active => active === cellKey
)
```

Re-renders only when that tag is notified.

### When to use

Use @vega-ui/react-store when:
- performance matters
- UI contains hundreds or thousands of nodes
- state updates are frequent
- Context causes mass re-renders
- you build a design system or UI kit

### When not to use

Do not use if:
- state is simple and local
- useState is sufficient
- there are no performance issues
