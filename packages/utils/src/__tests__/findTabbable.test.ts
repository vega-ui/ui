// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { findTabbable } from '../findTabbable'

const mount = (html: string) => {
  const container = document.createElement('div')
  container.innerHTML = html
  document.body.append(container)
  return container
}

describe('findTabbable', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('skips disabled, negative tabindex, hidden and inert elements', () => {
    const container = mount(`
      <button disabled>Disabled</button>
      <a>No href</a>
      <span tabindex="-1">Programmatic</span>
      <div hidden><input aria-label="Hidden" /></div>
      <div inert><input aria-label="Inert" /></div>
      <input type="hidden" />
      <input aria-label="Name" />
    `)

    expect(findTabbable(container)?.getAttribute('aria-label')).toBe('Name')
  })

  it('returns null when nothing can take focus with Tab', () => {
    const container = mount('<p>Text</p><button disabled>Disabled</button>')

    expect(findTabbable(container)).toBeNull()
  })
})
