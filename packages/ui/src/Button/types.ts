export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {})

export type ButtonName = { 'aria-label': string } | { 'aria-labelledby': string }

export type ButtonShape = {
  /**
   * Makes the button a square as wide as it is high, for a single icon. Name it with `aria-label` or `aria-labelledby`.
   */
  square?: false
} | ({
  /**
   * Makes the button a square as wide as it is high, for a single icon. Name it with `aria-label` or `aria-labelledby`.
   */
  square: true
} & ButtonName) | {
  /**
   * Makes the button a square as wide as it is high, for a single icon. With `asChild`, name the child element.
   */
  square: true
  asChild: true
}
