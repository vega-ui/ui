/**
 * Returns the closest element from `element` up to, but not including,
 * `boundary` that scrolls vertically and has content to scroll.
 */
export const findScrollableAncestor = (element: Element | null, boundary: Element): HTMLElement | null => {
  let node = element

  while (node && node !== boundary) {
    if (node instanceof HTMLElement && node.scrollHeight > node.clientHeight) {
      const { overflowY } = getComputedStyle(node)
      if (overflowY === 'auto' || overflowY === 'scroll') return node
    }

    node = node.parentElement
  }

  return null
}
