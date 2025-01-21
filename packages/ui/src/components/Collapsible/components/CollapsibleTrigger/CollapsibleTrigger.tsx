import { ElementType, forwardRef, ReactNode, useContext } from 'react';
import { csx } from '@adara-cs/utils';
import style from './style.module.css';
import { CollapsibleContext } from '../../providers/CollapsibleProvider/context.ts';
import { PolymorphicComponentPropWithRef, PolymorphicRef } from '@adara-cs/types';

export type CollapsibleTriggerProps<T extends ElementType> = PolymorphicComponentPropWithRef<T, {
  className?: string
  onClick?: () => void
}>;

type CollapsibleTriggerComponent = <T extends ElementType = 'button'>(props: CollapsibleTriggerProps<T>) => ReactNode | null;

export const CollapsibleTrigger: CollapsibleTriggerComponent = forwardRef(<T extends ElementType>({
  className,
  onClick: _onClick,
  children,
  as,
  ...props
}: CollapsibleTriggerProps<T>, ref: PolymorphicRef<T>) => {
  const Element = as || 'button';

  const { opened, open, close } = useContext(CollapsibleContext)

  const onClick = () => {
    if (opened) close()
    else open()

    _onClick?.()
  }

  return (
    <Element type={Element === 'button' ? 'button' : undefined} aria-expanded={opened} data-open={opened} onClick={onClick} ref={ref}
            className={csx(style.triggerButton, className)} {...props}>
      {children}
    </Element>
  )
})