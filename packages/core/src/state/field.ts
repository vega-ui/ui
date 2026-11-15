export interface Reader<S, T> {
  get(state: S): T
}

export interface Field<S, T> extends Reader<S, T> {
  readonly name: string
  set(state: S, value: T): S
}

export const field = <S extends object, T>(name: string): Field<S, T> => ({
  name,
  get: (state) => (state as Record<string, T>)[name],
  set: (state, value) => (Object.is((state as Record<string, T>)[name], value) ? state : { ...state, [name]: value }),
})

export interface OwnedField<S, T> extends Field<S, T> {
  controlled(state: S): boolean
}

export const ownedField = <S extends { options: object }, T>(name: string): OwnedField<S, T> => ({
  ...field<S, T>(name),
  controlled: (state) => (state.options as Record<string, unknown>)[name] !== undefined,
})

export const optionReader = <S extends { options: object }, T>(name: string): Reader<S, T> => ({
  get: (state) => (state.options as Record<string, T>)[name],
})
