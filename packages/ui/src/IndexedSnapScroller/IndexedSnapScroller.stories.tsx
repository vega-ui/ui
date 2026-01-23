import type { Meta, StoryObj } from '@storybook/react-vite';

import { IndexedSnapScroller } from './IndexedSnapScroller';
import { IndexedSnapScrollerContent as _IndexedSnapScrollerContent, type IndexedSnapScrollerContentProps } from './components';
import { ChangeEvent, FC, useState } from 'react';
import { useIndexedSnapScrollerContext } from './contexts';
import { NumberField, NumberFieldDecrementButton, NumberFieldIncrementButton, NumberFieldInput } from '../NumberField';

const IndexedSnapScrollerContent: FC<IndexedSnapScrollerContentProps> = ({ style, ...props }) => {
  const { index } = useIndexedSnapScrollerContext()
  
  return (
    <_IndexedSnapScrollerContent
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
      {index}
    </_IndexedSnapScrollerContent>
  )
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof IndexedSnapScroller> = {
  title: 'Utils/IndexedSnapScroller/IndexedSnapScroller',
  component: IndexedSnapScroller,
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
    style: {  width: 300, gap: 12 },
    children: <IndexedSnapScrollerContent />
  },
};


export const WithDefaultIndex: Story = {
  args: {
    ...Default.args,
    defaultIndex: 10,
  },
};

export const Controlled: Story = {
  args: {
    style: { marginTop: 24 }
  },
  render(props) {
    const [index, setIndex] = useState(0)
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.currentTarget.value.replace(/\s/i, ''))
      setIndex(value)
    }
    
    const onScrollSnapChanging = (element: HTMLElement, index: number) => {
      setIndex(index)
      props?.onScrollSnapChanging?.(element, index)
    }
    
    return (
      <div>
        <NumberField>
          <NumberFieldDecrementButton />
          <NumberFieldInput placeholder='Index' value={index} onChange={onChange} />
          <NumberFieldIncrementButton />
        </NumberField>
        <IndexedSnapScroller {...props} onScrollSnapChanging={onScrollSnapChanging} index={index}>
          <IndexedSnapScrollerContent />
        </IndexedSnapScroller>
      </div>
    )
  }
};