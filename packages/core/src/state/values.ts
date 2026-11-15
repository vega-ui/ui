export interface Controlled<Value> {
  readonly kind: 'controlled'
  readonly fallback: Value
  readonly initial?: (options: never) => Value | undefined
}

export interface Internal<Value> {
  readonly kind: 'internal'
  readonly fallback: Value
}

export type Observed<Value> =
  | { readonly kind: 'observed'; readonly part: string; readonly selector: string; readonly fallback: Value }
  | { readonly kind: 'observed'; readonly read: (options: never) => Value; readonly fallback: Value }

export type Declared<Value> = Controlled<Value> | Internal<Value> | Observed<Value>

export const controlled = <Value, OptionValues = never>(fallback: Value, initial?: (options: OptionValues) => Value | undefined): Controlled<Value> => ({ kind: 'controlled', fallback, initial })

export const internal = <Value>(fallback: Value): Internal<Value> => ({ kind: 'internal', fallback })

export const matching = (part: string, selector: string): Observed<boolean> => ({ kind: 'observed', part, selector, fallback: false })

export const reading = <OptionValues, Value>(read: (options: OptionValues) => Value, fallback: Value): Observed<Value> => ({ kind: 'observed', read, fallback })

export type ValueOf<Declaration> = Declaration extends Declared<infer Value> ? Value : never

export type Values<Owned> = { readonly [Name in keyof Owned]: ValueOf<Owned[Name]> }
