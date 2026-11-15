import { browser, defineWidget, internal, keep, lifecycle, listening, state, Step } from '@vega-ui/core'

export enum ImageStatus {
  INITIAL = 'initial',
  ERROR = 'error',
  LOADED = 'loaded'
}

export const avatarImageShape = state({
  options: { src: undefined as string | undefined, fallbackSrc: undefined as string | undefined },
  owns: {},
  follows: ['src'],
  internal: { status: internal(ImageStatus.INITIAL), failed: internal(false) },
})

type AvatarImageSnapshot = typeof avatarImageShape.__snapshot

const loading = listening<AvatarImageSnapshot>([browser.load, browser.error], (state, input) => {
  if (input.is(browser.load)) return keep(avatarImageShape.status.set(state, ImageStatus.LOADED))
  if (!input.is(browser.error)) return undefined

  return keep(avatarImageShape.failed.set(avatarImageShape.status.set(state, ImageStatus.ERROR), true))
})

const following: Step<AvatarImageSnapshot> = (state, input) => {
  if (!input.is(lifecycle.options)) return undefined

  return keep(avatarImageShape.failed.set(avatarImageShape.status.set(state, ImageStatus.INITIAL), false))
}

export const avatarImageWidget = defineWidget({
  state: avatarImageShape,

  step: [loading, following],

  output: {
    root: avatarImageShape.part(
      (state) => [state.status, state.failed, state.options.src, state.options.fallbackSrc] as const,
      ([status, failed, src, fallbackSrc]) => ({ 'data-status': status, src: failed && fallbackSrc !== undefined ? fallbackSrc : src }),
    ),
  },
})
