import { FC, HTMLAttributes, PropsWithChildren, useRef, useState, PointerEvent, MouseEvent, KeyboardEvent, Ref, Children } from 'react';
import { PageControlProvider } from './contexts';
import style from './style.module.css'
import { csx, mergeEventHandlers } from '@vega-ui/utils';
import { PageControlSize, PageControlVariant } from './types.ts';
import { useRefMap } from '@vega-ui/hooks';

export interface PageControlProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * Currently active page index (zero-based).
   * If not provided, the component will not reflect active state.
   */
  active?: number
  
  /**
   * Callback that is triggered when the user selects a different page.
   * Receives the new index as a number.
   */
  onChangeActive?: (value: number) => void
  
  /**
   * Visual variant of the component.
   * Controls the appearance and style of page indicators (e.g. default or high-contrast).
   */
  variant?: PageControlVariant
  
  /**
   * Ref forwarded to the underlying <ul> element.
   */
  ref?: Ref<HTMLUListElement>
  
  /**
   * Defines the size of the page control items.
   */
  size?: PageControlSize
}

/** PageControl is a UI component that displays a sequence of page indicators, allowing users to navigate between steps or views. It supports interaction, active state management, and visual variants such as default or high-contrast styles. */
export const PageControl: FC<PropsWithChildren<PageControlProps>> = ({
  active,
  onChangeActive,
  children,
  className,
  variant = 'default',
  size = 'md',
  ref,
  ...props
}) => {
  const count = Children.count(children)
  const { getItem, itemRef } = useRefMap()
  
  const y = useRef<number>(null)
  const [moved, setMoved] = useState(false)
  
  const changeActive = (index: number) => {
    const activeIndex = index > count - 1 ? 0 : index < 0 ? count - 1 : index
    
    getItem(activeIndex)?.focus()
    onChangeActive?.(activeIndex)
  }
  
  const changeActiveByElement = (element: HTMLElement) => {
    const index = element.dataset?.index
    if (!index || active === Number(index)) return
    
    changeActive(Number(index))
  }
  
  const onClick = (e: MouseEvent<HTMLUListElement>) => {
    changeActiveByElement(e.target as HTMLElement)
  }
  
  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    // Pointer move only for touch and pen
    if (e.pointerType === 'mouse') return
    
    const { y: elemY, bottom } = e.currentTarget.getBoundingClientRect()
    y.current = (elemY + bottom) / 2
    
    setMoved(true)
  }
  
  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    
    if (!y.current || !moved) return
    
    const target = document.elementFromPoint(e.clientX, y.current)
    if (!target) return
    
    changeActiveByElement(target as HTMLElement)
  }
  
  const onPointerUp = () => {
    setMoved(false)
    y.current = null
  }
  
  const onKeyDown = (e: KeyboardEvent) => {
    if (active === undefined) return
    
    switch (e.key) {
      case 'ArrowRight': {
        e.preventDefault()
        
        const next = active + 1
        changeActive(next)
        
        return
      }
      case 'ArrowLeft': {
        e.preventDefault()
        
        const prev = active - 1
        changeActive(prev)
        
        return
      }
    }
  }

  return (
    <PageControlProvider itemRef={itemRef} size={size} variant={variant} active={active}>
      <ul
        role='tablist'
        ref={ref}
        onKeyDown={mergeEventHandlers(onKeyDown, props.onKeyDown)}
        onClick={mergeEventHandlers(onClick, props.onClick)}
        onPointerDown={mergeEventHandlers(onPointerDown, props.onPointerDown)}
        onPointerMove={mergeEventHandlers(onPointerMove, props.onPointerMove)}
        onPointerUp={mergeEventHandlers(onPointerUp, props.onPointerUp)}
        className={csx(style.pageControl, className)}
        {...props}
      >
        {children}
      </ul>
    </PageControlProvider>
  )
}