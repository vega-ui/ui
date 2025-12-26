export interface SelectNativeOption<V> {
  value: V
  disabled?: boolean
  label: string
  index: number
}

export type SelectSize = 'sm' | 'md' | 'lg' | string
export type SelectVariant = 'inline' | 'field' | string