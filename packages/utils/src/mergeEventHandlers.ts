export const mergeEventHandlers = <EventType>(
  ...handlers: (((event: EventType) => void) | undefined)[]
): (event: EventType) => void => {
  return (event: EventType) => {
    for (const handler of handlers) {
      if (typeof handler === 'function') {
        handler(event)
      }
    }
  }
}
