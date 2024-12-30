import { FC, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { AccordionTrigger } from '../AccordionTrigger';
import { AccordionContent } from '../AccordionContent';
import { Separator } from '../../../Separator';

export interface AccordionItemProps {
  open?: boolean
  onChangeOpen?: (value: string, state: boolean) => void
  size?: 'small' | 'medium' | 'large'
  value: string
  triggerSlot?: ReactNode
  children?: ReactNode | ReactNode[]
  separated?: boolean
}

export const AccordionItem: FC<AccordionItemProps> = ({ size, triggerSlot, separated, value, open, onChangeOpen, children }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [hidden, setHidden] = useState(false)

  useLayoutEffect(() => {
    if (contentRef.current) contentRef.current.style.setProperty('--content-height', wrapperRef.current?.offsetHeight + 'px')
  }, [open]);

  const openItem = () => {
    setHidden(false)
    requestAnimationFrame(() => {
      onChangeOpen?.(value, true)
    })
  }

  const closeItem = () => {
    onChangeOpen?.(value, false)
  }

  const toggleItem = () => {
    if (open) closeItem()
    else openItem()
  }

  const onTransitionEnd = () => {
    if (!open) setHidden(true)
  }

  return (
    <li>
      <AccordionTrigger size={size} onClick={toggleItem} open={open} ref={triggerRef}>
        {triggerSlot}
      </AccordionTrigger>
      <AccordionContent wrapperRef={wrapperRef} ref={contentRef} open={open} hidden={hidden}
                        onTransitionEnd={onTransitionEnd}>
        {children}
      </AccordionContent>
      {separated && <Separator />}
    </li>
  )
}