import { Collection } from './collection'

export const has = <Key>(collection: Collection<Key>, key: Key | null | undefined): key is Key => key != null && collection.index.has(key)

export const isNavigable = <Key>(collection: Collection<Key>, key: Key) => collection.index.has(key) && !collection.disabled.has(key)

const scan = <Key>(collection: Collection<Key>, from: number, direction: 1 | -1): Key | null => {
  for (let position = from; position >= 0 && position < collection.order.length; position += direction) {
    const key = collection.order[position]
    if (!collection.disabled.has(key)) return key
  }

  return null
}

export const first = <Key>(collection: Collection<Key>) => scan(collection, 0, 1)

export const last = <Key>(collection: Collection<Key>) => scan(collection, collection.order.length - 1, -1)

export const next = <Key>(collection: Collection<Key>, from: Key | null): Key | null => {
  if (!has(collection, from)) return first(collection)

  return scan(collection, collection.index.get(from)! + 1, 1)
}

export const previous = <Key>(collection: Collection<Key>, from: Key | null): Key | null => {
  if (!has(collection, from)) return last(collection)

  return scan(collection, collection.index.get(from)! - 1, -1)
}

export const nearest = <Key>(collection: Collection<Key>, position: number): Key | null => {
  const clamped = Math.min(Math.max(position, 0), collection.order.length - 1)

  return scan(collection, clamped, 1) ?? scan(collection, clamped, -1)
}

export const between = <Key>(collection: Collection<Key>, from: Key, to: Key): Key[] => {
  const start = collection.index.get(from)
  const end = collection.index.get(to)
  if (start === undefined || end === undefined) return []

  return collection.order.slice(Math.min(start, end), Math.max(start, end) + 1).filter((key) => !collection.disabled.has(key))
}

export const selectable = <Key>(collection: Collection<Key>): Key[] => collection.order.filter((key) => !collection.disabled.has(key))

export const findByLabel = <Key>(collection: Collection<Key>, text: string, from: Key | null, inclusive = false): Key | null => {
  const needle = text.toLowerCase()
  const start = has(collection, from) ? collection.index.get(from)! + (inclusive ? 0 : 1) : 0

  for (let offset = 0; offset < collection.order.length; offset++) {
    const key = collection.order[(start + offset) % collection.order.length]
    if (collection.disabled.has(key)) continue
    if (collection.labels.get(key)?.toLowerCase().startsWith(needle)) return key
  }

  return null
}
