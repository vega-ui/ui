// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { findScrollableAncestor } from '../findScrollableAncestor'

const box = (overflowY: string, scrollHeight: number) => {
  const element = document.createElement('div')
  element.style.overflowY = overflowY
  Object.defineProperty(element, 'scrollHeight', { value: scrollHeight })
  Object.defineProperty(element, 'clientHeight', { value: 100 })
  return element
}

describe('findScrollableAncestor', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('returns the closest ancestor that scrolls vertically', () => {
    const boundary = box('visible', 100)
    const scroller = box('auto', 300)
    const target = document.createElement('span')
    scroller.append(target)
    boundary.append(scroller)
    document.body.append(boundary)

    expect(findScrollableAncestor(target, boundary)).toBe(scroller)
  })

  it('skips ancestors that overflow without scrolling', () => {
    const boundary = box('visible', 100)
    const clipped = box('hidden', 300)
    const target = document.createElement('span')
    clipped.append(target)
    boundary.append(clipped)
    document.body.append(boundary)

    expect(findScrollableAncestor(target, boundary)).toBeNull()
  })

  it('skips scroll containers without overflowing content', () => {
    const boundary = box('visible', 100)
    const scroller = box('scroll', 100)
    const target = document.createElement('span')
    scroller.append(target)
    boundary.append(scroller)
    document.body.append(boundary)

    expect(findScrollableAncestor(target, boundary)).toBeNull()
  })

  it('does not look past the boundary', () => {
    const scroller = box('auto', 300)
    const boundary = box('visible', 100)
    const target = document.createElement('span')
    boundary.append(target)
    scroller.append(boundary)
    document.body.append(scroller)

    expect(findScrollableAncestor(target, boundary)).toBeNull()
  })
})
