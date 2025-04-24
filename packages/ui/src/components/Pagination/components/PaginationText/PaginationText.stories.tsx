import type { Meta, StoryObj } from '@storybook/react';
import { PaginationText } from './PaginationText.tsx';

const meta = {
  title: 'UI-Core/Pagination/PaginationText',
  component: PaginationText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PaginationText>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: '1 / 12',
  },
}