'use client';
import { ButtonHTMLAttributes, FC, Ref } from 'react';
import { useMergeRefs } from '@vega-ui/hooks';
import { useOutput } from '../../../internals/widget';
import { useCollapsibleContext } from '../../contexts';
import { collapsibleWidget, TRIGGER } from '@vega-ui/widgets/collapsible';
import { Slot } from '../../../Slot';

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, renders the trigger as a child component using `Slot` (e.g. <a> or <div>).
   * This allows custom semantics or styling while preserving collapsible behavior.
   */
  asChild?: boolean

  /**
   * Ref forwarded to the native trigger element (typically a button).
   */
  ref?: Ref<HTMLButtonElement>
}

/** The CollapsibleTrigger component is the interactive element—typically a button or custom slot—that toggles the open or closed state of a Collapsible section */
export const CollapsibleTrigger: FC<CollapsibleTriggerProps> = ({
  children,
  asChild,
  ref,
  ...props
}) => {
  const Element = asChild ? Slot : 'button';

  const { handle } = useCollapsibleContext()
  const attrs = useOutput(handle, collapsibleWidget.output.trigger)
  const triggerRef = useMergeRefs([handle.rootAt(TRIGGER), ref])

  return (
    <Element
      ref={triggerRef}
      type={Element === 'button' ? 'button' : undefined}
      {...handle.listen(attrs, props)}
    >
      {children}
    </Element>
  )
}
