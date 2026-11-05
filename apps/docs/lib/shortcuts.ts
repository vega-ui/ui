const isTyping = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;

  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
};

export const isPageShortcut = (event: KeyboardEvent) => {
  if (event.defaultPrevented) return false;
  if (event.metaKey || event.ctrlKey || event.altKey) return false;
  if (isTyping(event.target)) return false;

  return !document.querySelector('dialog[open], :popover-open');
};
