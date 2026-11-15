export type ListboxValue<Value, Multiple extends boolean> = Multiple extends true ? Value[] : Value | null
