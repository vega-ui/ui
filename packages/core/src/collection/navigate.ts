import { Collection } from './collection'

export const has = <K>(collection: Collection<K>, key: K | null | undefined): key is K => key != null && collection.index.has(key)

export const isNavigable = <K>(collection: Collection<K>, key: K) => collection.index.has(key) && !collection.disabled.has(key)

const scan = <K>(collection: Collection<K>, from: number, direction: 1 | -1): K | null => {
  for (let position = from; position >= 0 && position < collection.order.length; position += direction) {
    const key = collection.order[position]
    if (!collection.disabled.has(key)) return key
  }

  return null
}

export const first = <K>(collection: Collection<K>) => scan(collection, 0, 1)

export const last = <K>(collection: Collection<K>) => scan(collection, collection.order.length - 1, -1)

export const next = <K>(collection: Collection<K>, from: K | null): K | null => {
  if (!has(collection, from)) return first(collection)

  return scan(collection, collection.index.get(from)! + 1, 1)
}

export const previous = <K>(collection: Collection<K>, from: K | null): K | null => {
  if (!has(collection, from)) return last(collection)

  return scan(collection, collection.index.get(from)! - 1, -1)
}

export const nearest = <K>(collection: Collection<K>, position: number): K | null => {
  const clamped = Math.min(Math.max(position, 0), collection.order.length - 1)

  return scan(collection, clamped, 1) ?? scan(collection, clamped, -1)
}

export const between = <K>(collection: Collection<K>, from: K, to: K): K[] => {
  const start = collection.index.get(from)
  const end = collection.index.get(to)
  if (start === undefined || end === undefined) return []

  return collection.order.slice(Math.min(start, end), Math.max(start, end) + 1).filter((key) => !collection.disabled.has(key))
}

export const selectable = <K>(collection: Collection<K>): K[] => collection.order.filter((key) => !collection.disabled.has(key))

export const findByLabel = <K>(collection: Collection<K>, text: string, from: K | null, inclusive = false): K | null => {
  const needle = text.toLowerCase()
  const start = has(collection, from) ? collection.index.get(from)! + (inclusive ? 0 : 1) : 0

  for (let offset = 0; offset < collection.order.length; offset++) {
    const key = collection.order[(start + offset) % collection.order.length]
    if (collection.disabled.has(key)) continue
    if (collection.labels.get(key)?.toLowerCase().startsWith(needle)) return key
  }

  return null
}
