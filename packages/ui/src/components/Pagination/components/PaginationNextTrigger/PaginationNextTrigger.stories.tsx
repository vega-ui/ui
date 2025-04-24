import type { Meta, StoryObj } from '@storybook/react';
import { PaginationNextTrigger } from './PaginationNextTrigger.tsx';
import { Tooltip } from '../../../Tooltip';
import { TooltipContent, TooltipTrigger } from '../../../Tooltip/components';

const meta = {
  title: 'UI-Core/Pagination/PaginationNextTrigger',
  component: PaginationNextTrigger,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof PaginationNextTrigger>;

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
          <PaginationNextTrigger {...props} />
        </TooltipTrigger>
        <TooltipContent>Next page</TooltipContent>
      </Tooltip>
    )
  }
}