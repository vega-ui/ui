export type Side = 'top' | 'right' | 'bottom' | 'left'

export type Placement = Side | `${Side}-start` | `${Side}-end`

export const anchorNameOf = (id: string) => `--anchor-${id.replace(/\W/g, '')}`
