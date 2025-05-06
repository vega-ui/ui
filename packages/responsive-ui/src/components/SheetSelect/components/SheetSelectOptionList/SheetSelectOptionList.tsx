import { Children, FC, HTMLAttributes, ReactElement } from 'react';
import { csx } from '@vega-ui/utils';
import style from './style.module.css'

export interface SheetSelectOptionListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'itemRef'> {
  className?: string
  children?: ReactElement | ReactElement[]
}

export const SheetSelectOptionList: FC<SheetSelectOptionListProps> = ({
  className,
  children,
}) => {
  return (
    <ul className={csx(style.list, className)}>
      {Children.map(children, (child, index) => (
        <li key={index}>
          {child}
        </li>
      ))}
    </ul>
  )
}