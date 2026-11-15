import { createInput, Input, key, nav, payloadOf } from './spec'

export type Orientation = 'horizontal' | 'vertical' | 'grid'

export interface Direction {
  readonly orientation: Orientation
  readonly rtl: boolean
}

const inline = (input: Input<unknown>, rtl: boolean) => {
  const forward = rtl ? key.arrowLeft.name : key.arrowRight.name
  const backward = rtl ? key.arrowRight.name : key.arrowLeft.name

  if (input.name === forward) return nav.forward
  if (input.name === backward) return nav.backward
  return undefined
}

const alongAxis = (input: Input<unknown>, { orientation, rtl }: Direction) => {
  if (orientation === 'horizontal') return inline(input, rtl)
  if (input.name === key.arrowDown.name) return orientation === 'grid' ? nav.down : nav.forward
  if (input.name === key.arrowUp.name) return orientation === 'grid' ? nav.up : nav.backward
  if (orientation === 'grid') return inline(input, rtl)

  return undefined
}

const edges = (input: Input<unknown>) => {
  if (input.name === key.home.name) return nav.first
  if (input.name === key.end.name) return nav.last
  if (input.name === key.pageDown.name) return nav.pageForward
  if (input.name === key.pageUp.name) return nav.pageBackward
  return undefined
}

export const toNav = <Key>(input: Input<Key>, direction: Direction): Input<Key> => {
  if (input.type !== 'key') return input

  const target = alongAxis(input, direction) ?? edges(input)
  if (!target) return input

  return createInput({ type: target.type, name: target.name, mods: input.mods }, payloadOf(input))
}

export const normalizationsOf = <Key>(input: Input<Key>, orientation: Orientation): readonly [Input<Key>, Input<Key>] => [
  toNav(input, { orientation, rtl: false }),
  toNav(input, { orientation, rtl: true }),
]

export const readsDirection = (input: Input<unknown>, orientation: Orientation) => {
  const [leftToRight, rightToLeft] = normalizationsOf(input, orientation)

  return leftToRight.name !== rightToLeft.name
}
