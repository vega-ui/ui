import type { Meta, StoryObj } from '@storybook/react-vite';

import { CSSProperties } from 'react';
import { SnapScroller } from './SnapScroller';
import { SnapScrollerContent } from './components';

const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const itemStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: 120,
  border: '1px solid var(--color-blue-accent-700)',
  background: 'var(--color-blue-accent-100)',
  boxSizing: 'border-box',
  borderRadius: 12,
  fontSize: 24,
  color: 'var(--color-blue-accent-700)',
  fontFamily: 'var(--default-font-family)',
};

const meta = {
  title: 'Utils/SnapScroller',
  component: SnapScroller,
  subcomponents: {
    SnapScrollerContent,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultIndex: {
      control: 'number',
    },
  },
  args: {
    style: { width: 400, gap: 12 },
    children: pages.map((index) => (
      <SnapScrollerContent key={index} index={index} style={itemStyle}>
        {index}
      </SnapScrollerContent>
    )),
  },
} satisfies Meta<typeof SnapScroller>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithDifferentItemSizes: Story = {
  args: {
    style: { width: 525, gap: 12 },
    children: pages.map((index) => (
      <SnapScrollerContent key={index} index={index} style={{ ...itemStyle, width: 300 + index * 25 }}>
        {index}
      </SnapScrollerContent>
    )),
  },
};
