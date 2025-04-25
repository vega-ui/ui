import type { Meta, StoryObj } from '@storybook/react';
import { TooltipContent } from './TooltipContent.tsx';
import { Button } from '../../../Button';
import { Tooltip } from '../../Tooltip.tsx';
import { TooltipTrigger } from '../TooltipTrigger';

const meta = {
  title: 'UI-Core/Tooltip/TooltipContent',
  component: TooltipContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof TooltipContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Tooltip content'
  },
  render(props) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Open</Button>
        </TooltipTrigger>
        <TooltipContent {...props} />
      </Tooltip>
    )
  }
}