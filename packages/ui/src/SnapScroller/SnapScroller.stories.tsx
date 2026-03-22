import type { Meta, StoryObj } from '@storybook/react-vite';

import { FC, useRef, useState } from 'react';
import { SnapScroller } from './SnapScroller';
import { SnapScrollerContent as _SnapScrollerContent, SnapScrollerContentProps } from './components';
import { clamp } from '@vega-ui/utils';
import { SnapScrollerApiRef } from './types';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { Button } from '../Button';

const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const SnapScrollerContent: FC<SnapScrollerContentProps> = ({ children, style, ...props }) => {
  return (
    <_SnapScrollerContent
      {...props}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 120,
        border: '1px solid var(--color-blue-accent-700)',
        background: 'var(--color-blue-accent-50)',
        boxSizing: 'border-box',
        borderRadius: 12,
        fontSize: 24,
        color: 'var(--color-blue-accent-700)',
        fontFamily: 'var(--default-font-family)',
        transition: 'background .5s ease, color .5s ease, border-color .5s ease, scale .5s ease',
        ...style,
      }}
    >
      {children}
    </_SnapScrollerContent>
  )
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SnapScroller> = {
  title: 'Utils/SnapScroller/SnapScroller',
  component: SnapScroller,
  args: {},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 400, gap: 12 },
    children: [
      pages.map((index) => (
        <SnapScrollerContent index={index} key={index}>
          {index}
        </SnapScrollerContent>
      ))
    ]
  },
};

export const WithDefaultIndex: Story = {
  args: {
    style: { width: 400, gap: 12 },
    defaultIndex: 5,
    children: [
      pages.map((index) => (
        <SnapScrollerContent index={index} key={index}>
          {index}
        </SnapScrollerContent>
      ))
    ]
  },
};

export const WithDifferentItemSizes: Story = {
  args: {
    style: { width: 525, gap: 12 },
    children: [
      pages.map((index) => (
        <SnapScrollerContent style={{ width: clamp(300, 300 + (index * 25), 600) }} index={index} key={index}>
          {index}
        </SnapScrollerContent>
      ))
    ]
  },
};

export const HighlightChanged: Story = {
  args: {
    style: { width: 624, gap: 12 },
  },
  render(props) {
    const [active, setActive] = useState(0)
    
    const onScrollSnapChange = (_: HTMLElement, index: number) => {
      props?.onScrollSnapChanging?.(_, index)
      setActive(index)
    }

    return (
      <SnapScroller {...props} onScrollSnapChange={onScrollSnapChange}>
        {pages.map((index) => (
          <SnapScrollerContent
            style={{
              width: 200,
              scale: active === index ? 0.9 : undefined,
              border: active === index ? '1px solid var(--color-blue-accent-700)' : '1px solid var(--color-gray-accent-700)',
              background: active === index ? 'var(--color-blue-accent-50)' : 'var(--color-gray-accent-50)',
              color: active === index ? 'var(--color-blue-accent-700)' : 'var(--color-gray-accent-500)',
            }}
            index={index}
            key={index}
          >
            {index}
          </SnapScrollerContent>
        ))}
      </SnapScroller>
    )
  }
};

export const HighlightChanging: Story = {
  args: {
    style: { width: 624, gap: 12 },
  },
  render(props) {
    const [active, setActive] = useState(props?.defaultIndex ?? 0)
    
    const onScrollSnapChanging = (_: HTMLElement, index: number) => {
      props?.onScrollSnapChanging?.(_, index)
      setActive(index)
    }
    
    return (
      <SnapScroller {...props} onScrollSnapChanging={onScrollSnapChanging}>
        {pages.map((index) => (
          <SnapScrollerContent
            style={{
              width: 200,
              scale: active === index ? 0.9 : undefined,
              border: active === index ? '1px solid var(--color-blue-accent-700)' : '1px solid var(--color-gray-accent-700)',
              background: active === index ? 'var(--color-blue-accent-0)' : 'var(--color-gray-accent-0)',
              color: active === index ? 'var(--color-blue-accent-700)' : 'var(--color-gray-accent-500)',
            }}
            index={index}
            key={index}
          >
            {index}
          </SnapScrollerContent>
        ))}
      </SnapScroller>
    )
  }
};

export const ButtonControlled: Story = {
  args: {
    style: { width: 300, gap: 12 },
  },
  render(props) {
    const api = useRef<SnapScrollerApiRef>(null)
    
    const onPrev = () => api.current?.prev()
    const onNext = () => api.current?.next()
    
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <IconButton appearance='ghost' onClick={onPrev}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <SnapScroller {...props} apiRef={api}>
          {pages.map((index) => (
            <SnapScrollerContent index={index} key={index}>
              {index}
            </SnapScrollerContent>
          ))}
        </SnapScroller>
        <IconButton appearance='ghost' onClick={onNext}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
    )
  }
};

export const RandomIndexes: Story = {
  args: {
    style: { width: 300, gap: 12 },
  },
  render(props) {
    const randomUniqueArray = (size: number) => {
      const set = new Set<number>();
      
      while (set.size < size) {
        set.add(Math.floor(Math.random() * 100));
      }
      
      return Array.from(set);
    }
    
    const [data, setData] = useState(randomUniqueArray(9))
    
    const onRandom = () => {
      setData(randomUniqueArray(9))
    }
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Button appearance='ghost' onClick={onRandom}>
          Randomize
        </Button>
        <SnapScroller {...props}>
          {data.map((index) => (
            <SnapScrollerContent index={index} key={index}>
              {index}
            </SnapScrollerContent>
          ))}
        </SnapScroller>
      </div>
    )
  }
};