export interface Controlled<T> {
  readonly kind: 'controlled'
  readonly fallback: T
  readonly initial?: (options: never) => T | undefined
}

export interface Internal<T> {
  readonly kind: 'internal'
  readonly fallback: T
}

export type Observed<T> =
  | { readonly kind: 'observed'; readonly part: string; readonly selector: string; readonly fallback: T }
  | { readonly kind: 'observed'; readonly read: (options: never) => T; readonly fallback: T }

export type Declared<T> = Controlled<T> | Internal<T> | Observed<T>

export const controlled = <T, O = never>(fallback: T, initial?: (options: O) => T | undefined): Controlled<T> => ({ kind: 'controlled', fallback, initial })

export const internal = <T>(fallback: T): Internal<T> => ({ kind: 'internal', fallback })

export const matching = (part: string, selector: string): Observed<boolean> => ({ kind: 'observed', part, selector, fallback: false })

export const reading = <O, T>(read: (options: O) => T, fallback: T): Observed<T> => ({ kind: 'observed', read, fallback })

export type ValueOf<D> = D extends Declared<infer T> ? T : never

export type Values<W> = { readonly [N in keyof W]: ValueOf<W[N]> }
