'use client';
import { Children, FC, ReactElement, useState } from 'react';
import { AccordionItem, AccordionItemProps } from './components';
import { csx } from '../../utils/css';
import style from './style.module.css'

export interface AccordionProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
  children?: ReactElement<AccordionItemProps> | ReactElement<AccordionItemProps>[]
  defaultOpened?: string[]
  separated?: boolean
  multiple?: boolean
}

export const Accordion: FC<AccordionProps> = ({ size = 'medium', defaultOpened, multiple = false, separated = true, children, className }) => {
  const [opened, setOpened] = useState<string[]>(defaultOpened ?? [])

  const closeAll = () => {
    setOpened([])
  }

  const open = (value: string) => {
    if (!multiple) closeAll()
    setOpened(p => ([...p, value]))
  }

  const close = (value: string) => {
    setOpened(p => p.filter(v => v !== value))
  }

  const onChangeOpen = (value: string, state: boolean) => {
    if (!state) close(value)
    else open(value)
  }

  return (
    <ul className={csx(className, style.accordion)}>
      {children && (
        Children.map(children, (child, i) => {
          const value = child.props.value

          return (
            <AccordionItem
              key={value}
              {...child.props}
              size={size}
              separated={separated ? i !== Children.count(children) - 1 : undefined}
              open={opened.includes(value)}
              onChangeOpen={onChangeOpen}
            />
          )
        })
      )}
    </ul>
  );
}