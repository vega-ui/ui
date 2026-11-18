import { createInput, Input, InputSpec, key, nav, payloadOf } from './spec'

export type Orientation = 'horizontal' | 'vertical' | 'grid'

export interface Direction {
  readonly orientation: Orientation
  readonly rtl: boolean
  readonly cross?: boolean
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

const acrossAxis = (input: Input<unknown>, { orientation, rtl }: Direction) => {
  if (orientation === 'horizontal') {
    if (input.name === key.arrowDown.name) return nav.crossForward
    if (input.name === key.arrowUp.name) return nav.crossBackward
    return undefined
  }

  const along = inline(input, rtl)
  if (along === nav.forward) return nav.crossForward
  if (along === nav.backward) return nav.crossBackward
  return undefined
}

const crossing = (input: Input<unknown>, direction: Direction) => {
  if (!direction.cross || direction.orientation === 'grid') return undefined

  return acrossAxis(input, direction)
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

  const target = alongAxis(input, direction) ?? crossing(input, direction) ?? edges(input)
  if (!target) return input

  return createInput({ type: target.type, name: target.name, mods: input.mods }, payloadOf(input))
}

export const readsCrossAxis = (listens: readonly InputSpec[]) => listens.some((spec) => spec.type === 'nav' && (spec.name === nav.crossForward.name || spec.name === nav.crossBackward.name))

export const normalizationsOf = <Key>(input: Input<Key>, orientation: Orientation, cross = false): readonly [Input<Key>, Input<Key>] => [
  toNav(input, { orientation, rtl: false, cross }),
  toNav(input, { orientation, rtl: true, cross }),
]

export const readsDirection = (input: Input<unknown>, orientation: Orientation, cross = false) => {
  const [leftToRight, rightToLeft] = normalizationsOf(input, orientation, cross)

  return leftToRight.name !== rightToLeft.name
}
