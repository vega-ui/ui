/**
 * Returns whether a press is meant for text rather than a gesture: it lands in
 * a form field or editable content, or text is selected on the page.
 */
export const isTextInteraction = (target: EventTarget | null) => {
  if (target instanceof Element && target.closest('input, textarea, select, [contenteditable]')) return true

  return Boolean(window.getSelection()?.toString())
}
