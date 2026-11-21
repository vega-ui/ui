export interface QueuedToast<Content = unknown> {
  readonly key: string
  readonly content: Content
  readonly timeout: number | undefined
}

export interface ToastOptions {
  readonly timeout?: number
}

export interface ToastQueue<Content> {
  readonly toasts: readonly QueuedToast<Content>[]
  add(content: Content, options?: ToastOptions): string
  close(key: string): void
  subscribe(listener: () => void): () => void
}

export const createToastQueue = <Content>(): ToastQueue<Content> => {
  let toasts: readonly QueuedToast<Content>[] = []
  let added = 0
  const listeners = new Set<() => void>()

  const notify = () => {
    for (const listener of listeners) listener()
  }

  return {
    get toasts() {
      return toasts
    },

    add(content, options = {}) {
      added++
      const key = `toast-${added}`
      toasts = [{ key, content, timeout: options.timeout }, ...toasts]
      notify()

      return key
    },

    close(key) {
      if (!toasts.some((toast) => toast.key === key)) return

      toasts = toasts.filter((toast) => toast.key !== key)
      notify()
    },

    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
