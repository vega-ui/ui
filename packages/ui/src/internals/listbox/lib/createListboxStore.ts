import { createRegistry, Registry, RegistryItem } from '@vega-ui/react-kit/registry'
import { createStore, Store } from '@vega-ui/react-kit/store'

export type ListboxActiveSource = 'keyboard' | 'pointer' | 'auto'

export interface ListboxItemData {
  value: string | number
  disabled?: boolean
  label?: string
}

export type ListboxItem = RegistryItem & ListboxItemData

export interface ListboxState {
  activeId?: string
  activeSource?: ListboxActiveSource
}

export interface ListboxStore extends Store<ListboxState>, Registry<ListboxItem> {
  setActive(id: string | undefined, source?: ListboxActiveSource): void
}

export const createListboxStore = (): ListboxStore => {
  const store = createStore<ListboxState>({})
  const registry = createRegistry<ListboxItem>()

  return {
    ...store,
    ...registry,
    setActive(id, source = 'auto') {
      store.set({ activeId: id, activeSource: source })
    },
    register(item) {
      const unregister = registry.register(item)

      return () => {
        unregister()
        if (item.id === store.get().activeId) store.set({ activeId: undefined })
      }
    },
  }
}
