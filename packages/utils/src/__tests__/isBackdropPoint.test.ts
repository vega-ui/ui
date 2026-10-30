// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { isBackdropPoint } from '../isBackdropPoint'

const dialog = () => {
  const element = document.createElement('dialog')
  element.getBoundingClientRect = () => new DOMRect(100, 100, 200, 200)
  return element
}

describe('isBackdropPoint', () => {
  it('is true for a press on the dialog outside its box', () => {
    const element = dialog()

    expect(isBackdropPoint(element, { target: element, clientX: 50, clientY: 150 })).toBe(true)
  })

  it('is false for a press on the dialog inside its box', () => {
    const element = dialog()

    expect(isBackdropPoint(element, { target: element, clientX: 150, clientY: 150 })).toBe(false)
  })

  it('is false for a press on a child of the dialog', () => {
    const element = dialog()
    const child = document.createElement('button')
    element.append(child)

    expect(isBackdropPoint(element, { target: child, clientX: 50, clientY: 150 })).toBe(false)
  })
})
