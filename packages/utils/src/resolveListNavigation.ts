import { clamp } from './clamp'
import { findEnabledIndex } from './findEnabledIndex'

export const resolveListNavigation = (
  key: string,
  items: ReadonlyArray<{ disabled?: boolean }>,
  activeIndex: number | null,
) => {
  const pageSize = 10
  const last = items.length - 1

  if (key === 'ArrowDown') return findEnabledIndex(items, activeIndex === null ? 0 : activeIndex + 1, 1)
  if (key === 'ArrowUp') return findEnabledIndex(items, activeIndex === null ? last : activeIndex - 1, -1)
  if (key === 'Home') return findEnabledIndex(items, 0, 1)
  if (key === 'End') return findEnabledIndex(items, last, -1)

  if (key === 'PageDown') {
    const target = clamp(0, (activeIndex ?? -1) + pageSize, last)
    const next = findEnabledIndex(items, target, 1)

    return next === -1 ? findEnabledIndex(items, target, -1) : next
  }

  if (key === 'PageUp') {
    const target = clamp(0, (activeIndex ?? items.length) - pageSize, last)
    const next = findEnabledIndex(items, target, -1)

    return next === -1 ? findEnabledIndex(items, target, 1) : next
  }

  return null
}
