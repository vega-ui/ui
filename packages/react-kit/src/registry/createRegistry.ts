export interface RegistryItem {
  id: string
  element: HTMLElement
}

export interface Registry<T extends RegistryItem> {
  register(item: T): () => void
  getItem(id: string): T | undefined
  getItems(): T[]
}

export const createRegistry = <T extends RegistryItem>(): Registry<T> => {
  const items = new Map<string, T>()

  return {
    register(item) {
      items.set(item.id, item)

      return () => {
        items.delete(item.id)
      }
    },
    getItem: (id) => items.get(id),
    getItems() {
      return [...items.values()].sort((a, b) => {
        return a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
      })
    },
  }
}
