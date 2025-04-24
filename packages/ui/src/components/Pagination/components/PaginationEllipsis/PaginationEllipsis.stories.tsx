import type { Meta, StoryObj } from '@storybook/react';
import { PaginationEllipsis } from './PaginationEllipsis.tsx';

const meta = {
  title: 'UI-Core/Pagination/PaginationEllipsis',
  component: PaginationEllipsis,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PaginationEllipsis>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
}