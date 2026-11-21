'use client';

import { useCallback } from 'react';
import { createInput } from '@vega-ui/core';
import { CLOSE_TOAST } from '@vega-ui/widgets/toast';
import { createContext } from '../../../internals/context';
import { useToastRegionContext } from '../ToastRegionContext';

export interface ToastItemContextState {
  toastKey: string
  content: unknown
  index: number
}

export interface ToastContextState<Content> {
  /** The key the queue gave the toast. */
  key: string
  /** The content passed to `queue.add()`. */
  content: Content
  /** The place of the toast in the stack, 0 for the newest. */
  index: number
  /** Closes the toast, like a ToastClose. */
  close(): void
}

export const [ToastItemProvider, useToastItemContext] = createContext<ToastItemContextState>('ToastContext', {
  toastKey: '',
  content: undefined,
  index: 0,
})

export const useToastContext = <Content = unknown>(): ToastContextState<Content> => {
  const { handle } = useToastRegionContext()
  const { toastKey, content, index } = useToastItemContext()
  const close = useCallback(() => void handle.send(createInput(CLOSE_TOAST, { key: toastKey })), [handle, toastKey])

  return { key: toastKey, content: content as Content, index, close }
}
