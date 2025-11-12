import type { Meta, StoryObj } from '@storybook/react-vite';

import { SnapScrollerContent as _SnapScrollerContent, SnapScrollerContentProps } from './SnapScrollerContent';
import { FC } from 'react';

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
        background: 'var(--color-blue-accent-100)',
        borderRadius: 12,
        fontSize: 24,
        color: 'var(--color-blue-accent-800)',
        fontFamily: 'var(--default-font-family)',
        ...style,
      }}
    >
      {children}
    </_SnapScrollerContent>
  )
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SnapScrollerContent> = {
  title: 'Utils/SnapScroller/SnapScrollerContent',
  component: SnapScrollerContent,
  tags: ['autodocs'],
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello, World!',
    index: 0,
    asChild: false,
  },
  render: (props) => <SnapScrollerContent {...props} />
};