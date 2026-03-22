import { FC, HTMLAttributes, PropsWithChildren, useRef, PointerEvent, MouseEvent, KeyboardEvent, Ref } from 'react';
import { PageControlProvider } from './contexts';
import style from './style.module.css'
import { csx, mergeEventHandlers, safeSetPointerCapture } from '@vega-ui/utils';
import { PageControlSize } from './types';
import { useControlledState, useRefMap } from '@vega-ui/hooks';

export interface PageControlProps extends HTMLAttributes<HTMLUListElement> {
  /**
   * Controlled active index.
   */
  active?: number
  
  /**
   * Uncontrolled initial active index.
   */
  defaultActive?: number
  
  /**
   * Callback that is triggered when the user selects a different page.
   * Receives the new index as a number.
   */
  onChangeActive?: (value: number) => void
  
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
  ref,
  active: controlledActive,
  defaultActive = 0,
  onChangeActive,
  children,
  className,
  size = 'md',
  onKeyDown: _onKeyDown,
  onClick: _onClick,
  onPointerDown: _onPointerDown,
  onPointerUp: _onPointerUp,
  onPointerMove: _onPointerMove,
  ...props
}) => {
  const [active, setActive] = useControlledState(controlledActive, defaultActive, onChangeActive)

  const { getItem, itemRef } = useRefMap()
  
  const y = useRef<number>(null)
  const moved = useRef(false)
  
  const changeActive = (index: number) => {
    const item = getItem(index);
    if (!item) return
    
    item.focus()
    setActive(index)
  }
  
  
  const changeActiveByElement = (element: HTMLElement) => {
    const index = element?.dataset?.index
    if (!index || active === Number(index)) return
    
    changeActive(Number(index))
  }
  
  const onClick = (e: MouseEvent<HTMLUListElement>) => {
    const target = document.elementFromPoint(e.clientX, e.clientY)
    changeActiveByElement(target as HTMLElement)
  }
  
  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    // Pointer move only for touch and pen
    if (e.pointerType === 'mouse') return
    
    const { y: elemY, bottom } = e.currentTarget.getBoundingClientRect()
    y.current = (elemY + bottom) / 2
    
    moved.current = true;
  }
  
  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    safeSetPointerCapture(e.currentTarget, e.pointerId)
    
    if (!y.current || !moved.current) return
    const target = document.elementFromPoint(e.clientX, y.current)
    if (!target) return
    
    changeActiveByElement(target as HTMLElement)
  }
  
  const onPointerUp = () => {
    moved.current = false;
    y.current = null
  }
  
  const onKeyDown = (e: KeyboardEvent) => {
    if (active === undefined) return
    
    switch (e.key) {
      case 'ArrowRight': {
        e.preventDefault()
        changeActive(active + 1)
        
        return
      }
      case 'ArrowLeft': {
        e.preventDefault()
        changeActive(active - 1)
        
        return
      }
    }
  }

  return (
    <PageControlProvider itemRef={itemRef} size={size} active={active}>
      <ul
        role='tablist'
        ref={ref}
        onKeyDown={mergeEventHandlers(onKeyDown, _onKeyDown)}
        onClick={mergeEventHandlers(onClick, _onClick)}
        onPointerDown={mergeEventHandlers(onPointerDown, _onPointerDown)}
        onPointerMove={mergeEventHandlers(onPointerMove, _onPointerMove)}
        onPointerUp={mergeEventHandlers(onPointerUp, _onPointerUp)}
        className={csx(style.pageControl, className)}
        {...props}
      >
        {children}
      </ul>
    </PageControlProvider>
  )
}