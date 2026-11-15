import { Measured, Metrics, Rect, ScrollBox, Viewport } from '../input'
import { MeasureRequest } from '../step'
import { Elements } from './connect'

const rectOf = (element: Element): Rect => {
  const { x, y, width, height } = element.getBoundingClientRect()
  return { x, y, width, height }
}

export const scrollOf = (element: Element): ScrollBox => ({
  top: element.scrollTop,
  left: element.scrollLeft,
  width: element.scrollWidth,
  height: element.scrollHeight,
  clientWidth: element.clientWidth,
  clientHeight: element.clientHeight,
})

export const scrollerBelow = (target: EventTarget | null, root: Element): Element | undefined => {
  for (let element = target instanceof Element ? target : null; element && element !== root; element = element.parentElement) {
    if (element.scrollHeight <= element.clientHeight) continue

    const { overflowY } = getComputedStyle(element)
    if (overflowY === 'auto' || overflowY === 'scroll') return element
  }

  return undefined
}

export const pressesText = (target: EventTarget | null) => {
  if (target instanceof Element && target.closest('input, textarea, select, [contenteditable]')) return true

  return Boolean(window.getSelection()?.toString())
}

const viewportOf = (): Viewport => {
  const visual = window.visualViewport
  const keyboardInset = visual ? Math.max(0, window.innerHeight - visual.height - visual.offsetTop) : 0

  const { clientWidth, clientHeight } = document.documentElement

  return { width: clientWidth, height: clientHeight, keyboardInset }
}

const metricsOf = <Key>(element: Element, request: MeasureRequest<Key>): Metrics => {
  const metrics: { rect?: Rect; scroll?: ScrollBox; styles?: Record<string, string> } = {}
  if (request.rect) metrics.rect = rectOf(element)
  if (request.scroll) metrics.scroll = scrollOf(element)

  if (request.styles) {
    const computed = getComputedStyle(element)
    metrics.styles = Object.fromEntries(request.styles.map((name) => [name, computed.getPropertyValue(name)]))
  }

  return metrics
}

export const readMeasure = <Key>(elements: Elements<Key>, request: MeasureRequest<Key>, order: readonly Key[]): Measured<Key> => {
  const parts: Record<string, Metrics> = {}
  for (const name of request.parts ?? []) {
    const element = elements.part(name)
    if (element) parts[name] = metricsOf(element, request)
  }

  const keys = request.items === 'all' ? order : (request.items ?? [])
  const items: (readonly [Key, Metrics])[] = []
  for (const key of keys) {
    const element = elements.item(key)
    if (element) items.push([key, metricsOf(element, request)])
  }

  const measured: Measured<Key> = { name: request.name, parts, items }
  return request.viewport ? { ...measured, viewport: viewportOf() } : measured
}
