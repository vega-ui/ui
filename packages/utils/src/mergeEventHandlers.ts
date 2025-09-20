import { EventHandler, SyntheticEvent } from 'react';

export const mergeEventHandlers = <E extends SyntheticEvent>(
  ...handlers: (EventHandler<E> | undefined)[]
): EventHandler<E> => {
  return (event: E) => {
    for (const handler of handlers) {
      if (typeof handler === 'function') {
        handler(event)
      }
    }
  }
}