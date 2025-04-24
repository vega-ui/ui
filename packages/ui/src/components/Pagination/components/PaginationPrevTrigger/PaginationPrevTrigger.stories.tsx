import type { Meta, StoryObj } from '@storybook/react';
import { PaginationPrevTrigger } from './PaginationPrevTrigger.tsx';
import { Tooltip } from '../../../Tooltip';
import { TooltipContent, TooltipTrigger } from '../../../Tooltip/components';

const meta = {
  title: 'UI-Core/Pagination/PaginationPrevTrigger',
  component: PaginationPrevTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PaginationPrevTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithTooltip: Story = {
  render(props) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <PaginationPrevTrigger {...props} />
        </TooltipTrigger>
        <TooltipContent>Previous page</TooltipContent>
      </Tooltip>
    )
  }
}