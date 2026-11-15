export interface Collection<K> {
  readonly order: readonly K[]
  readonly index: ReadonlyMap<K, number>
  readonly disabled: ReadonlySet<K>
  readonly labels: ReadonlyMap<K, string>
}

export interface SourceSpec<Item, K> {
  key(item: Item): K
  disabled?(item: Item): boolean
  label?(item: Item): string
}

export interface Source<Item, K> {
  of(items: readonly Item[]): Collection<K>
}

const build = <Item, K>(items: readonly Item[], spec: SourceSpec<Item, K>): Collection<K> => {
  const order = items.map(spec.key)
  const index = new Map(order.map((key, position) => [key, position]))
  const disabled = new Set(items.filter((item) => spec.disabled?.(item)).map(spec.key))
  const labels = new Map(spec.label ? items.map((item) => [spec.key(item), spec.label!(item)] as const) : [])

  return { order, index, disabled, labels }
}

export const source = <Item, K>(spec: SourceSpec<Item, K>): Source<Item, K> => {
  const cache = new WeakMap<readonly Item[], Collection<K>>()

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

export const emptyCollection = <K>(): Collection<K> => ({ order: [], index: new Map(), disabled: new Set(), labels: new Map() })
