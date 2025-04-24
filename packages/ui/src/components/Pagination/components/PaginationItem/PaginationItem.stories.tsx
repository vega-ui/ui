import type { Meta, StoryObj } from '@storybook/react';
import { PaginationItem } from './PaginationItem.tsx';

const meta = {
  title: 'UI-Core/Pagination/PaginationItem',
  component: PaginationItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PaginationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 1,
  },
};

export const Current: Story = {
  args: {
    current: true,
    children: 1,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 1,
  },
};

export const AsButton: Story = {
  args: {
    asChild: false,
    children: (
      1
    ),
  },
};

export const WithLong: Story = {
  args: {
    children: 1235,
  },
};