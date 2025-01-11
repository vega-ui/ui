export interface DefaultDrawerContext {
  open: boolean
  onChangeOpen: (value: boolean) => void
}

export const defaultDrawerContext: DefaultDrawerContext = {
  open: false,
  onChangeOpen: () => undefined,
}