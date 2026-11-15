import { Part } from '../output'
import { Bound, Elements } from './connect'

export interface Entry<K, D> {
  readonly key: K
  readonly data: D
}

interface Registered<K, D> extends Entry<K, D> {
  readonly element: Element
}

export interface ElementRegistry<K, D = undefined> extends Elements<K> {
  setRoot(element: Element | null, name?: string, output?: Part<unknown, K>): void
  setPart(name: string, element: Element | null, output?: Part<unknown, K>): void
  setItem(key: K, element: Element | null, data?: D, output?: Part<unknown, K>): () => void
  entries(): readonly Entry<K, D>[]
  within(container: Element): K[]
  readonly version: number
  subscribe(listener: () => void): () => void
}

const byPosition = <K, D>(first: Registered<K, D>, second: Registered<K, D>) => {
  if (first.element === second.element) return 0
  return first.element.compareDocumentPosition(second.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
}

const registries = new WeakMap<Element, Elements<unknown>>()

export const registryOf = (root: Element): Elements<unknown> | undefined => registries.get(root)

export const ROOT = 'root'

export const createElements = <K, D = undefined>(): ElementRegistry<K, D> => {
  const roots = new Map<string, Element>()
  let version = 0
  let ordered: readonly Entry<K, D>[] | null = []
  const parts = new Map<string, Element>()
  const names = new Map<Element, string>()
  const items = new Map<K, Registered<K, D>>()
  const keys = new Map<Element, K>()
  const bindings = new Map<Element, Bound<K>>()
  const listeners = new Set<() => void>()
  const rootListeners = new Set<() => void>()

  const notify = () => {
    version++
    for (const listener of listeners) listener()
  }

  const changed = () => {
    ordered = null
    notify()
  }

  const sorted = () => [...items.values()].sort(byPosition).map(({ key, data }) => ({ key, data }))

  const holdsItem = (node: Node) => {
    if (!(node instanceof Element)) return false
    if (keys.has(node)) return true

    for (const entry of items.values()) {
      if (node.contains(entry.element)) return true
    }

    return false
  }

  const touchesItems = (records: MutationRecord[]) => records.some((record) => [...record.addedNodes, ...record.removedNodes].some(holdsItem))

  const reorder = () => {
    const current = ordered
    if (!current) return

    const next = sorted()
    if (next.length === current.length && next.every((entry, position) => entry.key === current[position].key && entry.data === current[position].data)) return

    ordered = next
    notify()
  }

  const observer = typeof MutationObserver === 'undefined' ? null : new MutationObserver((records) => {
    if (touchesItems(records)) reorder()
  })

  const bind = (element: Element, key: K | undefined, output: Part<unknown, K> | undefined) => {
    if (output) bindings.set(element, { element, key, output })
  }

  const remove = (key: K) => {
    const previous = items.get(key)
    if (!previous) return

    items.delete(key)
    keys.delete(previous.element)
    bindings.delete(previous.element)
  }

  const setPart = (name: string, element: Element | null, output?: Part<unknown, K>) => {
    const previous = parts.get(name)
    if (previous) {
      names.delete(previous)
      bindings.delete(previous)
    }

    if (element) {
      parts.set(name, element)
      names.set(element, name)
      bind(element, undefined, output)
    } else {
      parts.delete(name)
    }
  }

  const registry: ElementRegistry<K, D> = {
    rootOf(node) {
      let nearest: Element | undefined
      for (const root of roots.values()) {
        if (!root.contains(node)) continue
        if (!nearest || nearest.contains(root)) nearest = root
      }

      return nearest
    },

    part: (name) => parts.get(name) ?? null,
    item: (key) => items.get(key)?.element ?? null,
    keyOf: (element) => keys.get(element),
    bound: () => bindings.values(),
    partOf: (element) => names.get(element),
    roots: () => roots.values(),

    watchRoots(listener) {
      rootListeners.add(listener)
      return () => rootListeners.delete(listener)
    },

    get version() {
      return version
    },

    entries() {
      if (!ordered) ordered = sorted()
      return ordered
    },

    within(container) {
      return registry.entries().filter((entry) => container.contains(items.get(entry.key)?.element ?? null)).map((entry) => entry.key)
    },

    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },

    setRoot(element, name = ROOT, output) {
      const previous = roots.get(name) ?? null
      if (element === previous) return
      if (observer && touchesItems(observer.takeRecords())) reorder()

      if (previous && registries.get(previous) === registry) registries.delete(previous)
      if (element) roots.set(name, element)
      else roots.delete(name)
      setPart(name, element, output)
      if (element) registries.set(element, registry)

      observer?.disconnect()
      for (const root of roots.values()) observer?.observe(root, { childList: true, subtree: true })
      for (const listener of rootListeners) listener()
    },

    setPart,

    setItem(key, element, data, output) {
      const previous = items.get(key)
      const unregister = () => {
        if (items.get(key)?.element !== element) return
        remove(key)
        changed()
      }

      if (previous && previous.element === element && previous.data === data && bindings.get(element)?.output === output) return unregister

      remove(key)

      if (element) {
        items.set(key, { key, element, data: data as D })
        keys.set(element, key)
        bind(element, key, output)
      }

      changed()

      return unregister
    },
  }

  return registry
}
