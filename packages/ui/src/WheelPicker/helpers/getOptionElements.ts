import { Children, Fragment, isValidElement, ReactElement, ReactNode } from 'react';

export const getOptionElements = <Props,>(children: ReactNode): ReactElement<Props>[] =>
  Children.toArray(children).flatMap((child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return []
    if (child.type === Fragment) return getOptionElements<Props>(child.props.children)

    return [child as ReactElement<Props>]
  })
