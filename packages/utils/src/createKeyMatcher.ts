export const createKeyMatcher = <K>(match?: K | K[] | ((key: K) => boolean)): (key: K) => boolean => {
  if (match === undefined) return () => false
  if (typeof match === 'function') return match as (key: K) => boolean
  if (!Array.isArray(match)) return (key) => key === match

  const keys = new Set(match)

  return (key) => keys.has(key)
}
