import type { ScrollScrub } from '../step/actions'

const between = (from: number, to: number | undefined, progress: number) => {
  if (to === undefined) return from

  return from + (to - from) * progress
}

export const animateScroll = (element: HTMLElement, to: ScrollToOptions, ended: (finished: boolean, moved: boolean) => void) => {
  const { animationDuration, animationTimingFunction } = getComputedStyle(element)
  const snapType = element.style.scrollSnapType
  element.style.scrollSnapType = 'none'
  const from = { top: element.scrollTop, left: element.scrollLeft }
  const timing = new KeyframeEffect(null, null, { duration: parseFloat(animationDuration) * 1000 || 0, easing: animationTimingFunction })
  const timer = new Animation(timing)
  const controller = new AbortController()
  let frame = 0

  const stop = () => {
    controller.abort()
    cancelAnimationFrame(frame)
    timer.cancel()
    element.style.scrollSnapType = snapType
  }

  const step = () => {
    const progress = timing.getComputedTiming().progress ?? 1
    const before = { top: element.scrollTop, left: element.scrollLeft }
    element.scrollTo({ top: between(from.top, to.top, progress), left: between(from.left, to.left, progress), behavior: 'instant' })
    if (timer.playState !== 'finished') {
      frame = requestAnimationFrame(step)
      return
    }

    stop()
    ended(true, element.scrollTop !== before.top || element.scrollLeft !== before.left)
  }

  const interrupt = () => {
    stop()
    ended(false, false)
  }

  element.addEventListener('wheel', interrupt, { passive: true, signal: controller.signal })
  element.addEventListener('pointerdown', interrupt, { signal: controller.signal })
  timer.play()
  frame = requestAnimationFrame(step)

  return stop
}

export const scrubWithScroll = (element: HTMLElement, scrub: ScrollScrub) => {
  const animation = element.animate(scrub.keyframes, { duration: 1000, fill: 'both', pseudoElement: scrub.pseudoElement })
  const controller = new AbortController()
  animation.pause()

  const follow = () => {
    const range = element.scrollHeight - element.clientHeight
    animation.currentTime = range > 0 ? (element.scrollTop / range) * 1000 : 0
  }

  follow()
  element.addEventListener('scroll', follow, { passive: true, signal: controller.signal })

  return () => {
    controller.abort()
    animation.cancel()
  }
}
