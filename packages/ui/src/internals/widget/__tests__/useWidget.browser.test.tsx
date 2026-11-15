import { createContext, FC, PointerEvent, ReactNode, StrictMode, useContext, useRef } from 'react'
import { createPortal } from 'react-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import { collection, controlled, defineWidget, idOf, internal, keep, key, listening, matching, pointer, ROOT, roving, scroll, selection, source, state } from '@vega-ui/core'
import { useItem, useOutput, useSnapshot, useWidget, WidgetHandle } from '..'

interface Item {
  readonly id: string
  readonly label: string
}

const items: readonly Item[] = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma' },
]

const list = source({ key: (item: Item) => item.id, label: (item) => item.label })

const shape = state({
  options: { items, mode: 'single' as 'single' | 'multiple' },
  owns: { value: controlled([] as readonly string[]), active: controlled(null as string | null) },
  internal: { anchor: internal(null) },
  collection: (options) => list.of(options.items),
})

const listbox = defineWidget({
  state: shape,
  step: [
    roving({ active: shape.active, strategy: 'activedescendant' }),
    selection({ value: shape.value, active: shape.active, anchor: shape.anchor, mode: shape.options.mode, strategy: 'activedescendant' }),
  ],
  output: {
    root: shape.part(
      (state) => [state.active == null ? null : idOf(state, 'option', state.active)] as const,
      ([activeId]) => ({ role: 'listbox', tabIndex: 0, 'aria-activedescendant': activeId ?? undefined }),
    ),
    option: shape.part(
      (state, key) => [idOf(state, 'option', key), state.active === key, state.value.includes(key)] as const,
      ([id, active, selected]) => ({ role: 'option', id, 'aria-selected': selected, 'data-active': active || undefined }),
    ),
  },
  invariants: {
    activeExists: {
      check: (state) => state.active == null || collection.has(state.collection, state.active),
      repair: (state) => shape.active.set(state, collection.first(state.collection)),
    },
  },
})

type Options = Parameters<typeof shape.create>[0]

const ListboxContext = createContext<WidgetHandle<typeof shape> | null>(null)

const Listbox: FC<Options & { children: ReactNode; onKeyDown?: (event: React.KeyboardEvent) => void }> = ({ children, onKeyDown, ...options }) => {
  const handle = useWidget(listbox, options)
  const attrs = useOutput(handle, listbox.output.root)

  return (
    <ListboxContext value={handle}>
      <div ref={handle.root} {...handle.listen(attrs, { onKeyDown })}>{children}</div>
    </ListboxContext>
  )
}

const renders = new Map<string, number>()

const Option: FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
  const handle = useContext(ListboxContext)!
  const ref = useItem(handle, id)
  const attrs = useOutput(handle, listbox.output.option, id)
  renders.set(id, (renders.get(id) ?? 0) + 1)

  return <div ref={ref} {...handle.merge(attrs)}>{children}</div>
}

const Options: FC = () => items.map((item) => <Option key={item.id} id={item.id}>{item.label}</Option>)

const focusRoot = (screen: { getByRole(role: string): { element(): Element } }) => (screen.getByRole('listbox').element() as HTMLElement).focus()

afterEach(() => renders.clear())

describe('Critical User Paths', () => {
  it('moves the active option with the keyboard and points aria-activedescendant at it', async () => {
    const screen = await render(<Listbox items={items} mode='single'><Options /></Listbox>)
    const root = screen.getByRole('listbox')

    focusRoot(screen)
    await userEvent.keyboard('{ArrowDown}')

    const beta = screen.getByText('Beta').element()
    await expect.element(root).toHaveAttribute('aria-activedescendant', beta.id)
    await expect.element(screen.getByText('Beta')).toHaveAttribute('data-active', 'true')
  })

  it('reports a selection to the parent and follows the controlled value back', async () => {
    const onChangeValue = vi.fn()
    const screen = await render(<Listbox items={items} mode='single' value={[]} onChangeValue={onChangeValue}><Options /></Listbox>)

    await userEvent.click(screen.getByText('Gamma'))
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith(['c'])
    await expect.element(screen.getByText('Gamma')).toHaveAttribute('aria-selected', 'false')

    await screen.rerender(<Listbox items={items} mode='single' value={['c']} onChangeValue={onChangeValue}><Options /></Listbox>)
    await expect.element(screen.getByText('Gamma')).toHaveAttribute('aria-selected', 'true')
    expect(onChangeValue).toHaveBeenCalledOnce()
  })

  it('lets the user handler run first and respects its preventDefault', async () => {
    const screen = await render(
      <Listbox items={items} mode='single' defaultActive='a' onKeyDown={(event) => event.key === 'ArrowDown' && event.preventDefault()}>
        <Options />
      </Listbox>,
    )

    focusRoot(screen)
    await userEvent.keyboard('{ArrowDown}')
    await expect.element(screen.getByText('Alpha')).toHaveAttribute('data-active', 'true')

    await userEvent.keyboard('{End}')
    await expect.element(screen.getByText('Gamma')).toHaveAttribute('data-active', 'true')
  })

  it('shows the parent handler that the widget prevented a key it handled', async () => {
    const prevented: Record<string, boolean> = {}
    const screen = await render(
      <div onKeyDown={(event) => { prevented[event.key] = event.defaultPrevented }}>
        <Listbox items={items} mode='single' defaultActive='a'><Options /></Listbox>
      </div>,
    )

    focusRoot(screen)
    await userEvent.keyboard('{ArrowDown}{Tab}')

    expect(prevented).toEqual({ ArrowDown: true, Tab: false })
  })
})

