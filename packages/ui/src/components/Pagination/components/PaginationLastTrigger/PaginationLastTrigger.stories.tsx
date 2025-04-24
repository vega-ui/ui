import type { Meta, StoryObj } from '@storybook/react';
import { PaginationLastTrigger } from './PaginationLastTrigger.tsx';
import { Tooltip } from '../../../Tooltip';
import { TooltipContent, TooltipTrigger } from '../../../Tooltip/components';

const meta = {
  title: 'UI-Core/Pagination/PaginationLastTrigger',
  component: PaginationLastTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PaginationLastTrigger>;

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
          <PaginationLastTrigger {...props} />
        </TooltipTrigger>
        <TooltipContent>Go to the last page</TooltipContent>
      </Tooltip>
    )
  }
}