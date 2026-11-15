export const mergeEventHandlers = <E>(
  ...handlers: (((event: E) => void) | undefined)[]
): (event: E) => void => {
  return (event: E) => {
    for (const handler of handlers) {
      if (typeof handler === 'function') {
        handler(event)
      }
    }
  }
}
