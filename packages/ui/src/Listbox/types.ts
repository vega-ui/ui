export type ListboxValue<V, M extends boolean> = M extends true ? V[] : V | null
