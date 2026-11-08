/**
 * Returns the first element inside `container` that Tab can reach: a link,
 * an enabled form control or button, an editable element, or an element with
 * a non-negative `tabindex`. Hidden and inert subtrees are skipped.
 */
export const findTabbable = (container: Element) => {
  const candidates = container.querySelectorAll<HTMLElement>(
    'a[href], button, input:not([type="hidden"]), select, textarea, [contenteditable]:not([contenteditable="false"]), [tabindex]',
  )

  for (const element of candidates) {
    if (element.tabIndex < 0) continue
    if (element.matches(':disabled')) continue
    if (element.closest('[hidden], [inert]')) continue

    return element
  }

  return null
}
