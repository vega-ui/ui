export const createKeyMatcher = <Key>(match?: Key | Key[] | ((key: Key) => boolean)): (key: Key) => boolean => {
  if (match === undefined) return () => false
  if (typeof match === 'function') return match as (key: Key) => boolean
  if (!Array.isArray(match)) return (key) => key === match

  const keys = new Set(match)

  return (key) => keys.has(key)
}
