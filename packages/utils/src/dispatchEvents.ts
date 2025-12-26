interface DispatchOptions {
  bubbles?: boolean;
}

export const dispatchEvents = (input: HTMLInputElement, options?: DispatchOptions) => {
  const bubbles = options?.bubbles ?? true;
  input.dispatchEvent(new InputEvent('input', { bubbles, composed: true }));
  input.dispatchEvent(new Event('change', { bubbles }));
}