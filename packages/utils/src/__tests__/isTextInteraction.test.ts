// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { isTextInteraction } from '../isTextInteraction'

describe('isTextInteraction', () => {
  afterEach(() => {
    window.getSelection()?.removeAllRanges()
    document.body.innerHTML = ''
  })

  it.each(['input', 'textarea', 'select'])('is true inside a %s', (tag) => {
    const field = document.createElement(tag)
    document.body.append(field)

    expect(isTextInteraction(field)).toBe(true)
  })

  it('is true inside contenteditable', () => {
    const editor = document.createElement('div')
    editor.setAttribute('contenteditable', '')
    const text = document.createElement('span')
    editor.append(text)
    document.body.append(editor)

    expect(isTextInteraction(text)).toBe(true)
  })

  it('is true while text is selected', () => {
    const paragraph = document.createElement('p')
    paragraph.textContent = 'Selected text'
    document.body.append(paragraph)
    window.getSelection()?.selectAllChildren(paragraph)

    expect(isTextInteraction(document.body)).toBe(true)
  })

  it('is false for other elements without a selection', () => {
    const button = document.createElement('button')
    document.body.append(button)

    expect(isTextInteraction(button)).toBe(false)
  })

  it('is false for a target that is not an element', () => {
    expect(isTextInteraction(null)).toBe(false)
  })
})
