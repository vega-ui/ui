import { describe, expect, it, vi } from 'vitest'
import { act, measure, pointer } from '@vega-ui/core'
import { simulate } from '@vega-ui/core/test'
import { DIALOG } from '../../modal-dialog'
import { drawerWidget } from '../widget'

const press = (y: number, extra: object = {}) => ({ part: DIALOG, point: { x: 0, y }, pointerType: 'touch', primary: true, time: 0, ...extra })

const sized = { measured: { name: 'drawerSize', parts: { [DIALOG]: { rect: { x: 0, y: 0, width: 300, height: 200 } } }, items: [] } }

const scroller = (top: number) => ({ top, left: 0, width: 300, height: 600, clientWidth: 300, clientHeight: 200 })

const open = (onChangeOpen = vi.fn()) =>
  simulate(drawerWidget, { position: 'bottom', open: true, onChangeOpen }).observe({ closedByAny: true })

describe('Critical User Paths', () => {
  it('claims the pointer once a swipe passes the threshold and closes past half its size', () => {
    const onChangeOpen = vi.fn()
    const drawer = open(onChangeOpen)

    drawer.send(pointer.down, press(100))
    expect(drawer.actions).toEqual([act.measure({ name: 'drawerSize', parts: [DIALOG], rect: true })])

    drawer.send(measure.done, sized).send(pointer.drag, { point: { x: 0, y: 102 }, time: 16 })
    expect(drawer.state.drag).toBe(null)

    drawer.send(pointer.drag, { point: { x: 0, y: 150 }, time: 32 })
    expect(drawer.state.drag).toBe(50)
    expect(drawer.actions).toEqual([act.claimPointer()])

    drawer.send(pointer.release, { point: { x: 0, y: 210 }, time: 500 })
    expect(onChangeOpen).toHaveBeenLastCalledWith(false)
    expect(drawer.state.drag).toBe(null)
  })
})

describe('Edge Cases', () => {
  it('lets a scrolled list scroll instead of dragging, and drags once the list is at its top', () => {
    const drawer = open()

    drawer.send(pointer.down, press(100, { scroller: scroller(40) })).send(measure.done, sized).send(pointer.drag, { point: { x: 0, y: 150 }, time: 16 })
    expect(drawer.state.drag).toBe(null)
    drawer.send(pointer.release, { point: { x: 0, y: 150 }, time: 32 })

    drawer.send(pointer.down, press(100, { scroller: scroller(0) })).send(measure.done, sized).send(pointer.drag, { point: { x: 0, y: 50 }, time: 16 })
    expect(drawer.state.drag).toBe(null)
    drawer.send(pointer.release, { point: { x: 0, y: 50 }, time: 32 })

    drawer.send(pointer.down, press(100, { scroller: scroller(0) })).send(measure.done, sized).send(pointer.drag, { point: { x: 0, y: 150 }, time: 16 })
    expect(drawer.state.drag).toBe(50)
  })

  it('closes on a flick toward its edge and springs back after a short slow swipe', () => {
    const onChangeOpen = vi.fn()
    const drawer = simulate(drawerWidget, { position: 'start', open: true, onChangeOpen }).observe({ closedByAny: true })
    const from = press(0, { point: { x: 200, y: 0 } })

    drawer.send(pointer.down, from).send(measure.done, sized).send(pointer.drag, { point: { x: 170, y: 0 }, time: 16 })
    drawer.send(pointer.release, { point: { x: 170, y: 0 }, time: 500 })
    expect(drawer.state.drag).toBe(null)
    expect(onChangeOpen).not.toHaveBeenCalled()

    drawer.send(pointer.down, from).send(measure.done, sized).send(pointer.drag, { point: { x: 170, y: 0 }, time: 48 })
    drawer.send(pointer.release, { point: { x: 140, y: 0 }, time: 96 })
    expect(onChangeOpen).toHaveBeenLastCalledWith(false)
  })

  it('resists a swipe away from its edge', () => {
    const drawer = open()

    drawer.send(pointer.down, press(100)).send(measure.done, sized).send(pointer.drag, { point: { x: 0, y: -100 }, time: 16 })

    expect(drawer.state.drag).toBeLessThan(0)
    expect(drawer.state.drag).toBeGreaterThan(-200)
  })

  it('leaves a press on text, a mouse press, a press on the backdrop and any press while only a request closes it to the page', () => {
    const drawer = open()

    drawer.send(pointer.down, press(100, { text: true }))
    drawer.send(pointer.down, press(100, { pointerType: 'mouse' }))
    drawer.send(pointer.down, press(100, { backdrop: true }))

    expect(drawer.state.gesture).toBe(null)
    expect(simulate(drawerWidget, { position: 'bottom', open: true }).send(pointer.down, press(100)).state.gesture).toBe(null)
  })
})
