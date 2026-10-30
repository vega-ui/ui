export const togglePopover = (element: HTMLElement | null, force: boolean) => {
  if (typeof element?.togglePopover !== 'function') return

  element.togglePopover(force)
}
