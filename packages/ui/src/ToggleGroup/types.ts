export type ToggleGroupValue<Multiple extends boolean = false> = Multiple extends true ? string[] : string
