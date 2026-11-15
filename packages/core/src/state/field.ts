export interface Reader<State, Value> {
  get(state: State): Value
}

export interface Field<State, Value> extends Reader<State, Value> {
  readonly name: string
  set(state: State, value: Value): State
}

export const field = <State extends object, Value>(name: string): Field<State, Value> => ({
  name,
  get: (state) => (state as Record<string, Value>)[name],
  set: (state, value) => (Object.is((state as Record<string, Value>)[name], value) ? state : { ...state, [name]: value }),
})

export interface OwnedField<State, Value> extends Field<State, Value> {
  controlled(state: State): boolean
}

export const ownedField = <State extends { options: object }, Value>(name: string): OwnedField<State, Value> => ({
  ...field<State, Value>(name),
  controlled: (state) => (state.options as Record<string, unknown>)[name] !== undefined,
})

export const optionReader = <State extends { options: object }, Value>(name: string): Reader<State, Value> => ({
  get: (state) => (state.options as Record<string, Value>)[name],
})