describe('Performance', () => {
  it('rerenders only the options whose attributes changed', async () => {
    const screen = await render(<Listbox items={items} mode='single' defaultActive='a'><Options /></Listbox>)
    renders.clear()

    focusRoot(screen)
    await userEvent.keyboard('{ArrowDown}')
    await expect.element(screen.getByText('Beta')).toHaveAttribute('data-active', 'true')

    expect(renders.get('a')).toBe(1)
    expect(renders.get('b')).toBe(1)
    expect(renders.get('c')).toBeUndefined()
  })

  it('writes a live value of an item without rendering it', async () => {
    const output = { select: () => [] as const, render: () => ({}), live: { select: (state: typeof shape.__snapshot, key: string) => [state.active === key], render: ([active]: readonly unknown[]) => ({ '--marker': active ? 1 : 0 }) } }
    let marked = 0
    const Marked: FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
      const handle = useContext(ListboxContext)!
      const ref = useItem(handle, id, undefined, output)
      marked++

      return <div ref={ref}>{children}</div>
    }
    const screen = await render(<Listbox items={items} mode='single' defaultActive='a'>{items.map((item) => <Marked key={item.id} id={item.id}>{item.label}</Marked>)}</Listbox>)
    const marker = (label: string) => (screen.getByText(label).element() as HTMLElement).style.getPropertyValue('--marker')
    expect(marker('Alpha')).toBe('1')
    marked = 0

    focusRoot(screen)
    await userEvent.keyboard('{ArrowDown}')

    expect(marker('Beta')).toBe('1')
    expect(marker('Alpha')).toBe('0')
    expect(marked).toBe(0)
  })
})

describe('Edge Cases', () => {
  it('keeps working after a strict mode remount', async () => {
    const Probe: FC = () => {
      const count = useRef(0)
      count.current++
      return <Listbox items={items} mode='single' defaultActive='a'><Options /></Listbox>
    }
    const screen = await render(<StrictMode><Probe /></StrictMode>)

    await userEvent.click(screen.getByText('Gamma'))

    await expect.element(screen.getByText('Gamma')).toHaveAttribute('aria-selected', 'true')
  })

  it('takes a key in a portal registered as a second root once, although React bubbles it to the first root too', async () => {
    const parts: (string | undefined)[] = []
    const recording = defineWidget({
      state: shape,
      step: [listening([key.escape], (_state, input) => {
        if (input.is(key.escape)) parts.push(input.part)
        return undefined
      })],
    })
    const Portaled: FC = () => {
      const handle = useWidget(recording, { items, mode: 'single' })
      return (
        <div ref={handle.root} {...handle.listen({})}>
          {createPortal(<div ref={handle.rootAt('content')} {...handle.listen({})}><input aria-label='Search' /></div>, document.body)}
        </div>
      )
    }
    const screen = await render(<Portaled />)

    await userEvent.type(screen.getByRole('textbox'), '{Escape}')

    expect(parts).toEqual(['content'])
  })

  it('renders a change a scroll end makes before the next scrollend listener runs', async () => {
    const settledShape = state({ options: {}, owns: {}, internal: { settled: internal(0) } })
    const settling = defineWidget({
      state: settledShape,
      step: [listening([scroll.end], (current, input) => (input.is(scroll.end) ? keep(settledShape.settled.set(current, current.settled + 1)) : undefined))],
    })
    const selectSettled = (current: typeof settledShape.__snapshot) => current.settled
    const Settling: FC = () => {
      const handle = useWidget(settling, {})
      const settled = useSnapshot(handle, selectSettled)
      return <div ref={handle.root} data-testid='scroller' data-settled={settled} {...handle.listen({})} />
    }
    const screen = await render(<Settling />)
    const scroller = screen.getByTestId('scroller').element()
    const seen: (string | null)[] = []
    scroller.addEventListener('scrollend', () => seen.push(scroller.getAttribute('data-settled')))

    scroller.dispatchEvent(new Event('scrollend'))

    expect(seen).toEqual(['1'])
  })

  it('shows an observed attribute of a part as soon as a render changes it', async () => {
    const field = defineWidget({
      state: state({ options: {}, owns: {}, observes: { readOnly: matching(ROOT, '[readonly]') } }),
      step: [],
    })
    const Field: FC<{ readOnly: boolean }> = ({ readOnly }) => {
      const handle = useWidget(field, {})
      const observed = useSnapshot(handle, (snapshot) => snapshot.readOnly)
      return (
        <>
          <input ref={handle.root} readOnly={readOnly} aria-label='field' />
          <output>{observed ? 'read-only' : 'editable'}</output>
        </>
      )
    }
    const screen = await render(<Field readOnly={false} />)
    await expect.element(screen.getByText('editable')).toBeInTheDocument()

    await screen.rerender(<Field readOnly />)

    await expect.element(screen.getByText('read-only')).toBeInTheDocument()
  })

  it('leaves a pointer down to the user handler that prevents its default', async () => {
    const downs: string[] = []
    const pressing = defineWidget({
      state: state({ options: {}, owns: {} }),
      step: [listening([pointer.down], (state, input) => {
        if (input.is(pointer.down)) downs.push('down')
        return keep(state)
      })],
    })
    const Pressable: FC = () => {
      const handle = useWidget(pressing, {})
      return <button ref={handle.root} {...handle.listen({}, { onPointerDown: (event: PointerEvent) => event.preventDefault() })}>Press</button>
    }
    const screen = await render(<Pressable />)

    await userEvent.click(screen.getByText('Press'))

    expect(downs).toEqual([])
  })
})
