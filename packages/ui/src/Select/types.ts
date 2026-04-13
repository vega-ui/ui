export interface SelectNativeOption<V> {
  value: V
  disabled?: boolean
  label: string
  index: number
}

export type SelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
export type SelectVariant = 'inline' | 'field' | string