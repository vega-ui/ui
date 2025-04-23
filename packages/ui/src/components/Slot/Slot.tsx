import { Children, cloneElement, FC, HTMLAttributes, isValidElement, ReactElement, ReactNode, Ref } from 'react';
import { mergeProps } from '@adara-cs/utils';

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  ref?: Ref<HTMLElement>
}

export const Slot: FC<SlotProps> = ({ children, ...props }) => {
  const child = Children.only(children);

  if (!isValidElement(child)) {
    throw new Error('[Slot] `asChild` must be single React-element.');
  }

  const elementToClone = children as ReactElement<{ [p: string]: unknown }>

  return cloneElement(
    elementToClone,
    mergeProps(props, elementToClone.props ?? {})
  )
}