import { FC, ReactNode, useCallback, useRef } from 'react';
import { AccordionTrigger } from '../AccordionTrigger';
import { AccordionContent } from '../AccordionContent';
import { Separator } from '../../../Separator';
import { Collapsible } from '../../../Collapsible';

export interface AccordionItemProps {
  open?: boolean
  onChangeOpen: (value: string, state: boolean) => void
  size?: 'small' | 'medium' | 'large'
  value: string
  triggerSlot?: ReactNode
  children?: ReactNode | ReactNode[]
  separated?: boolean
}

export const AccordionItem: FC<AccordionItemProps> = ({ size, triggerSlot, separated, value, open, onChangeOpen, children }) => {
  const triggerRef = useRef<HTMLButtonElement>(null)

  const onChange = useCallback((state: boolean) => {
    onChangeOpen(value, state)
  }, [value, onChangeOpen])

  return (
    <li>
      <Collapsible open={open} onChangeOpen={onChange}>
        <AccordionTrigger size={size} ref={triggerRef}>
          {triggerSlot}
        </AccordionTrigger>
        <AccordionContent>
          {children}
        </AccordionContent>
        {separated && <Separator />}
      </Collapsible>
    </li>
  )
}