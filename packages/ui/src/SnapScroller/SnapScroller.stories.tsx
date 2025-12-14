import type { Meta, StoryObj } from '@storybook/react-vite';

import { SnapScroller } from './SnapScroller.tsx';
import { SnapScrollerApiRef } from './types.ts'
import { SnapScrollerContent as _SnapScrollerContent, SnapScrollerContentProps } from './components';
import { FC, useRef, useState } from 'react';

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
        background: 'var(--color-blue-accent-0)',
        boxSizing: 'border-box',
        borderRadius: 12,
        fontSize: 24,
        color: 'var(--color-blue-accent-700)',
        fontFamily: 'var(--default-font-family)',
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
  args: {},
  render(props) {
    const apiRef = useRef<SnapScrollerApiRef>(null)
    const SIZE = 3
    const MAX_PAGES = SIZE * 2
    const [pages, setPages] = useState(Array.from({ length: SIZE }, (_, index) => index))
   
    const start = () => {
      const startIndex = pages[0]
      const next = Array.from({ length: SIZE }, (_, index) => startIndex - index - 1).reverse()
      const merged = [ ...next, ...pages]
      
      setPages(merged.length > MAX_PAGES ? merged.slice(0, MAX_PAGES) : merged)
    }
    
    const end = () => {
      const startIndex = pages[pages.length - 1]
      const next = Array.from({ length: SIZE }, (_, index) => index + 1 + startIndex)
      const merged = [...pages, ...next]
      
      setPages(merged.length > MAX_PAGES ? merged.slice(merged.length - MAX_PAGES) : merged)
    }
    
    const onOffset = (offset: number) => {
      if (offset === -1) start()
      if (offset === 1) end()
    }
    
    return (
      <SnapScroller {...props} apiRef={apiRef} onOffset={onOffset} style={{  width: 300, gap: 12 }}>
        {pages.map((index) => (
          <SnapScrollerContent index={index} key={index}>
            {index}
          </SnapScrollerContent>
        ))}
      </SnapScroller>
    )
  }
};