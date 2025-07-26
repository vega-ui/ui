import { FC, HTMLAttributes, PropsWithChildren, useRef, useState, PointerEvent, MouseEvent, Ref } from 'react';
import { PageControlProvider } from './providers';
import style from './style.module.css'
import { csx } from '@vega-ui/utils';
import { PageControlVariant } from './types.ts';

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
}

/** PageControl is a UI component that displays a sequence of page indicators, allowing users to navigate between steps or views. It supports interaction, active state management, and visual variants such as default or high-contrast styles. */
export const PageControl: FC<PropsWithChildren<PageControlProps>> = ({
  active,
  onChangeActive,
  children,
  className,
  variant = 'default',
  onPointerMove: _onPointerMove,
  onPointerDown: _onPointerDown,
  onPointerUp: _onPointerUp,
  onClick: _onClick,
  ref,
  ...props
}) => {
  const y = useRef<number>(null)
  const [moved, setMoved] = useState(false)
  
  const changeActive = (element: HTMLElement) => {
    const index = element.dataset?.index
    if (!index || active === Number(index)) return
    
    onChangeActive?.(Number(index))
  }
  
  const onClick = (e: MouseEvent<HTMLUListElement>) => {
    _onClick?.(e)
    changeActive(e.target as HTMLElement)
  }
  
  const onPointerDown = (e: PointerEvent<HTMLUListElement>) => {
    _onPointerDown?.(e)
    
    const { y: elemY, bottom } = e.currentTarget.getBoundingClientRect()
    y.current = (elemY + bottom) / 2
    
    setMoved(true)
  }
  
  const onPointerMove = (e: PointerEvent<HTMLUListElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    _onPointerMove?.(e)
    
    if (!y.current || !moved) return
    
    const target = document.elementFromPoint(e.clientX, y.current)
    if (!target) return
    
    changeActive(target as HTMLElement)
  }
  
  const onPointerUp = (e: PointerEvent<HTMLUListElement>) => {
    _onPointerUp?.(e)
    setMoved(false)
    y.current = null
  }
  
  return (
    <PageControlProvider variant={variant} active={active}>
      <ul
        role='list'
        ref={ref}
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className={csx(style.pageControl, className)}
        {...props}
      >
        {children}
      </ul>
    </PageControlProvider>
  )
}