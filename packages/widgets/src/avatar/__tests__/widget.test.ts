import { describe, expect, it } from 'vitest'
import { browser, lifecycle } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { avatarImageWidget, ImageStatus } from '../widget'

const simulateImage = (src: string | undefined = 'a.png', fallbackSrc?: string) => simulate(avatarImageWidget, { src, fallbackSrc }).send(lifecycle.connect)

const rootOf = (state: ReturnType<typeof simulateImage>['state']) => avatarImageWidget.output.root.render(avatarImageWidget.output.root.select(state, undefined as never))

describe('Critical User Paths', () => {
  it('shows the image once it loads', () => {
    const avatar = simulateImage()
    expect(avatar.state.status).toBe(ImageStatus.INITIAL)

    avatar.send(browser.load)
    expect(avatar.state.status).toBe(ImageStatus.LOADED)
    expect(avatar.state.failed).toBe(false)
  })

  it('marks a failed image and keeps it failed while its fallback loads', () => {
    const avatar = simulateImage()

    avatar.send(browser.error)
    expect(avatar.state.status).toBe(ImageStatus.ERROR)
    expect(avatar.state.failed).toBe(true)

    avatar.send(browser.load)
    expect(avatar.state.status).toBe(ImageStatus.LOADED)
    expect(avatar.state.failed).toBe(true)
  })
  it('swaps a failed image for the fallback and keeps the failed source without one', () => {
    const withFallback = simulateImage('a.png', 'b.png')
    expect(rootOf(withFallback.state)).toEqual({ 'data-status': ImageStatus.INITIAL, src: 'a.png' })

    withFallback.send(browser.error)
    expect(rootOf(withFallback.state)).toEqual({ 'data-status': ImageStatus.ERROR, src: 'b.png' })

    expect(rootOf(simulateImage('a.png').send(browser.error).state)).toEqual({ 'data-status': ImageStatus.ERROR, src: 'a.png' })
  })
})

describe('Edge Cases', () => {
  it('starts over with a new source and keeps the state for the same one', () => {
    const avatar = simulateImage()

    avatar.send(browser.error).setOptions({ src: 'a.png', fallbackSrc: undefined })
    expect(avatar.state.failed).toBe(true)

    avatar.setOptions({ src: 'b.png', fallbackSrc: undefined })
    expect(avatar.state.status).toBe(ImageStatus.INITIAL)
    expect(avatar.state.failed).toBe(false)
  })
})
