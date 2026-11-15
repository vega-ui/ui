export interface Collection<Key> {
  readonly order: readonly Key[]
  readonly index: ReadonlyMap<Key, number>
  readonly disabled: ReadonlySet<Key>
  readonly labels: ReadonlyMap<Key, string>
}

export interface SourceSpec<Item, Key> {
  key(item: Item): Key
  disabled?(item: Item): boolean
  label?(item: Item): string
}

export interface Source<Item, Key> {
  of(items: readonly Item[]): Collection<Key>
}

const build = <Item, Key>(items: readonly Item[], spec: SourceSpec<Item, Key>): Collection<Key> => {
  const order = items.map(spec.key)
  const index = new Map(order.map((key, position) => [key, position]))
  const disabled = new Set(items.filter((item) => spec.disabled?.(item)).map(spec.key))
  const labels = new Map(spec.label ? items.map((item) => [spec.key(item), spec.label!(item)] as const) : [])

  return { order, index, disabled, labels }
}

export const source = <Item, Key>(spec: SourceSpec<Item, Key>): Source<Item, Key> => {
  const cache = new WeakMap<readonly Item[], Collection<Key>>()

  return {
    of(items) {
      const cached = cache.get(items)
      if (cached) return cached

      const collection = build(items, spec)
      cache.set(items, collection)

      return collection
    },
  }
}

export const emptyCollection = <Key>(): Collection<Key> => ({ order: [], index: new Map(), disabled: new Set(), labels: new Map() })
